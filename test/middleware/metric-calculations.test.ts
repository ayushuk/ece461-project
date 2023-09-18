import {
  calculateBusFactor,
  calculateCorrectness,
  calculateResponsiveness,
} from '../../src/middleware/metric-calculations'
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
    const result = calculateBusFactor(testUrl)

    // Assertions
    expect(getBusFactorDataMock).toHaveBeenCalledWith(testUrl)
    expect(roundMock).toHaveBeenCalledWith(0.605_263_157_894_736_8, 3)

    // Expect result to be 0.605 based on the formula
    expect(result).toBe(0.605)

    // restore original functions
    getBusFactorDataMock.mockRestore()
    roundMock.mockRestore()
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
    const result = calculateBusFactor(testUrl)

    // Assertions
    expect(getBusFactorDataMock).toHaveBeenCalledWith(testUrl)
    expect(roundMock).toHaveBeenCalledWith(0, 3)

    // Expect result to be 0.605 based on the formula
    expect(result).toBe(0)

    // restore original functions
    getBusFactorDataMock.mockRestore()
    roundMock.mockRestore()
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
    const result = calculateBusFactor(testUrl)

    // Assertions
    expect(getBusFactorDataMock).toHaveBeenCalledWith(testUrl)
    expect(roundMock).toHaveBeenCalledWith(0.736_842_105_263_158, 3)

    // Expect result to be 0.605 based on the formula
    expect(result).toBe(0.737)

    // restore original functions
    getBusFactorDataMock.mockRestore()
    roundMock.mockRestore()
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
    const result = calculateCorrectness(testUrl)

    // Assertions
    expect(getCorrectnessDataMock).toHaveBeenCalledWith(testUrl)
    expect(roundMock).toHaveBeenCalledWith(0.5, 3)

    // Expect result to be 0.5 based on the formula
    expect(result).toBe(0.5)

    // restore original functions
    getCorrectnessDataMock.mockRestore()
    roundMock.mockRestore()
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
    const result = calculateCorrectness(testUrl)

    // Assertions
    expect(getCorrectnessDataMock).toHaveBeenCalledWith(testUrl)
    expect(roundMock).toHaveBeenCalledWith(1, 3)

    // Expect result to be 1 based on the formula
    expect(result).toBe(1)

    // restore original functions
    getCorrectnessDataMock.mockRestore()
    roundMock.mockRestore()
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
    const result = calculateCorrectness(testUrl)

    // Assertions
    expect(getCorrectnessDataMock).toHaveBeenCalledWith(testUrl)
    expect(roundMock).toHaveBeenCalledWith(0, 3)

    // Expect result to be 0 based on the formula
    expect(result).toBe(0)

    // restore original functions
    getCorrectnessDataMock.mockRestore()
    roundMock.mockRestore()
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

    // Call calculateCorrectness
    const testUrl = 'https://github.com/ayushuk/ece461-project'
    const result = calculateResponsiveness(testUrl)

    // Assertions
    expect(getResponsivenessDataMock).toHaveBeenCalledWith(testUrl)
    expect(roundMock).toHaveBeenCalledWith(1, 3)

    // Expect result to be 0.5 based on the formula
    expect(result).toBe(1)

    // restore original functions
    getResponsivenessDataMock.mockRestore()
    roundMock.mockRestore()
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

    // Call calculateCorrectness
    const testUrl = 'https://github.com/ayushuk/ece461-project'
    const result = calculateResponsiveness(testUrl)

    // Assertions
    expect(getResponsivenessDataMock).toHaveBeenCalledWith(testUrl)

    // Expect result to be 0.5 based on the formula
    expect(result).toBe(0)

    // restore original functions
    getResponsivenessDataMock.mockRestore()
    roundMock.mockRestore()
  })

  it('should return 0.5 when monthly commit count is 5 and annual is 10', () => {
    // mock getResponsivenessData
    const getResponsivenessDataMock = jest.spyOn(
      ghservices,
      'getResponsivenessData',
    )
    getResponsivenessDataMock.mockReturnValue({
      monthlyCommitCount: 5,
      annualCommitCount: 10,
    })

    // mock round
    const roundMock = jest.spyOn(utils, 'round')
    roundMock.mockReturnValue(0.5)

    // Call calculateCorrectness
    const testUrl = 'https://github.com/ayushuk/ece461-project'
    const result = calculateResponsiveness(testUrl)

    // Assertions
    expect(getResponsivenessDataMock).toHaveBeenCalledWith(testUrl)

    // Expect result to be 0.5 based on the formula
    expect(result).toBe(0.5)
    expect(roundMock).toHaveBeenCalledWith(0.5, 3)

    // restore original functions
    getResponsivenessDataMock.mockRestore()
    roundMock.mockRestore()
  })

  // is this a possible test case?
  // it('should return 0 when monthly commits is 0', () => {
  //   // mock getResponsivenessData
  //   const getResponsivenessDataMock = jest.spyOn(
  //     ghservices,
  //     'getResponsivenessData',
  //   )
  //   getResponsivenessDataMock.mockReturnValue({
  //     monthlyCommitCount: 5,
  //     annualCommitCount: 10,
  //   })

  //   // mock round
  //   const roundMock = jest.spyOn(utils, 'round')
  //   roundMock.mockReturnValue(0.5)

  //   // Call calculateCorrectness
  //   const testUrl = 'https://github.com/ayushuk/ece461-project'
  //   const result = calculateResponsiveness(testUrl)

  //   // Assertions
  //   expect(getResponsivenessDataMock).toHaveBeenCalledWith(testUrl)

  //   // Expect result to be 0.5 based on the formula
  //   expect(result).toBe(0.5)
  //   expect(roundMock).toHaveBeenCalledWith(0.5, 3)

  //   //restore original functions
  //   getResponsivenessDataMock.mockRestore()
  //   roundMock.mockRestore()
  // })
})

// describe('calculateLicenseCompliance', () => {})
