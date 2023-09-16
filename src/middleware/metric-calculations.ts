// funciton imports
import {BusFactorData, CorrectnessData} from '../models/middleware-inputs'
import {round} from './utils'

// Bus Factor Calculations
export function calculateBusFactor(data: BusFactorData) {
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
export function calculateCorrectness(data: CorrectnessData) {
  // this is going to be Github URL
  const {closedIssues, openIssues} = data

  const correctnessScore = closedIssues / (closedIssues + openIssues)

  return correctnessScore
}

// // Ramp-up Time Calculations
// export function calculateRampUpTime(data: string) {
//   // this is going to be Github URL
//   var linesReadme = 0 // set to value in object
//   var linesCode = 0 // set to value in object

//   const rampUpTime = linesReadme / linesCode

//   return rampUpTime
// }

// // Responsiveness Calculations
// export function calculateResponsiveness(data: string) {
//   // this is going to be Github URL
//   var monthlyCommits = 0 // set to value in object
//   var annualCommits = 0 // set to value in object

//   const responsivenessScore = monthlyCommits / annualCommits

//   return responsivenessScore
// }

// License Compliance Calculations
// export function calculateLicenseCompliance(data: string) {
//   // this is going to be Github URL
//   var license = 'license' // set to value in object
//   var validLicense = 'temp'
//   var licenseCompliantScore = 0

//   if (license == validLicense) {
//     licenseCompliantScore = 1
//   }

//   return licenseCompliantScore
// }

// NetScore Calculations
// export function calculateNetScore(data: string) {
//   // this is going to be Github URL
//   // calculate scores
//   var busFactor = calculateBusFactor(data)
//   var correctness = calculateCorrectness(data)
//   var rampUpTime = calculateRampUpTime(data)
//   var responsiveness = calculateResponsiveness(data)
//   var licenseCompliance = calculateLicenseCompliance(data)

//   // Score weights
//   var busFactorWeight = 0.4
//   var correctnessWeight = 0.15
//   var rampUpTimeWeight = 0.15
//   var responsivenessWeight = 0.3

//   var net_score =
//     licenseCompliance *
//     (busFactor * busFactorWeight +
//       correctness * correctnessWeight +
//       rampUpTime * rampUpTimeWeight +
//       responsiveness * responsivenessWeight)

//   return net_score
// }
