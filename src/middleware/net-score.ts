import {round} from './utils'
import logger from '../logger'

// NetScore sub-category Calculations
/* eslint-disable max-params */
export async function calculateNetScore(
  busFactor: number,
  correctness: number,
  rampUpTime: number,
  responsiveness: number,
  licenseCompliance: number,
): Promise<number> {
  logger.info('Calculating Net Score')

  /* eslint-disable no-template-curly-in-string */
  logger.debug(
    'busFactor: ${busFactor}, correctness: ${correctness}, rampUpTime: ${rampUpTime}, responsiveness: ${responsiveness}, licenseCompliance: ${licenseCompliance}',
  )
  /* eslint-enable no-template-curly-in-string */

  // Score weights
  const busFactorWeight = 0.4
  const correctnessWeight = 0.15
  const rampUpTimeWeight = 0.15
  const responsivenessWeight = 0.3

  // Calculate net score with weightings
  let netScore =
    licenseCompliance *
    (busFactor * busFactorWeight +
      correctness * correctnessWeight +
      rampUpTime * rampUpTimeWeight +
      responsiveness * responsivenessWeight)

  netScore = round(netScore, 3)

  return netScore
}
