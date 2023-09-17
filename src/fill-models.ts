import {
  calculateBusFactor,
  calculateCorrectness,
  calculateRampUpTime,
  calculateResponsiveness,
  calculateLicenseCompliance,
  calculateNetScore,
} from './middleware/metric-calculations'
import {Urlmetrics} from './url-models'

export function assignMetrics(data: string): Urlmetrics {
  const newURL = new Urlmetrics(data)
  newURL.BusFactor = calculateBusFactor(newURL)
  newURL.Correctness = calculateCorrectness(newURL)
  newURL.RampUp = calculateRampUpTime(newURL)
  newURL.Responsiveness = calculateResponsiveness(newURL)
  newURL.License = calculateLicenseCompliance(newURL)
  newURL.NetScore = calculateNetScore(newURL)
  return newURL
}

export function outputMetrics(data: Urlmetrics): void {
  console.log(data.makeNDJSON())
}
