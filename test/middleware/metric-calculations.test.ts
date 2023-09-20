import * as metrics from '../../src/middleware/metric-calculations'
import * as ghservices from '../../src/services/gh-service'
import * as utils from '../../src/middleware/utils'

describe('calculateBusFactor', () => {
  // Test case 1: Testing a random number values greater than 0
  it('should return 0.605 when crit commits is 10/30 and crit prs is 5/8', () => {
    // mock getBusFactorData
    const getBusFactorDataMock = jest.spyOn(ghservices, 'getBusFactorData')
    getBusFactorDataMock.mockReturnValue({
      criticalContrubitorCommits: 10,
      totalCommits: 30,
      criticalContributorPullRequests: 5,
      totalPullRequests: 8,
    })

    // mock round
    const roundMock = jest.spyOn(utils, 'round')
    roundMock.mockReturnValue(0.605)

    // Call calculateBusFactor
    const testUrl = 'https://github.com/ayushuk/ece461-project'
    const result = metrics.calculateBusFactor(testUrl)

    // Assertions
    expect(getBusFactorDataMock).toHaveBeenCalledWith(testUrl)
    expect(roundMock).toHaveBeenCalledWith(0.605_263_157_894_736_8, 3)

    // Expect result to be 0.605 based on the formula
    expect(result).toBe(0.605)
  })

  // Test case 2: Testing when only one contrinbuter commits
  it('should return 0 when crit commits is 30/30 and crit prs is 8/8', () => {
    const getBusFactorDataMock = jest.spyOn(ghservices, 'getBusFactorData')
    getBusFactorDataMock.mockReturnValue({
      criticalContrubitorCommits: 30,
      totalCommits: 30,
      criticalContributorPullRequests: 8,
      totalPullRequests: 8,
    })

    // mock round
    const roundMock = jest.spyOn(utils, 'round')
    roundMock.mockReturnValue(0)

    // Call calculateBusFactor
    const testUrl = 'https://github.com/ayushuk/ece461-project'
    const result = metrics.calculateBusFactor(testUrl)

    // Assertions
    expect(getBusFactorDataMock).toHaveBeenCalledWith(testUrl)
    expect(roundMock).toHaveBeenCalledWith(0, 3)

    // Expect result to be 0.605 based on the formula
    expect(result).toBe(0)
  })

  // Test case 3: Testing when only crit has no PRs
  it('should return 0.737 when crit commits is 10/30 and crit prs is 0/8', () => {
    const getBusFactorDataMock = jest.spyOn(ghservices, 'getBusFactorData')
    getBusFactorDataMock.mockReturnValue({
      criticalContrubitorCommits: 10,
      totalCommits: 30,
      criticalContributorPullRequests: 0,
      totalPullRequests: 8,
    })

    // mock round
    const roundMock = jest.spyOn(utils, 'round')
    roundMock.mockReturnValue(0.737)

    // Call calculateBusFactor
    const testUrl = 'https://github.com/ayushuk/ece461-project'
    const result = metrics.calculateBusFactor(testUrl)

    // Assertions
    expect(getBusFactorDataMock).toHaveBeenCalledWith(testUrl)
    expect(roundMock).toHaveBeenCalledWith(0.736_842_105_263_158, 3)

    // Expect result to be 0.605 based on the formula
    expect(result).toBe(0.737)
  })
})

describe('calculateCorrectness', () => {
  // Test case 1: Testing a random number values greater than 0
  it('should return 0.5 when closed issues is 10 and open issues is 10', () => {
    // mock getCorrectnessData
    const getCorrectnessDataMock = jest.spyOn(ghservices, 'getCorrectnessData')
    getCorrectnessDataMock.mockReturnValue({
      closedIssues: 10,
      openIssues: 10,
    })

    // mock round
    const roundMock = jest.spyOn(utils, 'round')
    roundMock.mockReturnValue(0.5)

    // Call calculateCorrectness
    const testUrl = 'https://github.com/ayushuk/ece461-project'
    const result = metrics.calculateCorrectness(testUrl)

    // Assertions
    expect(getCorrectnessDataMock).toHaveBeenCalledWith(testUrl)
    expect(roundMock).toHaveBeenCalledWith(0.5, 3)

    // Expect result to be 0.5 based on the formula
    expect(result).toBe(0.5)
  })

  // Test case 2: Testing when only closed issues
  it('should return 1 when closed issues is 10 and open issues is 0', () => {
    // mock getBusFactorData
    const getCorrectnessDataMock = jest.spyOn(ghservices, 'getCorrectnessData')
    getCorrectnessDataMock.mockReturnValue({
      closedIssues: 10,
      openIssues: 0,
    })

    // mock round
    const roundMock = jest.spyOn(utils, 'round')
    roundMock.mockReturnValue(1)

    // Call calculateCorrectness
    const testUrl = 'https://github.com/ayushuk/ece461-project'
    const result = metrics.calculateCorrectness(testUrl)

    // Assertions
    expect(getCorrectnessDataMock).toHaveBeenCalledWith(testUrl)
    expect(roundMock).toHaveBeenCalledWith(1, 3)

    // Expect result to be 1 based on the formula
    expect(result).toBe(1)
  })

  // Test case 3: Testing when only open issues
  it('should return 0 when closed issues is 0 and open issues is 10', () => {
    // mock getBusFactorData
    const getCorrectnessDataMock = jest.spyOn(ghservices, 'getCorrectnessData')
    getCorrectnessDataMock.mockReturnValue({
      closedIssues: 0,
      openIssues: 10,
    })

    // mock round
    const roundMock = jest.spyOn(utils, 'round')
    roundMock.mockReturnValue(0)

    // Call calculateCorrectness
    const testUrl = 'https://github.com/ayushuk/ece461-project'
    const result = metrics.calculateCorrectness(testUrl)

    // Assertions
    expect(getCorrectnessDataMock).toHaveBeenCalledWith(testUrl)
    expect(roundMock).toHaveBeenCalledWith(0, 3)

    // Expect result to be 0 based on the formula
    expect(result).toBe(0)
  })
})

// describe('calculateRampUpTime', () => {})

describe('calculateResponsiveness', () => {
  // Test case 1: when monthly commit count is 10 and annual commit count is 10
  it('should return 1 when the number of monthly commits equals the annual commits ', () => {
    // mock getResponsivenessData
    const getResponsivenessDataMock = jest.spyOn(
      ghservices,
      'getResponsivenessData',
    )
    getResponsivenessDataMock.mockReturnValue({
      monthlyCommitCount: 10,
      annualCommitCount: 10,
    })

    // mock round
    const roundMock = jest.spyOn(utils, 'round')
    roundMock.mockReturnValue(1)

    // Call calculateResponsiveness
    const testUrl = 'https://github.com/ayushuk/ece461-project'
    const result = metrics.calculateResponsiveness(testUrl)

    // Assertions
    expect(getResponsivenessDataMock).toHaveBeenCalledWith(testUrl)
    expect(roundMock).toHaveBeenCalledWith(1, 3)

    // Expect result to be 0.5 based on the formula
    expect(result).toBe(1)
  })

  it('should return 0 when the number of annual commits is 0', () => {
    // mock getResponsivenessData
    const getResponsivenessDataMock = jest.spyOn(
      ghservices,
      'getResponsivenessData',
    )
    getResponsivenessDataMock.mockReturnValue({
      monthlyCommitCount: 0,
      annualCommitCount: 0,
    })

    // mock round
    const roundMock = jest.spyOn(utils, 'round')
    roundMock.mockReturnValue(0)

    // Call calculateResponsiveness
    const testUrl = 'https://github.com/ayushuk/ece461-project'
    const result = metrics.calculateResponsiveness(testUrl)

    // Assertions
    expect(getResponsivenessDataMock).toHaveBeenCalledWith(testUrl)

    // Expect result to be 0.5 based on the formula
    expect(result).toBe(0)
  })

  it('should return 0.5 when monthly commit count is 5 and annual is 10', () => {
    // mock getResponsivenessData
    const getResponsivenessDataMock = jest.spyOn(
      ghservices,
      'getResponsivenessData',
    )
    getResponsivenessDataMock.mockReturnValue({
      monthlyCommitCount: 10,
      annualCommitCount: 100,
    })

    // mock round
    const roundMock = jest.spyOn(utils, 'round')
    roundMock.mockReturnValue(0.1)

    // Call calculateResponsiveness
    const testUrl = 'https://github.com/ayushuk/ece461-project'
    const result = metrics.calculateResponsiveness(testUrl)

    // Assertions
    expect(getResponsivenessDataMock).toHaveBeenCalledWith(testUrl)

    // Expect result to be 0.5 based on the formula
    expect(result).toBe(0.1)
    expect(roundMock).toHaveBeenCalledWith(0.1, 3)
  })
})

describe('calculateLicenseCompliance', () => {
  it('should return a 0 when a license is not found', () => {
    // mock getLicenseComplianceData
    const mockLicenseComplianceData = 0
    const mockGetLicenseComplianceData = jest.spyOn(
      ghservices,
      'getLiscenseComplianceData',
    )
    mockGetLicenseComplianceData.mockReturnValue(mockLicenseComplianceData)

    // Call calculatelicense
    const testUrl = 'https://github.com/ayushuk/ece461-project'
    const result = metrics.calculateLicenseCompliance(testUrl)

    // Assertions
    expect(ghservices.getLiscenseComplianceData).toHaveBeenCalledWith(testUrl)

    // Expect result to be 0 when a license is not found
    expect(result).toBe(0)
  })

  it('should return a 1 when a license is found', () => {
    // mock getLicenseComplianceData
    const mockLicenseComplianceData = 1
    const mockGetLicenseComplianceData = jest.spyOn(
      ghservices,
      'getLiscenseComplianceData',
    )
    mockGetLicenseComplianceData.mockReturnValue(mockLicenseComplianceData)

    // Call calculatelicense
    const testUrl = 'https://github.com/ayushuk/ece461-project'
    const result = metrics.calculateLicenseCompliance(testUrl)

    // Assertions
    expect(ghservices.getLiscenseComplianceData).toHaveBeenCalledWith(testUrl)

    // Expect result to be 0 when a license is not found
    expect(result).toBe(1)
  })
})

describe('calculateNetScore', () => {
  it('should return a 0 when repo does not have a valid license', () => {
    // mock calculateBusFactor
    const mockBusFactorScore = 0.5
    const mockCalculateBusFactor = jest.spyOn(metrics, 'calculateBusFactor')
    mockCalculateBusFactor.mockReturnValue(mockBusFactorScore)

    // mock calculateCorrectness
    const mockCorrectnessScore = 0.5
    const mockCalculateCorrectness = jest.spyOn(metrics, 'calculateCorrectness')
    mockCalculateCorrectness.mockReturnValue(mockCorrectnessScore)

    // mock calculateRampUpTime
    const mockRampUpScore = 0.5
    const mockCalculateRampUp = jest.spyOn(metrics, 'calculateRampUpTime')
    mockCalculateRampUp.mockReturnValue(mockRampUpScore)

    // mock calculateResponsiveness
    const mockResponsivenessScore = 0.5
    const mockCalculateResponsiveness = jest.spyOn(
      metrics,
      'calculateResponsiveness',
    )
    mockCalculateResponsiveness.mockReturnValue(mockResponsivenessScore)

    // mock calculateLicenseCompliance
    const mockLicenseScore = 0
    const mockCalculateLicenseCompliance = jest.spyOn(
      metrics,
      'calculateLicenseCompliance',
    )
    mockCalculateLicenseCompliance.mockReturnValue(mockLicenseScore)

    // Call calculateNetScore
    const testUrl = 'https://github.com/ayushuk/ece461-project'
    const result = metrics.calculateNetScore(testUrl)

    // Assertions
    expect(metrics.calculateBusFactor).toHaveBeenCalledWith(testUrl)
    expect(metrics.calculateCorrectness).toHaveBeenCalledWith(testUrl)
    expect(metrics.calculateRampUpTime).toHaveBeenCalledWith(testUrl)
    expect(metrics.calculateResponsiveness).toHaveBeenCalledWith(testUrl)
    expect(metrics.calculateLicenseCompliance).toHaveBeenCalledWith(testUrl)

    // Expect result to be 0 when a license is not found
    expect(result).toBe(0)
  })

  it('should return a 0 when repo does not have a valid license', () => {
    //mock calculateBusFactor
    const mockBusFactorScore = 0.5
    const mockCalculateBusFactor = jest.spyOn(metrics, 'calculateBusFactor')
    mockCalculateBusFactor.mockReturnValue(mockBusFactorScore)

    //mock calculateCorrectness
    const mockCorrectnessScore = 0.5
    const mockCalculateCorrectness = jest.spyOn(metrics, 'calculateCorrectness')
    mockCalculateCorrectness.mockReturnValue(mockCorrectnessScore)

    //mock calculateRampUpTime
    const mockRampUpScore = 0.5
    const mockCalculateRampUp = jest.spyOn(metrics, 'calculateRampUpTime')
    mockCalculateRampUp.mockReturnValue(mockRampUpScore)

    //mock calculateResponsiveness
    const mockResponsivenessScore = 0.5
    const mockCalculateResponsiveness = jest.spyOn(
      metrics,
      'calculateResponsiveness',
    )
    mockCalculateResponsiveness.mockReturnValue(mockResponsivenessScore)

    //mock calculateLicenseCompliance
    const mockLicenseScore = 1
    const mockCalculateLicenseCompliance = jest.spyOn(
      metrics,
      'calculateLicenseCompliance',
    )
    mockCalculateLicenseCompliance.mockReturnValue(mockLicenseScore)

    // Call calculateNetScore
    const testUrl = 'https://github.com/ayushuk/ece461-project'
    const result = metrics.calculateNetScore(testUrl)

    // Assertions
    expect(metrics.calculateBusFactor).toHaveBeenCalledWith(testUrl)
    expect(metrics.calculateCorrectness).toHaveBeenCalledWith(testUrl)
    expect(metrics.calculateRampUpTime).toHaveBeenCalledWith(testUrl)
    expect(metrics.calculateResponsiveness).toHaveBeenCalledWith(testUrl)
    expect(metrics.calculateLicenseCompliance).toHaveBeenCalledWith(testUrl)

    // Expect result to be 0 when a license is not found
    expect(result).toBe(0.5)
  })
})
