import {round} from './utils'
import {
  calculateBusFactor,
  calculateCorrectness,
  calculateRampUpTime,
  calculateResponsiveness,
  calculateLicenseCompliance,
} from './metric-calculations'

// NetScore Calculations
export async function calculateNetScore(url: string): Promise<number> {
  const busFactor = await calculateBusFactor(url)
  const correctness = await calculateCorrectness(url)
  const rampUpTime = await calculateRampUpTime(url)
  const responsiveness = await calculateResponsiveness(url)
  const licenseCompliance = await calculateLicenseCompliance(url)

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
