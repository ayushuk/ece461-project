import {jest, expect} from '@jest/globals'
import {assignMetrics} from '../src/fill-models'
import {Urlmetrics} from '../src/url-models'
import * as fillModels from '../src/middleware/metric-calculations'

describe('fill-models', () => {
  it('should return filled in Urlmetric class', () => {
    const mockBusFactor = 0.5
    const mockCalculateBusFactor = jest.spyOn(fillModels, 'calculateBusFactor')
    mockCalculateBusFactor.mockReturnValue(mockBusFactor)
    const mockCorrectness = 0.4
    const mockCalculateCorrectness = jest.spyOn(
      fillModels,
      'calculateCorrectness',
    )
    mockCalculateCorrectness.mockReturnValue(mockCorrectness)
    const mockRampUpTime = 0.3
    const mockCalculateRampUpTime = jest.spyOn(
      fillModels,
      'calculateRampUpTime',
    )
    mockCalculateRampUpTime.mockReturnValue(mockRampUpTime)
    const mockResponsiveness = 0.2
    const mockCalculateResponsiveness = jest.spyOn(
      fillModels,
      'calculateResponsiveness',
    )
    mockCalculateResponsiveness.mockReturnValue(mockResponsiveness)
    const mockLicenseCompliance = 1
    const mockCalculateLicenseCompliance = jest.spyOn(
      fillModels,
      'calculateLicenseCompliance',
    )
    mockCalculateLicenseCompliance.mockReturnValue(mockLicenseCompliance)
    const mockNetScore = 0.6
    const mockCalculateNetScore = jest.spyOn(fillModels, 'calculateNetScore')
    mockCalculateNetScore.mockReturnValue(mockNetScore)

    const result = assignMetrics('https://github.com/XavierJCallait/test')
    expect(result).toBeInstanceOf(Urlmetrics)
    expect(result.BusFactor).toBe(0.5)
    expect(result.Correctness).toBe(0.4)
    expect(result.RampUp).toBe(0.3)
    expect(result.Responsiveness).toBe(0.2)
    expect(result.License).toBe(1)
    expect(result.NetScore).toBe(0.6)
  })
})
