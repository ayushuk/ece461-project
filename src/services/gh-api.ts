import * as dotenv from 'dotenv'
import axios from 'axios'

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
    timeout: 10000,
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
    timeout: 10000,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  }) // create axios instance

  const repoOwner = repoUrl.split('/')[3]
  const repoName = repoUrl.split('/')[4]
  try {
    const response = await instance.get(
      `${repoOwner}/${repoName}/search/pulls`,
      {
        params: {state: 'all', per_page: 100}, // eslint-disable-line camelcase
      },
    )
    let crituserpullrequests: number = 0
    const totalpullrequests: number = response.data.length

    for (let i = 0; i < totalpullrequests; i += 1) {
      if (response.data[i].user.login === critUser) {
        crituserpullrequests += 1
      }
    }

    return [crituserpullrequests, totalpullrequests] as const
  } catch {
    return [-1, -1] as const
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
    timeout: 10000,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  }) // create axios instance

  const repoOwner = repoUrl.split('/')[3]
  const repoName = repoUrl.split('/')[4]
  try {
    const response = await instance.get(`${repoOwner}/${repoName}/issues`, {
      params: {state, per_page: 100}, // eslint-disable-line camelcase
    })
    return response.data.length
  } catch {
    return -1
  }
}

/**
 * Gets the license of the repository.
 *
 * TODO: handle failure logging
 *
 * @param repoUrl Github repository url
 * @returns The license of the repository.
 */
export async function getLicense(repoUrl: string): Promise<string> {
  const instance = axios.create({
    baseURL: 'https://api.github.com/repos',
    timeout: 10000,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  }) // create axios instance

  const repoOwner = repoUrl.split('/')[3]
  const repoName = repoUrl.split('/')[4]
  try {
    const response = await instance.get(`${repoOwner}/${repoName}/license`)
    return response.data.license.key
  } catch {
    return ''
  }
}

/**
 * Gets the number of commits made in the past month.
 *
 * @param repoUrl  Github repository url
 * @returns The number of commits in the last 4 weeks
 */
export async function getMonthlyCommitCount(repoUrl: string): Promise<number> {
  const instance = axios.create({
    baseURL: 'https://api.github.com/repos',
    timeout: 10000,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  }) // create axios instance

  const repoOwner = repoUrl.split('/')[3]
  const repoName = repoUrl.split('/')[4]
  try {
    const response = await instance.get(
      `${repoOwner}/${repoName}/stats/participation`,
    )

    let count = 0
    for (let i = 0; i < 4; i += 1) {
      count += response.data.all.pop()
    }

    return count
  } catch {
    return -1
  }
}

/**
 * Gets the number of commits made in the past year.
 *
 * @param repoUrl Github repository url
 * @returns The number of commits in the last year.
 */
export async function getAnualCommitCount(repoUrl: string): Promise<number> {
  const instance = axios.create({
    baseURL: 'https://api.github.com/repos',
    timeout: 10000,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  }) // create axios instance

  const repoOwner = repoUrl.split('/')[3]
  const repoName = repoUrl.split('/')[4]
  try {
    const response = await instance.get(
      `${repoOwner}/${repoName}/stats/commit_activity`,
    )
    let count = 0
    for (let i = 0; i < response.data.length; i += 1) {
      count += response.data[i].total
    }

    return count
  } catch {
    return -1
  }
}
