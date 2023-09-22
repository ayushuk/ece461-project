import {round} from './utils'
import {
  calculateBusFactor,
  calculateCorrectness,
  calculateRampUpTime,
  calculateResponsiveness,
  calculateLicenseCompliance,
} from './metric-calculations'

// NetScore Calculations
export function calculateNetScore(url: string) {
  const busFactor = calculateBusFactor(url)
  const correctness = calculateCorrectness(url)
  const rampUpTime = calculateRampUpTime()
  const responsiveness = calculateResponsiveness(url)
  const licenseCompliance = calculateLicenseCompliance(url)

  // Score weights
  const busFactorWeight = 0.4
  const correctnessWeight = 0.15
  const rampUpTimeWeight = 0.15
  const responsivenessWeight = 0.3

  let netScore =
    licenseCompliance *
    (busFactor * busFactorWeight +
      correctness * correctnessWeight +
      rampUpTime * rampUpTimeWeight +
      responsiveness * responsivenessWeight)

  netScore = round(netScore, 3)

  return netScore
}
