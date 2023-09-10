import axios from 'axios'
import * as dotenv from 'dotenv'
import {BusFactorData} from '../models/middleware-inputs'

dotenv.config() // load enviroment variables

/**
 * Get the commits made by the top contributor and the total contributions across
 * the top 10 contributors including the top contributor.
 *
 * // TODO handle failure
 *
 * @param repoUrl Github repository url
 * @returns Name of the most critical contributor, contributions by the critical
 *          contributor and the total contributions across the top 10 contributors
 */
export function getCommitData(repoUrl: string): [string, number, number] {
  const instance = axios.create({
    baseURL: 'https://api.github.com/repos/',
    timeout: 1000,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  }) // create axios instance

  const repoOwner = repoUrl.split('/')[3]
  const repoName = repoUrl.split('/')[4]
  instance.get(`${repoOwner}/${repoName}/contributors`).then((response) => {
    const {login} = response.data[0]
    const {contributions} = response.data[0]

    // get the total contribution acorss top 10 contributors
    let totalContributions: number = 0
    for (let i = 0; i < response.data.length; i += 1) {
      totalContributions += response.data[i].contributions
    }

    const result: [string, number, number] = [
      login,
      contributions,
      totalContributions,
    ]
    return result
  })
  return ['', -1, -1]
}

/**
 * Get the number of pull requests made by the critical contributor and the total number of pull requests.
 * (might always return 100 pull requests because of github api pagination)
 *
 * // TODO handle failure
 *
 * @param repoUrl Github repository url
 * @param critUser The username of the critical contributor.
 * @returns The number of pull requests made by the critical contributor and the total number of pull requests.
 */
export function getPullReqestData(
  repoUrl: string,
  critUser: string,
): [number, number] {
  const instance = axios.create({
    baseURL: 'https://api.github.com/repos/',
    timeout: 1000,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  }) // create axios instance

  const repoOwner = repoUrl.split('/')[3]
  const repoName = repoUrl.split('/')[4]
  instance
    .get(`${repoOwner}/${repoName}/search/issues`, {
      params: {state: 'all', per_page: 100}, // eslint-disable-line camelcase
    })
    .then((response) => {
      // get the pull requests made by the critical contributor
      let critUserPullRequests: number = 0
      let totalPullRequests: number = 0
      for (let i = 0; i < response.data.items.length; i += 1) {
        if (response.data.items[i].user.login === critUser) {
          critUserPullRequests += 1
        }

        totalPullRequests += 1
      }

      return [critUserPullRequests, totalPullRequests]
    })
  return [-1, -1]
}

/**
 * Gets the data required to calculate the bus factor.
 *
 * @param repoUrl Github repository url.
 * @returns The data required to calculate the bus factor.
 */
export function getBusFactorData(repoUrl: string): BusFactorData {
  // get login of the most critical contributor, their contributions and the total contributions across the top 10 contributors
  const [criticalUserLogin, criticalContrubitorCommits, totalCommits]: [
    string,
    number,
    number,
  ] = getCommitData(repoUrl)
  // get the number of pull requests made by the critical contributor and the total number of pull requests
  const [criticalContributorPullRequests, totalPullRequests]: [number, number] =
    getPullReqestData(repoUrl, criticalUserLogin)

  return <BusFactorData>{
    criticalContrubitorCommits,
    totalCommits,
    criticalContributorPullRequests,
    totalPullRequests,
  }
}
