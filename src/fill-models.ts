import {calculateBusFactor, calculateCorrectness, calculateRampUpTime, calculateResponsivness, calculateLicenseCompliance, calculateNetScore} from './metric-calculations'
import {Urlmetrics} from './url-models'

export function assignMetrics(data: string): Urlmetrics {
  const newURL = new Urlmetrics(data)
  newURL.BusFactor = calculateBusFactor(newURL.URL)
  newURL.Correctness = calculateCorrectness(newURL.URL)
  newURL.RampUp = calculateRampUpTime(newURL.URL)
  newURL.Responsiveness = calculateResponsivness(newURL.URL)
  newURL.License = calculateLicenseCompliance(newURL.URL)
  newURL.NetScore = calculateNetScore(newURL.URL)
  return newURL
}

export function outputMetrics(data: Urlmetrics): void {
  console.log(data.makeNDJSON())
}
