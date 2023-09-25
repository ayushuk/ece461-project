import * as metrics from '../../src/middleware/metric-calculations'
import * as utils from '../../src/middleware/utils'
import * as netscore from '../../src/middleware/net-score'

describe('calculateNetScore', () => {
  it('should return a 0 when repo does not have a valid license', async () => {
    // mock calculateBusFactor
    const mockBusFactorScore = 0.5
    const mockCalculateBusFactor = jest.spyOn(metrics, 'calculateBusFactor')
    mockCalculateBusFactor.mockReturnValue(Promise.resolve(mockBusFactorScore))

    // mock calculateCorrectness
    const mockCorrectnessScore = 0.5
    const mockCalculateCorrectness = jest.spyOn(metrics, 'calculateCorrectness')
    mockCalculateCorrectness.mockReturnValue(
      Promise.resolve(mockCorrectnessScore),
    )

    // mock calculateRampUpTime
    // const mockRampUpScore = 0.5
    // const mockCalculateRampUp = jest.spyOn(metrics, 'calculateRampUpTime')
    // mockCalculateRampUp.mockReturnValue(Promise.resolve(mockRampUpScore))

    // mock calculateResponsiveness
    const mockResponsivenessScore = 0.5
    const mockCalculateResponsiveness = jest.spyOn(
      metrics,
      'calculateResponsiveness',
    )
    mockCalculateResponsiveness.mockReturnValue(
      Promise.resolve(mockResponsivenessScore),
    )

    // mock calculateLicenseCompliance
    const mockLicenseScore = 0
    const mockCalculateLicenseCompliance = jest.spyOn(
      metrics,
      'calculateLicenseCompliance',
    )
    mockCalculateLicenseCompliance.mockReturnValue(
      Promise.resolve(mockLicenseScore),
    )

    // mock round
    const roundMock = jest.spyOn(utils, 'round')
    roundMock.mockReturnValue(0)

    // Call calculateNetScore
    const testUrl = 'https://github.com/ayushuk/ece461-project'
    const result = await netscore.calculateNetScore(testUrl)

    // Assertions
    expect(metrics.calculateBusFactor).toHaveBeenCalledWith(testUrl)
    expect(metrics.calculateCorrectness).toHaveBeenCalledWith(testUrl)
    //expect(metrics.calculateRampUpTime).toHaveBeenCalledWith(testUrl)
    expect(metrics.calculateResponsiveness).toHaveBeenCalledWith(testUrl)
    expect(metrics.calculateLicenseCompliance).toHaveBeenCalledWith(testUrl)
    expect(roundMock).toHaveBeenCalledWith(0, 3)

    // Expect result to be 0 when a license is not found
    expect(result).toBe(0)
  })

  it('should return a 0 when repo does not have a valid license', async () => {
    // mock calculateBusFactor
    const mockBusFactorScore = 0.5
    const mockCalculateBusFactor = jest.spyOn(metrics, 'calculateBusFactor')
    mockCalculateBusFactor.mockReturnValue(Promise.resolve(mockBusFactorScore))

    // mock calculateCorrectness
    const mockCorrectnessScore = 0.5
    const mockCalculateCorrectness = jest.spyOn(metrics, 'calculateCorrectness')
    mockCalculateCorrectness.mockReturnValue(
      Promise.resolve(mockCorrectnessScore),
    )

    // mock calculateRampUpTime
    // const mockRampUpScore = 0.5
    // const mockCalculateRampUp = jest.spyOn(metrics, 'calculateRampUpTime')
    // mockCalculateRampUp.mockReturnValue(Promise.resolve(mockRampUpScore))

    // mock calculateResponsiveness
    const mockResponsivenessScore = 0.5
    const mockCalculateResponsiveness = jest.spyOn(
      metrics,
      'calculateResponsiveness',
    )
    mockCalculateResponsiveness.mockReturnValue(
      Promise.resolve(mockResponsivenessScore),
    )

    // mock calculateLicenseCompliance
    const mockLicenseScore = 1
    const mockCalculateLicenseCompliance = jest.spyOn(
      metrics,
      'calculateLicenseCompliance',
    )
    mockCalculateLicenseCompliance.mockReturnValue(
      Promise.resolve(mockLicenseScore),
    )

    // mock round
    const roundMock = jest.spyOn(utils, 'round')
    roundMock.mockReturnValue(0.5)

    // Call calculateNetScore
    const testUrl = 'https://github.com/ayushuk/ece461-project'
    const result = await netscore.calculateNetScore(testUrl)

    // Assertions
    expect(metrics.calculateBusFactor).toHaveBeenCalledWith(testUrl)
    expect(metrics.calculateCorrectness).toHaveBeenCalledWith(testUrl)
    // expect(metrics.calculateRampUpTime).toHaveBeenCalledWith(testUrl)
    expect(metrics.calculateResponsiveness).toHaveBeenCalledWith(testUrl)
    expect(metrics.calculateLicenseCompliance).toHaveBeenCalledWith(testUrl)
    expect(roundMock).toHaveBeenCalledWith(0.425_000_000_000_000_04, 3)

    // Expect result to be 0 when a license is not found
    expect(result).toBe(0.5)
  })
})
