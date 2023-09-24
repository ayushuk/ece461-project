import {
  calculateBusFactor,
  calculateCorrectness,
  calculateRampUpTime,
  calculateResponsiveness,
  calculateLicenseCompliance,
} from './middleware/metric-calculations'
import {calculateNetScore} from './middleware/net-score'
import {Urlmetrics} from './url-models'

// using imported class and functions to get scores and send to frontend
export async function assignMetrics(data: string): Promise<Urlmetrics> {
  const newURL = new Urlmetrics(data)
  newURL.BusFactor = await calculateBusFactor(newURL.URL)
  newURL.Correctness = await calculateCorrectness(newURL.URL)
  // newURL.RampUp = await calculateRampUpTime(newURL.URL)
  newURL.Responsiveness = await calculateResponsiveness(newURL.URL)
  newURL.License = await calculateLicenseCompliance(newURL.URL)
  newURL.NetScore = await calculateNetScore(newURL.URL)
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
