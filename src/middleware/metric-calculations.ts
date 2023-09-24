// funciton imports
import {round} from './utils'
import {
  getBusFactorData,
  getCorrectnessData,
  getResponsivenessData,
  getLiscenseComplianceData,
} from '../services/gh-service'

// Bus Factor Calculations
export function calculateBusFactor(url: string) {
  // get data using ./services/gh-service.ts
  const data = getBusFactorData(url)

  // get data from returned object
  const {
    criticalContrubitorCommits,
    totalCommits,
    criticalContributorPullRequests,
    totalPullRequests,
  } = data

  // variable weights
  const commitWeight = 0.5
  const prWeight = 0.5

  // calculate bus factor score
  const critBusFactor =
    criticalContrubitorCommits * commitWeight +
    criticalContributorPullRequests * prWeight

  const totalBusFactor =
    totalCommits * commitWeight + totalPullRequests * prWeight

  let busFactorScore = 1 - critBusFactor / totalBusFactor

  // round to 3 decimal places
  busFactorScore = round(busFactorScore, 3)

  return busFactorScore
}

// Correctness Calculations
export function calculateCorrectness(url: string) {
  // get data using ./services/gh-service.ts
  const data = getCorrectnessData(url)

  // get data from returned object
  const {closedIssues, openIssues} = data

  // calculate correctness score
  let correctnessScore = closedIssues / (closedIssues + openIssues)

  // round to 3 decimal places
  correctnessScore = round(correctnessScore, 3)

  return correctnessScore
}

// Ramp-up Time Calculations
export function calculateRampUpTime() {
  // // this is going to be Github URL
  // const linesReadme = 0 // set to value in object
  // const linesCode = 0 // set to value in object

  // const rampUpTime = linesReadme / linesCode

  // return rampUpTime
  const rampUpTime = 0

  return rampUpTime
}

// Responsiveness Calculations
export function calculateResponsiveness(url: string) {
  // get data using ./services/gh-service.ts
  const data = getResponsivenessData(url)

  const {monthlyCommitCount, annualCommitCount} = data

  // calculate responsiveness score
  if (annualCommitCount === 0) {
    return 0
  }

  let responsivenessScore = monthlyCommitCount / annualCommitCount / 12

  // round to 3 decimal places
  responsivenessScore = round(responsivenessScore, 3)

  return responsivenessScore
}

// License Compliance Calculations
export function calculateLicenseCompliance(url: string) {
  const licenseCompliantScore = getLiscenseComplianceData(url)

  return licenseCompliantScore
}
