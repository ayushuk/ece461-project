// funciton imports
import * as utils from './utils'
import {
  getBusFactorData,
  getCorrectnessData,
  getResponsivenessData,
  getLiscenseComplianceData,
} from '../services/gh-service'
import logger from '../logger'

// Bus Factor Calculations
export async function calculateBusFactor(url: string) {
  logger.info('Calculating Bus Factor')

  // checks to see if link is a npm link and if so, converts it to a github link
  const link = await utils.evaluateLink(url)
  let data = null

  // get data using ./services/gh-service.ts
  if (link) {
    data = await getBusFactorData(link)
  } else {
    return 0
  }

  // get data from returned object
  const {
    criticalContrubitorCommits,
    totalCommits,
    criticalContributorPullRequests,
    totalPullRequests,
  } = data

  logger.debug(
    `criticalContrubitorCommits: ${criticalContrubitorCommits}, totalCommits: ${totalCommits}, criticalContributorPullRequests: ${criticalContributorPullRequests}, totalPullRequests: ${totalPullRequests}`,
  )

  // variable weights
  const commitWeight = 0.4
  const prWeight = 0.6

  // calculate bus factor score
  const critBusFactor =
    criticalContrubitorCommits * commitWeight +
    criticalContributorPullRequests * prWeight

  const totalBusFactor =
    totalCommits * commitWeight + totalPullRequests * prWeight

  let busFactorScore = 1 - critBusFactor / totalBusFactor

  // round to 3 decimal places
  busFactorScore = utils.round(busFactorScore, 3)

  return busFactorScore
}

// Correctness Calculations
export async function calculateCorrectness(url: string) {
  logger.info('Calculating Correctness')

  // checks to see if link is a npm link and if so, converts it to a github link
  const link = await utils.evaluateLink(url)
  let data = null

  // get data using ./services/gh-service.ts
  if (link) {
    data = await getCorrectnessData(url)
  } else {
    return 0
  }

  // get data from returned object
  const {closedIssues, openIssues} = data

  logger.debug(`closedIssues: ${closedIssues}, openIssues: ${openIssues}`)

  const totalIssues = closedIssues + openIssues

  if (totalIssues === 0) {
    return 0
  }

  // calculate correctness score
  let correctnessScore = closedIssues / totalIssues

  // round to 3 decimal places
  correctnessScore = utils.round(correctnessScore, 3)

  return correctnessScore
}

// Ramp-up Time Calculations
export async function calculateRampUpTime(url: string) {
  logger.info('Calculating Ramp Up Time')

  // checks to see if link is a npm link and if so, converts it to a github link
  const link = await utils.evaluateLink(url)
  let linesOfCode = 0

  // get data using ./services/gh-service.ts
  if (link) {
    // clones the repo into ./cloned-repos
    utils.cloneRepo(url)

    linesOfCode = await utils.calcRepoLines(url)
  } else {
    return 0
  }

  logger.debug(`linesOfCode: ${linesOfCode}`)

  let rampUpScore = 0

  if (linesOfCode <= 500) {
    rampUpScore = 1
  } else if (linesOfCode <= 1000) {
    rampUpScore = 0.9
  } else if (linesOfCode <= 5000) {
    rampUpScore = 0.8
  } else if (linesOfCode <= 10_000) {
    rampUpScore = 0.7
  } else if (linesOfCode <= 50_000) {
    rampUpScore = 0.6
  } else if (linesOfCode <= 100_000) {
    rampUpScore = 0.5
  } else if (linesOfCode <= 500_000) {
    rampUpScore = 0.4
  } else if (linesOfCode <= 1_000_000) {
    rampUpScore = 0.3
  } else if (linesOfCode <= 5_000_000) {
    rampUpScore = 0.2
  }

  return rampUpScore
}

// Responsiveness Calculations
export async function calculateResponsiveness(url: string) {
  logger.info('Calculating Responsiveness')

  // checks to see if link is a npm link and if so, converts it to a github link
  const link = await utils.evaluateLink(url)
  let data = null

  // get data using ./services/gh-service.ts
  if (link) {
    data = await getResponsivenessData(url)
  } else {
    return 0
  }

  const {monthlyCommitCount, annualCommitCount} = data

  // calculate difference between the max and min monthly commits
  const maxMonthlyCommitCount = Math.max(...monthlyCommitCount)
  const minMonthlyCommitCount = Math.min(...monthlyCommitCount)
  const diffCommit = maxMonthlyCommitCount - minMonthlyCommitCount

  logger.debug(
    `maxMonthlyCommitCount: ${maxMonthlyCommitCount}, minMonthlyCommitCount: ${minMonthlyCommitCount}, diffCommit: ${diffCommit}`,
  )

  /* eslint-disable no-implicit-coercion */
  /* eslint-disable no-else-return */

  // assign score based oon difference between max and min monthly commits
  if (diffCommit < annualCommitCount * 0.1) {
    return 1
  } else if (diffCommit < annualCommitCount * 0.2) {
    return 0.9
  } else if (diffCommit < annualCommitCount * 0.3) {
    return 0.8
  } else if (diffCommit < annualCommitCount * 0.4) {
    return 0.7
  } else if (diffCommit < annualCommitCount * 0.5) {
    return 0.6
  } else if (diffCommit < annualCommitCount * 0.6) {
    return 0.5
  } else if (diffCommit < annualCommitCount * 0.7) {
    return 0.4
  } else if (diffCommit < annualCommitCount * 0.8) {
    return 0.3
  } else if (diffCommit < annualCommitCount * 0.9) {
    return 0.2
  } else if (diffCommit < annualCommitCount * 1) {
    return 0.1
  } else {
    return 0
  }
  /* eslint-enable no-else-return */
  /* eslint-enable no-implicit-coercion */
}

// License Compliance Calculations
export async function calculateLicenseCompliance(url: string) {
  logger.info('Calculating License Compliance')
  // checks to see if link is a npm link and if so, converts it to a github link
  const link = await utils.evaluateLink(url)
  let licenseCompliantScore = 0

  // get data using ./services/gh-service.ts
  if (link) {
    licenseCompliantScore = await getLiscenseComplianceData(url)

    logger.debug(`licenseCompliantScore: ${licenseCompliantScore}`)
  } else {
    return 0
  }

  return licenseCompliantScore
}
