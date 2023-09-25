import {
  calculateBusFactor,
  calculateCorrectness,
  calculateRampUpTime,
  calculateResponsiveness,
  calculateLicenseCompliance,
} from './metric-calculations'
import {calculateNetScore} from './net-score'
import {Urlmetrics} from '../models/url-models'
import logger from '../logger'

// using imported class and functions to get scores and send to frontend
export async function assignMetrics(data: string): Promise<Urlmetrics> {
  if (process.env.LOG_LEVEL == '1') {
    logger.info(`Calling calculation functions for ${data}`)
  } else if (process.env.LOG_LEVEL == '2') {
    logger.debug(`Entering assignMetrics function for ${data}`)
  }
  const newURL = new Urlmetrics(data)
  newURL.BusFactor = await calculateBusFactor(newURL.URL)
  newURL.Correctness = await calculateCorrectness(newURL.URL)
  newURL.RampUp = await calculateRampUpTime(newURL.URL)
  newURL.Responsiveness = await calculateResponsiveness(newURL.URL)
  newURL.License = await calculateLicenseCompliance(newURL.URL)
  newURL.NetScore = await calculateNetScore(newURL.URL)
  return newURL
}
