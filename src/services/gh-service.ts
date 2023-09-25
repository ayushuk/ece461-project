import axios from 'axios'
import {
  BusFactorData,
  CorrectnessData,
  ResponsesivenessData,
} from '../models/middleware-inputs'
import * as ghApi from './gh-api'
import logger from '../logger'

/**
 * Gets the data required to calculate the bus factor.
 *
 * @param repoUrl Github repository url.
 * @returns The data required to calculate the bus factor.
 */
export async function getBusFactorData(
  repoUrl: string,
): Promise<BusFactorData> {
  logger.info('GH_SERVICE: running getBusFactorData')
  const [criticalUserLogin, criticalContrubitorCommits, totalCommits] =
    await ghApi.getCommitData(repoUrl)
  const [criticalContributorPullRequests, totalPullRequests] =
    await ghApi.getPullRequestData(repoUrl, criticalUserLogin)

  return <BusFactorData>{
    criticalContrubitorCommits,
    totalCommits,
    criticalContributorPullRequests,
    totalPullRequests,
  }
}

/**
 * Gets the data required to calculate the correctness.
 *
 * @param repoUrl Github repository url
 * @returns The data required to calculate the correctness.
 */
export async function getCorrectnessData(
  repoUrl: string,
): Promise<CorrectnessData> {
  logger.info('GH_SERVICE: running getCorrectnessData')
  const closedIssues = await ghApi.getIssues(repoUrl, 'closed')
  const openIssues = await ghApi.getIssues(repoUrl, 'open')

  return <CorrectnessData>{
    closedIssues,
    openIssues,
  }
}

/**
 * Determines if the repository is compliant with the lgpl-2.1 license.
 *
 * TODO: add other compatiable licenses
 *
 * @param repoUrl Github repository url
 * @returns 1 if the repository is compliant with the lgpl-2.1 license, 0 otherwise.
 */
export async function getLiscenseComplianceData(
  repoUrl: string,
): Promise<number> {
  logger.info('GH_SERVICE: running getLiscenseComplianceData')
  const liscense: string = await ghApi.getLicense(repoUrl)
  return liscense === 'lpgl-2.1' ? 1 : 0
}

/**
 * Gets the data required to calculate the responsiveness.
 *
 * @param repoUrl Github repository url
 * @returns The data required to calculate the responsiveness.
 */
export async function getResponsivenessData(
  repoUrl: string,
): Promise<ResponsesivenessData> {
  logger.info('GH_SERVICE: running getResponsivenessData')
  const monthlyCommitCount = await ghApi.getMonthlyCommitCount(repoUrl)
  const annualCommitCount: number = await ghApi.getAnualCommitCount(repoUrl)

  return <ResponsesivenessData>{
    monthlyCommitCount,
    annualCommitCount,
  }
}

/**
 * Converts a NPM link into a Github repository url.
 * 
 * @param npmUrl Link to npm package
 * @returns Github repository url
 */
export async function getGithubLinkFromNpm(npmUrl: string): Promise<string> {
  logger.info('GH_SERVICE: running getGithubLinkFromNpm')
  const instance = axios.create({
    baseURL: 'https://registry.npmjs.org/',
    timeout: 10_000,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  }) // create axios instance

  const npmName = npmUrl.split('/')[4]
  try {
    const response = await instance.get(`${npmName}`)
    return response.data.repository.url
  } catch {
    return 'error'
  }
}
