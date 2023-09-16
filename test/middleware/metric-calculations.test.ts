import {
  calculateBusFactor,
  calculateCorrectness,
  calculateRampUpTime,
  calculateResponsiveness,
  calculateLicenseCompliance,
} from '../../src/middleware/metric-calculations'
import {
  BusFactorData,
  CorrectnessData,
  ResponsesivenessData,
} from '../../src/models/middleware-inputs'

describe('calculateBusFactor', () => {
  // Test case 1: Testing a random number values greater than 0
  test('should return 0.605 when crit commits is 10/30 and crit prs is 5/8', () => {
    const data: BusFactorData = {
      criticalContrubitorCommits: 10,
      totalCommits: 30,
      criticalContributorPullRequests: 5,
      totalPullRequests: 8,
    }
    const result = calculateBusFactor(data)

    // Expect result to be 0.605 based on the formula
    expect(result).toBe(0.605)
  })

  // Test case 2: Testing when only one contrinbuter commits
  test('should return 0 when crit commits is 30/30 and crit prs is 8/8', () => {
    const data: BusFactorData = {
      criticalContrubitorCommits: 30,
      totalCommits: 30,
      criticalContributorPullRequests: 8,
      totalPullRequests: 8,
    }
    const result = calculateBusFactor(data)

    // Expect result to be 0 based on the formula
    expect(result).toBe(0)
  })

  // Test case 3: Testing when only crit has no PRs
  test('should return 0.737 when crit commits is 10/30 and crit prs is 0/8', () => {
    const data: BusFactorData = {
      criticalContrubitorCommits: 10,
      totalCommits: 30,
      criticalContributorPullRequests: 0,
      totalPullRequests: 8,
    }
    const result = calculateBusFactor(data)

    // Expect result to be 0.737 based on the formula
    expect(result).toBe(0.737)
  })
})

describe('calculateCorrectness', () => {
  // Test case 1: Testing a random number values greater than 0
  test('should return 0.5 when closed issues is 10 and open issues is 10', () => {
    const data: CorrectnessData = {
      closedIssues: 10,
      openIssues: 10,
    }
    const result = calculateCorrectness(data)

    // Expect result to be 0.5 based on the formula
    expect(result).toBe(0.5)
  })

  // Test case 2: Testing when only closed issues
  test('should return 1 when closed issues is 10 and open issues is 0', () => {
    const data: CorrectnessData = {
      closedIssues: 10,
      openIssues: 0,
    }
    const result = calculateCorrectness(data)

    // Expect result to be 1 based on the formula
    expect(result).toBe(1)
  })

  // Test case 3: Testing when only open issues
  test('should return 0 when closed issues is 0 and open issues is 10', () => {
    const data: CorrectnessData = {
      closedIssues: 0,
      openIssues: 10,
    }
    const result = calculateCorrectness(data)

    // Expect result to be 0 based on the formula
    expect(result).toBe(0)
  })
})

// describe('calculateRampUpTime', () => {})

// describe('calculateResponsiveness', () => {})

// describe('calculateLicenseCompliance', () => {})
