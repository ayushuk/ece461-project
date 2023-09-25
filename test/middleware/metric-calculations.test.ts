import * as metrics from '../../src/middleware/metric-calculations'
import * as ghservices from '../../src/services/gh-service'
import * as utils from '../../src/middleware/utils'

describe('calculateBusFactor', () => {
  // Test case 1: Testing a random number values greater than 0
  it('should return 0.605 when crit commits is 10/30 and crit prs is 5/8', async () => {
    // mock getBusFactorData
    const getBusFactorDataMock = jest.spyOn(ghservices, 'getBusFactorData')
    getBusFactorDataMock.mockReturnValue(
      Promise.resolve({
        criticalContrubitorCommits: 10,
        totalCommits: 30,
        criticalContributorPullRequests: 5,
        totalPullRequests: 8,
      }),
    )

    // mock round
    const roundMock = jest.spyOn(utils, 'round')
    roundMock.mockReturnValue(0.605)

    // Call calculateBusFactor
    const testUrl = 'https://github.com/ayushuk/ece461-project'
    const result = await metrics.calculateBusFactor(testUrl)

    // Assertions
    expect(getBusFactorDataMock).toHaveBeenCalledWith(testUrl)
    expect(roundMock).toHaveBeenCalledWith(0.583_333_333_333_333_4, 3)

    // Expect result to be 0.605 based on the formula
    expect(result).toBe(0.605)
  })

  // Test case 2: Testing when only one contrinbuter commits
  it('should return 0 when crit commits is 30/30 and crit prs is 8/8', async () => {
    const getBusFactorDataMock = jest.spyOn(ghservices, 'getBusFactorData')
    getBusFactorDataMock.mockReturnValue(
      Promise.resolve({
        criticalContrubitorCommits: 30,
        totalCommits: 30,
        criticalContributorPullRequests: 8,
        totalPullRequests: 8,
      }),
    )

    // mock round
    const roundMock = jest.spyOn(utils, 'round')
    roundMock.mockReturnValue(0)

    // Call calculateBusFactor
    const testUrl = 'https://github.com/ayushuk/ece461-project'
    const result = await metrics.calculateBusFactor(testUrl)

    // Assertions
    expect(getBusFactorDataMock).toHaveBeenCalledWith(testUrl)
    expect(roundMock).toHaveBeenCalledWith(0, 3)

    // Expect result to be 0.605 based on the formula
    expect(result).toBe(0)
  })

  // Test case 3: Testing when only crit has no PRs
  it('should return 0.737 when crit commits is 10/30 and crit prs is 0/8', async () => {
    const getBusFactorDataMock = jest.spyOn(ghservices, 'getBusFactorData')
    getBusFactorDataMock.mockReturnValue(
      Promise.resolve({
        criticalContrubitorCommits: 10,
        totalCommits: 30,
        criticalContributorPullRequests: 0,
        totalPullRequests: 8,
      }),
    )

    // mock round
    const roundMock = jest.spyOn(utils, 'round')
    roundMock.mockReturnValue(0.737)

    // Call calculateBusFactor
    const testUrl = 'https://github.com/ayushuk/ece461-project'
    const result = await metrics.calculateBusFactor(testUrl)

    // Assertions
    expect(getBusFactorDataMock).toHaveBeenCalledWith(testUrl)
    expect(roundMock).toHaveBeenCalledWith(0.761_904_761_904_761_9, 3)

    // Expect result to be 0.605 based on the formula
    expect(result).toBe(0.737)
  })
})

describe('calculateCorrectness', () => {
  // Test case 1: Testing a random number values greater than 0
  it('should return 0.5 when closed issues is 10 and open issues is 10', async () => {
    // mock getCorrectnessData
    const getCorrectnessDataMock = jest.spyOn(ghservices, 'getCorrectnessData')
    getCorrectnessDataMock.mockReturnValue(
      Promise.resolve({
        closedIssues: 10,
        openIssues: 10,
      }),
    )

    // mock round
    const roundMock = jest.spyOn(utils, 'round')
    roundMock.mockReturnValue(0.5)

    // Call calculateCorrectness
    const testUrl = 'https://github.com/ayushuk/ece461-project'
    const result = await metrics.calculateCorrectness(testUrl)

    // Assertions
    expect(getCorrectnessDataMock).toHaveBeenCalledWith(testUrl)
    expect(roundMock).toHaveBeenCalledWith(0.5, 3)

    // Expect result to be 0.5 based on the formula
    expect(result).toBe(0.5)
  })

  // Test case 2: Testing when only closed issues
  it('should return 1 when closed issues is 10 and open issues is 0', async () => {
    // mock getBusFactorData
    const getCorrectnessDataMock = jest.spyOn(ghservices, 'getCorrectnessData')
    getCorrectnessDataMock.mockReturnValue(
      Promise.resolve({
        closedIssues: 10,
        openIssues: 0,
      }),
    )

    // mock round
    const roundMock = jest.spyOn(utils, 'round')
    roundMock.mockReturnValue(1)

    // Call calculateCorrectness
    const testUrl = 'https://github.com/ayushuk/ece461-project'
    const result = await metrics.calculateCorrectness(testUrl)

    // Assertions
    expect(getCorrectnessDataMock).toHaveBeenCalledWith(testUrl)
    expect(roundMock).toHaveBeenCalledWith(1, 3)

    // Expect result to be 1 based on the formula
    expect(result).toBe(1)
  })

  // Test case 3: Testing when only open issues
  it('should return 0 when closed issues is 0 and open issues is 10', async () => {
    // mock getBusFactorData
    const getCorrectnessDataMock = jest.spyOn(ghservices, 'getCorrectnessData')
    getCorrectnessDataMock.mockReturnValue(
      Promise.resolve({
        closedIssues: 0,
        openIssues: 10,
      }),
    )

    // mock round
    const roundMock = jest.spyOn(utils, 'round')
    roundMock.mockReturnValue(0)

    // Call calculateCorrectness
    const testUrl = 'https://github.com/ayushuk/ece461-project'
    const result = await metrics.calculateCorrectness(testUrl)

    // Assertions
    expect(getCorrectnessDataMock).toHaveBeenCalledWith(testUrl)
    expect(roundMock).toHaveBeenCalledWith(0, 3)

    // Expect result to be 0 based on the formula
    expect(result).toBe(0)
  })

  it('should return 0 when closed issues is 0 and open issues is 0', async () => {
    // mock getBusFactorData
    const getCorrectnessDataMock = jest.spyOn(ghservices, 'getCorrectnessData')
    getCorrectnessDataMock.mockReturnValue(
      Promise.resolve({
        closedIssues: 0,
        openIssues: 0,
      }),
    )

    // Call calculateCorrectness
    const testUrl = 'https://github.com/ayushuk/ece461-project'
    const result = await metrics.calculateCorrectness(testUrl)

    // Assertions
    expect(getCorrectnessDataMock).toHaveBeenCalledWith(testUrl)

    // Expect result to be 0 based on the formula
    expect(result).toBe(0)
  })
})

// describe('RampUpTime', () => {
//   it('should return 1 when the number of lines of code is 0', async () => {
//     // mock calcRepoLines
//     const calcRepoLinesMock = jest.spyOn(utils, 'calcRepoLines')
//     calcRepoLinesMock.mockReturnValue(Promise.resolve(0))

//     // mock.cloneRepo()
//     const cloneRepoMock = jest.spyOn(utils, 'cloneRepo')
//     cloneRepoMock.mockImplementation(async () => {})

//     const testUrl = 'https://github.com/ayushuk/ece461-project'
//     const result = await metrics.calculateRampUpTime(testUrl)

//     expect(calcRepoLinesMock).toHaveBeenCalledWith(testUrl)
//     expect(result).toBe(1)
//   })

//   it('should return 0.9 when the number of lines of code is 999', async () => {
//     // mock calcRepoLines
//     const calcRepoLinesMock = jest.spyOn(utils, 'calcRepoLines')
//     calcRepoLinesMock.mockReturnValue(Promise.resolve(999))

//     // mock.cloneRepo()
//     const cloneRepoMock = jest.spyOn(utils, 'cloneRepo')
//     cloneRepoMock.mockImplementation(async () => {})

//     const testUrl = 'https://github.com/ayushuk/ece461-project'
//     const result = await metrics.calculateRampUpTime(testUrl)

//     expect(calcRepoLinesMock).toHaveBeenCalledWith(testUrl)
//     expect(result).toBe(0.9)
//   })

//   it('should return 0.8 when the number of lines of code is 4999', async () => {
//     // mock calcRepoLines
//     const calcRepoLinesMock = jest.spyOn(utils, 'calcRepoLines')
//     calcRepoLinesMock.mockReturnValue(Promise.resolve(4999))

//     // mock.cloneRepo()
//     const cloneRepoMock = jest.spyOn(utils, 'cloneRepo')
//     cloneRepoMock.mockImplementation(async () => {})

//     const testUrl = 'https://github.com/ayushuk/ece461-project'
//     const result = await metrics.calculateRampUpTime(testUrl)

//     expect(calcRepoLinesMock).toHaveBeenCalledWith(testUrl)
//     expect(result).toBe(0.8)
//   })

//   it('should return 0.7 when the number of lines of code is 9000', async () => {
//     // mock calcRepoLines
//     const calcRepoLinesMock = jest.spyOn(utils, 'calcRepoLines')
//     calcRepoLinesMock.mockReturnValue(Promise.resolve(9000))

//     // mock.cloneRepo()
//     const cloneRepoMock = jest.spyOn(utils, 'cloneRepo')
//     cloneRepoMock.mockImplementation(async () => {})

//     const testUrl = 'https://github.com/ayushuk/ece461-project'
//     const result = await metrics.calculateRampUpTime(testUrl)

//     expect(calcRepoLinesMock).toHaveBeenCalledWith(testUrl)
//     expect(result).toBe(0.7)
//   })

//   it('should return 0.6 when the number of lines of code is 49000', async () => {
//     // mock calcRepoLines
//     const calcRepoLinesMock = jest.spyOn(utils, 'calcRepoLines')
//     calcRepoLinesMock.mockReturnValue(Promise.resolve(49_000))

//     // mock.cloneRepo()
//     const cloneRepoMock = jest.spyOn(utils, 'cloneRepo')
//     cloneRepoMock.mockImplementation(async () => {})

//     const testUrl = 'https://github.com/ayushuk/ece461-project'
//     const result = await metrics.calculateRampUpTime(testUrl)

//     expect(calcRepoLinesMock).toHaveBeenCalledWith(testUrl)
//     expect(result).toBe(0.6)
//   })

//   it('should return 0.5 when the number of lines of code is 78000', async () => {
//     // mock calcRepoLines
//     const calcRepoLinesMock = jest.spyOn(utils, 'calcRepoLines')
//     calcRepoLinesMock.mockReturnValue(Promise.resolve(78_000))

//     // mock.cloneRepo()
//     const cloneRepoMock = jest.spyOn(utils, 'cloneRepo')
//     cloneRepoMock.mockImplementation(async () => {})

//     const testUrl = 'https://github.com/ayushuk/ece461-project'
//     const result = await metrics.calculateRampUpTime(testUrl)

//     expect(calcRepoLinesMock).toHaveBeenCalledWith(testUrl)
//     expect(result).toBe(0.5)
//   })

//   it('should return 0.4 when the number of lines of code is 478000', async () => {
//     // mock calcRepoLines
//     const calcRepoLinesMock = jest.spyOn(utils, 'calcRepoLines')
//     calcRepoLinesMock.mockReturnValue(Promise.resolve(478_000))

//     // mock.cloneRepo()
//     const cloneRepoMock = jest.spyOn(utils, 'cloneRepo')
//     cloneRepoMock.mockImplementation(async () => {})

//     const testUrl = 'https://github.com/ayushuk/ece461-project'
//     const result = await metrics.calculateRampUpTime(testUrl)

//     expect(calcRepoLinesMock).toHaveBeenCalledWith(testUrl)
//     expect(result).toBe(0.4)
//   })

//   it('should return 0.3 when the number of lines of code is 800_000', async () => {
//     // mock calcRepoLines
//     const calcRepoLinesMock = jest.spyOn(utils, 'calcRepoLines')
//     calcRepoLinesMock.mockReturnValue(Promise.resolve(800_000))

//     // mock.cloneRepo()
//     const cloneRepoMock = jest.spyOn(utils, 'cloneRepo')
//     cloneRepoMock.mockImplementation(async () => {})

//     const testUrl = 'https://github.com/ayushuk/ece461-project'
//     const result = await metrics.calculateRampUpTime(testUrl)

//     expect(calcRepoLinesMock).toHaveBeenCalledWith(testUrl)
//     expect(result).toBe(0.3)
//   })

//   it('should return 0.2 when the number of lines of code is 3_000_000', async () => {
//     // mock calcRepoLines
//     const calcRepoLinesMock = jest.spyOn(utils, 'calcRepoLines')
//     calcRepoLinesMock.mockReturnValue(Promise.resolve(3_000_000))

//     // mock.cloneRepo()
//     const cloneRepoMock = jest.spyOn(utils, 'cloneRepo')
//     cloneRepoMock.mockImplementation(async () => {})

//     const testUrl = 'https://github.com/ayushuk/ece461-project'
//     const result = await metrics.calculateRampUpTime(testUrl)

//     expect(calcRepoLinesMock).toHaveBeenCalledWith(testUrl)
//     expect(result).toBe(0.2)
//   })

//   it('should return 0 when the number of lines of code is 5000001', async () => {
//     // mock calcRepoLines
//     const calcRepoLinesMock = jest.spyOn(utils, 'calcRepoLines')
//     calcRepoLinesMock.mockReturnValue(Promise.resolve(5_000_001))

//     // mock.cloneRepo()
//     const cloneRepoMock = jest.spyOn(utils, 'cloneRepo')
//     cloneRepoMock.mockImplementation(async () => {})

//     const testUrl = 'https://github.com/ayushuk/ece461-project'
//     const result = await metrics.calculateRampUpTime(testUrl)

//     expect(calcRepoLinesMock).toHaveBeenCalledWith(testUrl)
//     expect(result).toBe(0)
//   })
// })

describe('calculateResponsiveness', () => {
  it('should return 0 when no commits have been made in last year ', async () => {
    // mock getResponsivenessData
    const getResponsivenessDataMock = jest.spyOn(
      ghservices,
      'getResponsivenessData',
    )
    getResponsivenessDataMock.mockReturnValue(
      Promise.resolve({
        monthlyCommitCount: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        annualCommitCount: 0,
      }),
    )

    // Call calculateResponsiveness
    const testUrl = 'https://github.com/ayushuk/ece461-project'
    const result = await metrics.calculateResponsiveness(testUrl)

    // Assertions
    expect(getResponsivenessDataMock).toHaveBeenCalledWith(testUrl)

    // Expect result to be 0.5 based on the formula
    expect(result).toBe(0)
  })

  it('should return 1 when the difference is less than 10% of annual commits ', async () => {
    // mock getResponsivenessData
    const getResponsivenessDataMock = jest.spyOn(
      ghservices,
      'getResponsivenessData',
    )
    getResponsivenessDataMock.mockReturnValue(
      Promise.resolve({
        monthlyCommitCount: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        annualCommitCount: 120,
      }),
    )

    // Call calculateResponsiveness
    const testUrl = 'https://github.com/ayushuk/ece461-project'
    const result = await metrics.calculateResponsiveness(testUrl)

    // Assertions
    expect(getResponsivenessDataMock).toHaveBeenCalledWith(testUrl)

    // Expect result to be 0.5 based on the formula
    expect(result).toBe(1)
  })

  it('should return 0.9 when the difference is less than 20% of annual commits ', async () => {
    // mock getResponsivenessData
    const getResponsivenessDataMock = jest.spyOn(
      ghservices,
      'getResponsivenessData',
    )
    getResponsivenessDataMock.mockReturnValue(
      Promise.resolve({
        monthlyCommitCount: [10, 10, 10, 10, 10, 10, 10, 10, 20, 10, 0, 10],
        annualCommitCount: 120,
      }),
    )

    // Call calculateResponsiveness
    const testUrl = 'https://github.com/ayushuk/ece461-project'
    const result = await metrics.calculateResponsiveness(testUrl)

    // Assertions
    expect(getResponsivenessDataMock).toHaveBeenCalledWith(testUrl)

    // Expect result to be 0.5 based on the formula
    expect(result).toBe(0.9)
  })

  it('should return 0.8 when the difference is less than 30% of annual commits ', async () => {
    // mock getResponsivenessData
    const getResponsivenessDataMock = jest.spyOn(
      ghservices,
      'getResponsivenessData',
    )
    getResponsivenessDataMock.mockReturnValue(
      Promise.resolve({
        monthlyCommitCount: [10, 10, 10, 10, 10, 10, 10, 10, 30, 0, 0, 10],
        annualCommitCount: 120,
      }),
    )

    // Call calculateResponsiveness
    const testUrl = 'https://github.com/ayushuk/ece461-project'
    const result = await metrics.calculateResponsiveness(testUrl)

    // Assertions
    expect(getResponsivenessDataMock).toHaveBeenCalledWith(testUrl)

    // Expect result to be 0.5 based on the formula
    expect(result).toBe(0.8)
  })

  it('should return 0.7 when the difference is less than 40% of annual commits ', async () => {
    // mock getResponsivenessData
    const getResponsivenessDataMock = jest.spyOn(
      ghservices,
      'getResponsivenessData',
    )
    getResponsivenessDataMock.mockReturnValue(
      Promise.resolve({
        monthlyCommitCount: [10, 10, 10, 10, 10, 10, 10, 0, 40, 0, 0, 10],
        annualCommitCount: 120,
      }),
    )

    // Call calculateResponsiveness
    const testUrl = 'https://github.com/ayushuk/ece461-project'
    const result = await metrics.calculateResponsiveness(testUrl)

    // Assertions
    expect(getResponsivenessDataMock).toHaveBeenCalledWith(testUrl)

    // Expect result to be 0.5 based on the formula
    expect(result).toBe(0.7)
  })

  it('should return 0.6 when the difference is less than 50% of annual commits ', async () => {
    // mock getResponsivenessData
    const getResponsivenessDataMock = jest.spyOn(
      ghservices,
      'getResponsivenessData',
    )
    getResponsivenessDataMock.mockReturnValue(
      Promise.resolve({
        monthlyCommitCount: [10, 10, 10, 10, 10, 10, 0, 0, 50, 0, 0, 10],
        annualCommitCount: 120,
      }),
    )

    // Call calculateResponsiveness
    const testUrl = 'https://github.com/ayushuk/ece461-project'
    const result = await metrics.calculateResponsiveness(testUrl)

    // Assertions
    expect(getResponsivenessDataMock).toHaveBeenCalledWith(testUrl)

    // Expect result to be 0.5 based on the formula
    expect(result).toBe(0.6)
  })

  it('should return 0.5 when the difference is less than 60% of annual commits ', async () => {
    // mock getResponsivenessData
    const getResponsivenessDataMock = jest.spyOn(
      ghservices,
      'getResponsivenessData',
    )
    getResponsivenessDataMock.mockReturnValue(
      Promise.resolve({
        monthlyCommitCount: [10, 10, 10, 10, 10, 0, 0, 0, 60, 0, 0, 10],
        annualCommitCount: 120,
      }),
    )

    // Call calculateResponsiveness
    const testUrl = 'https://github.com/ayushuk/ece461-project'
    const result = await metrics.calculateResponsiveness(testUrl)

    // Assertions
    expect(getResponsivenessDataMock).toHaveBeenCalledWith(testUrl)

    // Expect result to be 0.5 based on the formula
    expect(result).toBe(0.5)
  })

  it('should return 0.4 when the difference is less than 70% of annual commits ', async () => {
    // mock getResponsivenessData
    const getResponsivenessDataMock = jest.spyOn(
      ghservices,
      'getResponsivenessData',
    )
    getResponsivenessDataMock.mockReturnValue(
      Promise.resolve({
        monthlyCommitCount: [10, 10, 10, 0, 0, 0, 0, 0, 80, 0, 0, 10],
        annualCommitCount: 120,
      }),
    )

    // Call calculateResponsiveness
    const testUrl = 'https://github.com/ayushuk/ece461-project'
    const result = await metrics.calculateResponsiveness(testUrl)

    // Assertions
    expect(getResponsivenessDataMock).toHaveBeenCalledWith(testUrl)

    // Expect result to be 0.5 based on the formula
    expect(result).toBe(0.4)
  })

  it('should return 0.3 when the difference is less than 80% of annual commits ', async () => {
    // mock getResponsivenessData
    const getResponsivenessDataMock = jest.spyOn(
      ghservices,
      'getResponsivenessData',
    )
    getResponsivenessDataMock.mockReturnValue(
      Promise.resolve({
        monthlyCommitCount: [10, 10, 10, 0, 0, 0, 0, 0, 90, 0, 0, 0],
        annualCommitCount: 120,
      }),
    )

    // Call calculateResponsiveness
    const testUrl = 'https://github.com/ayushuk/ece461-project'
    const result = await metrics.calculateResponsiveness(testUrl)

    // Assertions
    expect(getResponsivenessDataMock).toHaveBeenCalledWith(testUrl)

    // Expect result to be 0.5 based on the formula
    expect(result).toBe(0.3)
  })

  it('should return 0.2 when the difference is less than 90% of annual commits ', async () => {
    // mock getResponsivenessData
    const getResponsivenessDataMock = jest.spyOn(
      ghservices,
      'getResponsivenessData',
    )
    getResponsivenessDataMock.mockReturnValue(
      Promise.resolve({
        monthlyCommitCount: [10, 10, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0],
        annualCommitCount: 120,
      }),
    )

    // Call calculateResponsiveness
    const testUrl = 'https://github.com/ayushuk/ece461-project'
    const result = await metrics.calculateResponsiveness(testUrl)

    // Assertions
    expect(getResponsivenessDataMock).toHaveBeenCalledWith(testUrl)

    // Expect result to be 0.5 based on the formula
    expect(result).toBe(0.2)
  })

  it('should return 0.1 when the difference is less than 100% of annual commits ', async () => {
    // mock getResponsivenessData
    const getResponsivenessDataMock = jest.spyOn(
      ghservices,
      'getResponsivenessData',
    )
    getResponsivenessDataMock.mockReturnValue(
      Promise.resolve({
        monthlyCommitCount: [10, 0, 0, 0, 0, 0, 0, 0, 110, 0, 0, 0],
        annualCommitCount: 120,
      }),
    )

    // Call calculateResponsiveness
    const testUrl = 'https://github.com/ayushuk/ece461-project'
    const result = await metrics.calculateResponsiveness(testUrl)

    // Assertions
    expect(getResponsivenessDataMock).toHaveBeenCalledWith(testUrl)

    // Expect result to be 0.5 based on the formula
    expect(result).toBe(0.1)
  })

  it('should return 0 when the difference is 100% of annual commits ', async () => {
    // mock getResponsivenessData
    const getResponsivenessDataMock = jest.spyOn(
      ghservices,
      'getResponsivenessData',
    )
    getResponsivenessDataMock.mockReturnValue(
      Promise.resolve({
        monthlyCommitCount: [0, 0, 0, 0, 0, 0, 0, 0, 120, 0, 0, 0],
        annualCommitCount: 120,
      }),
    )

    // Call calculateResponsiveness
    const testUrl = 'https://github.com/ayushuk/ece461-project'
    const result = await metrics.calculateResponsiveness(testUrl)

    // Assertions
    expect(getResponsivenessDataMock).toHaveBeenCalledWith(testUrl)

    // Expect result to be 0.5 based on the formula
    expect(result).toBe(0)
  })
})

describe('calculateLicenseCompliance', () => {
  it('should return a 0 when a license is not found', async () => {
    // mock getLicenseComplianceData
    const mockLicenseComplianceData = 0
    const mockGetLicenseComplianceData = jest.spyOn(
      ghservices,
      'getLiscenseComplianceData',
    )
    mockGetLicenseComplianceData.mockReturnValue(
      Promise.resolve(mockLicenseComplianceData),
    )

    // Call calculatelicense
    const testUrl = 'https://github.com/ayushuk/ece461-project'
    const result = await metrics.calculateLicenseCompliance(testUrl)

    // Assertions
    expect(ghservices.getLiscenseComplianceData).toHaveBeenCalledWith(testUrl)

    // Expect result to be 0 when a license is not found
    expect(result).toBe(0)
  })

  it('should return a 1 when a license is found', async () => {
    // mock getLicenseComplianceData
    const mockLicenseComplianceData = 1
    const mockGetLicenseComplianceData = jest.spyOn(
      ghservices,
      'getLiscenseComplianceData',
    )
    mockGetLicenseComplianceData.mockReturnValue(
      Promise.resolve(mockLicenseComplianceData),
    )

    // Call calculatelicense
    const testUrl = 'https://github.com/ayushuk/ece461-project'
    const result = await metrics.calculateLicenseCompliance(testUrl)

    // Assertions
    expect(ghservices.getLiscenseComplianceData).toHaveBeenCalledWith(testUrl)

    // Expect result to be 0 when a license is not found
    expect(result).toBe(1)
  })
})
