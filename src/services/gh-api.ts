import * as dotenv from 'dotenv'
import axios from 'axios'
import logger from '../logger'

dotenv.config() // load enviroment variables

/**
 * Get the commits made by the top contributor and the total contributions across
 * the top 10 contributors including the top contributor.
 *
 * @param repoUrl Github repository url
 * @returns Name of the most critical contributor, contributions by the critical
 *          contributor and the total contributions across the top 10 contributors
 *          If there is an error, returns ['', -1, -1].
 */
export async function getCommitData(
  repoUrl: string,
): Promise<readonly [string, number, number]> {
  logger.info('GH_API: running getCommitData')
  const instance = axios.create({
    baseURL: 'https://api.github.com/repos/',
    timeout: 10_000,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  }) // create axios instance

  const repoOwner = repoUrl.split('/')[3]
  const repoName = repoUrl.split('/')[4]
  try {
    console.log('before')
    const response = await instance.get(`${repoOwner}/${repoName}/contributors`)
    console.log('after')
    const {login} = response.data[0]
    const {contributions} = response.data[0]

    // get the total contribution acorss top 10 contributors
    let totalContributions: number = 0
    for (let i = 0; i < response.data.length; i += 1) {
      totalContributions += response.data[i].contributions
    }

    logger.debug(
      'GH_API: getCommitData {',
      login,
      contributions,
      totalContributions,
      '}',
    )
    return [login, contributions, totalContributions] as const
  } catch {
    logger.info('GH_API: getCommitData failed')
    return ['', -1, -1]
  }
}

/**
 * Get the number of pull requests made by the critical contributor and the total number of pull requests.
 * (might always return 100 pull requests because of github api pagination)
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
  logger.info('GH_API: running getPullRequestData')
  const instance = axios.create({
    baseURL: 'https://api.github.com/repos/',
    timeout: 10_000,
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

    logger.debug(
      'GH_API: getPullRequestData {',
      crituserpullrequests,
      totalpullrequests,
      '}',
    )
    return [crituserpullrequests, totalpullrequests] as const
  } catch {
    logger.info('GH_API: getPullRequestData failed')
    return [-1, -1] as const
  }
}

/**
 * Gets the number of issues in a given state.
 *
 * @param repoUrl Gihub repository url
 * @param state State of the issue
 * @returns The number of issues in the state.
 */
export async function getIssues(
  repoUrl: string,
  state: 'open' | 'closed',
): Promise<number> {
  logger.info('GH_API: running getIssues')
  const instance = axios.create({
    baseURL: 'https://api.github.com/repos/',
    timeout: 10_000,
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
    logger.debug('GH_API: getIssues {', response.data.length, '}')
    return response.data.length
  } catch {
    logger.info('GH_API: getIssues failed')
    return -1
  }
}

/**
 * Gets the license of the repository.
 *
 * @param repoUrl Github repository url
 * @returns The license of the repository.
 */
export async function getLicense(repoUrl: string): Promise<string> {
  logger.info('GH_API: running getLicense')
  const instance = axios.create({
    baseURL: 'https://api.github.com/repos',
    timeout: 10_000,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  }) // create axios instance

  const repoOwner = repoUrl.split('/')[3]
  const repoName = repoUrl.split('/')[4]
  try {
    const response = await instance.get(`${repoOwner}/${repoName}/license`)
    logger.debug('GH_API: getLicense {', response.data.license.key, '}')
    return response.data.license.key
  } catch {
    logger.info('GH_API: getLicense failed')
    return ''
  }
}

/**
 * Gets the number of commits made in the past month.
 *
 * @param repoUrl  Github repository url
 * @returns The number of commits in the last 4 weeks
 */
export async function getMonthlyCommitCount(
  repoUrl: string,
): Promise<Array<number>> {
  logger.info('GH_API: running getMonthlyCommitCount')
  const instance = axios.create({
    baseURL: 'https://api.github.com/repos',
    timeout: 10_000,
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

    // get commit counts for each month of the year
    const months =
      response.data.all.length >= 52 ? 12 : response.data.all.length / 4
    const count = []
    const result = []
    for (let i = 0; i < response.data.all.length; i += 1) {
      count[i] = response.data.all[i]
    }

    for (let i = 0; i < months; i += 1) {
      result[i] = 0
    }

    for (let i = 0; i < response.data.all.length; i += 1) {
      result[Math.trunc(i / months)] += response.data.all[i]
    }

    logger.debug('GH_API: getMonthlyCommitCount {', result, '}')
    return result
  } catch {
    logger.info('GH_API: getMonthlyCommitCount failed')
    return [-1]
  }
}

/**
 * Gets the number of commits made in the past year.
 *
 * @param repoUrl Github repository url
 * @returns The number of commits in the last year.
 */
export async function getAnualCommitCount(repoUrl: string): Promise<number> {
  logger.info('GH_API: running getAnualCommitCount')
  const instance = axios.create({
    baseURL: 'https://api.github.com/repos',
    timeout: 10_000,
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

    logger.debug('GH_API: getAnualCommitCount {', count, '}')
    return count
  } catch {
    logger.info('GH_API: getAnualCommitCount failed')
    return -1
  }
}
