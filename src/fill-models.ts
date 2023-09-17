import {
  calculateBusFactor,
  calculateCorrectness,
  calculateRampUpTime,
  calculateResponsiveness,
  calculateLicenseCompliance,
  calculateNetScore,
} from './middleware/metric-calculations'
import {Urlmetrics} from './url-models'

// using imported class and functions to get scores and send to frontend
export function assignMetrics(data: string): Urlmetrics {
  const newURL = new Urlmetrics(data)
  newURL.BusFactor = calculateBusFactor(newURL.URL)
  newURL.Correctness = calculateCorrectness(newURL.URL)
  newURL.RampUp = calculateRampUpTime(newURL.URL)
  newURL.Responsiveness = calculateResponsiveness(newURL.URL)
  newURL.License = calculateLicenseCompliance(newURL.URL)
  newURL.NetScore = calculateNetScore(newURL.URL)
  return newURL
}

// exporting for unit tests
export {
  calculateBusFactor,
  calculateCorrectness,
  calculateRampUpTime,
  calculateResponsiveness,
  calculateLicenseCompliance,
  calculateNetScore, 
}