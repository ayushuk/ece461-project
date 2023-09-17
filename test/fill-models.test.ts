// import {expect, test} from '@oclif/test'
import {expect, test} from '@jest/globals';
import { 
  assignMetrics,
  calculateBusFactor,
  calculateCorrectness,
  calculateRampUpTime,
  calculateResponsiveness,
  calculateLicenseCompliance,
  calculateNetScore, 
} from '../../src/fill-models';

const mockBusFactor = jest.fn<() => number>() as jest.Mock<number>;

jest.mock('../../src/fill-models', () => ({
  calculateBusFactor: jest.fn((value: string)),
  calculateCorrectness: jest.fn(),
  calculateRampUpTime: jest.fn(),
  calculateResponsiveness: jest.fn(),
  calculateLicenseCompliance: jest.fn(),
  calculateNetScore: jest.fn()
}))

describe('fill-models', () => {
  test
    calculateBusFactor.mockReturnValue(0.5);
    calculateCorrectness.mockReturnValue(0.5);
    calculateRampUpTime.mockReturnValue(0.5);
    calculateResponsiveness.mockReturnValue(0.5);
    calculateLicenseCompliance.mockReturnValue(0.5);
    calculateNetScore.mockReturnValue(0.5);
    

    const result = assignMetrics('https://github.com/XavierJCallait/test');

    // .it('runs hello cmd', (ctx) => {
    //   expect(ctx.stdout).toContain(JSON.stringify(assignMetrics('https://github.com/XavierJCallait/test')))
    // })
})
