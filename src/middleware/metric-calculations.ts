// funciton imports
import {BusFactorData, CorrectnessData} from '../models/middleware-inputs'
import {round} from './utils'

// Bus Factor Calculations
export function calculateBusFactor(data: string) {
  // assume this is going to be Github URL

  // get data from object
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
export function calculateCorrectness(data: string) {
  // this is going to be Github URL
  const {closedIssues, openIssues} = data

  const correctnessScore = closedIssues / (closedIssues + openIssues)

  return correctnessScore
}

// Ramp-up Time Calculations
export function calculateRampUpTime(data: string) {
  // this is going to be Github URL
  const linesReadme = 0 // set to value in object
  const linesCode = 0 // set to value in object

  const rampUpTime = linesReadme / linesCode

  return rampUpTime
}

// Responsiveness Calculations
export function calculateResponsiveness(data: string) {
  // this is going to be Github URL
  const monthlyCommits = 0 // set to value in object
  const annualCommits = 0 // set to value in object

  const responsivenessScore = monthlyCommits / annualCommits

  return responsivenessScore
}

// License Compliance Calculations
export function calculateLicenseCompliance(data: string) {
  // this is going to be Github URL
  const license = 'license' // set to value in object
  const validLicense = 'temp'
  const licenseCompliantScore = 0

  // if (license === validLicense) {
  //   licenseCompliantScore = 1
  // }

  return licenseCompliantScore
}

// NetScore Calculations
export function calculateNetScore(data: string) {
  // this is going to be Github URL
  // calculate scores
  const busFactor = 0 // calculateBusFactor(data)
  const correctness = 0 // calculateCorrectness(data)
  const rampUpTime = calculateRampUpTime(data)
  const responsiveness = calculateResponsiveness(data)
  const licenseCompliance = calculateLicenseCompliance(data)

  // Score weights
  const busFactorWeight = 0.4
  const correctnessWeight = 0.15
  const rampUpTimeWeight = 0.15
  const responsivenessWeight = 0.3

  const netScore =
    licenseCompliance *
    (busFactor * busFactorWeight +
      correctness * correctnessWeight +
      rampUpTime * rampUpTimeWeight +
      responsiveness * responsivenessWeight)

  return netScore
}
