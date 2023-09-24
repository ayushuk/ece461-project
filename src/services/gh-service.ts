import {
  BusFactorData,
  CorrectnessData,
  ResponsesivenessData,
} from '../models/middleware-inputs'
import * as ghApi from './gh-api'

/**
 * Gets the data required to calculate the bus factor.
 *
 * @param repoUrl Github repository url.
 * @returns The data required to calculate the bus factor.
 */
export async function getBusFactorData(
  repoUrl: string,
): Promise<BusFactorData> {
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
  const monthlyCommitCount = await ghApi.getMonthlyCommitCount(repoUrl)
  const annualCommitCount: number = await ghApi.getAnualCommitCount(repoUrl)

  return <ResponsesivenessData>{
    monthlyCommitCount,
    annualCommitCount,
  }
}
