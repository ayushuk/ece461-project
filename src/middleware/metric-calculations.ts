// funciton imports
import * as utils from './utils'
import {
  getBusFactorData,
  getCorrectnessData,
  getResponsivenessData,
  getLiscenseComplianceData,
} from '../services/gh-service'

// Bus Factor Calculations
export async function calculateBusFactor(url: string) {
  // get data using ./services/gh-service.ts
  const data = await getBusFactorData(url)

  // get data from returned object
  const {
    criticalContrubitorCommits,
    totalCommits,
    criticalContributorPullRequests,
    totalPullRequests,
  } = data

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
  // get data using ./services/gh-service.ts
  const data = await getCorrectnessData(url)

  // get data from returned object
  const {closedIssues, openIssues} = data

  // calculate correctness score
  let correctnessScore = closedIssues / (closedIssues + openIssues)

  // round to 3 decimal places
  correctnessScore = utils.round(correctnessScore, 3)

  return correctnessScore
}

// Ramp-up Time Calculations
export async function calculateRampUpTime(url: string) {
  utils.cloneRepo(url)

  const linesOfCode = await utils.calcRepoLines(url)
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
  // get data using ./services/gh-service.ts
  const data = await getResponsivenessData(url)

  const {monthlyCommitCount, annualCommitCount} = data

  // calculate responsiveness score
  if (annualCommitCount === 0) {
    return 0
  }

  let responsivenessScore = monthlyCommitCount / annualCommitCount

  // round to 3 decimal places
  responsivenessScore = utils.round(responsivenessScore, 3)

  return responsivenessScore
}

// License Compliance Calculations
export async function calculateLicenseCompliance(url: string) {
  const licenseCompliantScore = await getLiscenseComplianceData(url)

  return licenseCompliantScore
}
