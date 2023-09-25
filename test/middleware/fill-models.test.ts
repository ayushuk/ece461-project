import {assignMetrics} from '../../src/middleware/fill-models'
import * as fillModels from '../../src/middleware/metric-calculations'
import * as NetScore from '../../src/middleware/net-score'

describe('fill-models', () => {
  it('should return filled in Urlmetric class', async () => {
    // create mock returns for called functions
    const mockBusFactor = 0.5
    const mockCalculateBusFactor = jest.spyOn(fillModels, 'calculateBusFactor')
    mockCalculateBusFactor.mockReturnValue(Promise.resolve(mockBusFactor))
    const mockCorrectness = 0.4
    const mockCalculateCorrectness = jest.spyOn(
      fillModels,
      'calculateCorrectness',
    )
    mockCalculateCorrectness.mockReturnValue(Promise.resolve(mockCorrectness))
    // const mockRampUpTime = 0.3
    // const mockCalculateRampUpTime = jest.spyOn(
    //   fillModels,
    //   'calculateRampUpTime',
    // )
    // mockCalculateRampUpTime.mockReturnValue(Promise.resolve(mockRampUpTime))
    const mockResponsiveness = 0.2
    const mockCalculateResponsiveness = jest.spyOn(
      fillModels,
      'calculateResponsiveness',
    )
    mockCalculateResponsiveness.mockReturnValue(
      Promise.resolve(mockResponsiveness),
    )
    const mockLicenseCompliance = 1
    const mockCalculateLicenseCompliance = jest.spyOn(
      fillModels,
      'calculateLicenseCompliance',
    )
    mockCalculateLicenseCompliance.mockReturnValue(
      Promise.resolve(mockLicenseCompliance),
    )
    const mockNetScore = 0.6
    const mockCalculateNetScore = jest.spyOn(NetScore, 'calculateNetScore')
    mockCalculateNetScore.mockReturnValue(Promise.resolve(mockNetScore))

    // call function and expect outputs
    const result = await assignMetrics('https://github.com/XavierJCallait/test')

    expect(result).toBeInstanceOf(Promise)
    expect(result.BusFactor).toBe(0.5)
    expect(result.Correctness).toBe(0.4)
    expect(result.RampUp).toBe(0.3)
    expect(result.Responsiveness).toBe(0.2)
    expect(result.License).toBe(1)
    expect(result.NetScore).toBe(0.6)
  })
})
