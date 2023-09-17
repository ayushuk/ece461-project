import axios from 'axios'
import * as dotenv from 'dotenv'
import {BusFactorData, CorrectnessData} from '../models/middleware-inputs'

dotenv.config() // load enviroment variables

/**
 * Get the commits made by the top contributor and the total contributions across
 * the top 10 contributors including the top contributor.
 *
 * // TODO handle failure with logging
 *
 * @param repoUrl Github repository url
 * @returns Name of the most critical contributor, contributions by the critical
 *          contributor and the total contributions across the top 10 contributors
 *          If there is an error, returns ['', -1, -1].
 */
export async function getCommitData(
  repoUrl: string,
): Promise<readonly [string, number, number]> {
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
  try {
    const response = await instance.get(`${repoOwner}/${repoName}/contributors`)
    const {login} = response.data[0]
    const {contributions} = response.data[0]

    // get the total contribution acorss top 10 contributors
    let totalContributions: number = 0
    for (let i = 0; i < response.data.length; i += 1) {
      totalContributions += response.data[i].contributions
    }
    return [login, contributions, totalContributions] as const
  } catch {
    return ['', -1, -1]
  }
}

/**
 * Get the number of pull requests made by the critical contributor and the total number of pull requests.
 * (might always return 100 pull requests because of github api pagination)
 *
 * // TODO handle failure logging
 *
 * @param repoUrl Github repository url
 * @param critUser The username of the critical contributor.
 * @returns The number of pull requests made by the critical contributor and the total number of pull requests.
 *          If there is an error, returns [-1, -1].
 */
export async function getPullRequestData(
  repoUrl: string,
  critUser: string,
): Promise<readonly [number, number]> {
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
  try {
    const response = await instance.get(
      `${repoOwner}/${repoName}/search/issues`,
      {
        params: {state: 'all', per_page: 100}, // eslint-disable-line camelcase
      },
    )
    let critUserPullRequests: number = 0
    const totalPullRequests: number = response.data.length

    for (let i = 0; i < totalPullRequests; i += 1) {
      if (response.data[i].user.login === critUser) {
        critUserPullRequests += 1
      }
    }
    return [critUserPullRequests, totalPullRequests] as const
  } catch {
    return [-1, -1] as const
  }
}

/**
 * Gets the data required to calculate the bus factor.
 *
 * @param repoUrl Github repository url.
 * @returns The data required to calculate the bus factor.
 */
export function getBusFactorData(repoUrl: string): BusFactorData {
  let criticalUserLogin: string = ''
  let criticalContrubitorCommits: number = -1
  let totalCommits: number = -1
  let criticalContributorPullRequests: number = -1
  let totalPullRequests: number = -1

  const getCommitDataResult = getCommitData(repoUrl)
  getCommitDataResult.then((data: readonly [string, number, number]) => {
    ;[criticalUserLogin, criticalContrubitorCommits, totalCommits] = data
  })

  const getPullReqestDataResult = getPullRequestData(repoUrl, criticalUserLogin)
  getPullReqestDataResult.then((data: readonly [number, number]) => {
    ;[criticalContributorPullRequests, totalPullRequests] = data
  })

  return <BusFactorData>{
    criticalContrubitorCommits,
    totalCommits,
    criticalContributorPullRequests,
    totalPullRequests,
  }
}

/**
 * Gets the number of issues in a given state.
 *
 * // TODO handle failure logging
 *
 * @param repoUrl Gihub repository url
 * @param state State of the issue
 * @returns The number of issues in the state.
 */
export async function getIssues(
  repoUrl: string,
  state: 'open' | 'closed',
): Promise<number> {
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
  try {
    const response = await instance.get(`${repoOwner}/${repoName}/issues`, {
      params: {state: state, per_page: 100}, // eslint-disable-line camelcase
    })
    return response.data.length
  } catch {
    return -1
  }
}

/**
 * Gets the data required to calculate the correctness.
 * 
 * @param repoUrl Github repository url
 * @returns The data required to calculate the correctness.
 */
export function getCorrectnessData(repoUrl: string): CorrectnessData {
  let closedIssues: number = -1
  let openIssues: number = -1

  getIssues(repoUrl, 'closed').then((data: number) => {
    closedIssues = data
  })
  getIssues(repoUrl, 'open').then((data: number) => {
    openIssues = data
  })

  return <CorrectnessData>{
    closedIssues,
    openIssues,
  }
}
