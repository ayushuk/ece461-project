import {round} from '../../src/middleware/utils'

describe('round', () => {
  // Test case 1: Round down 2 decimal places
  test('should return 768.98 given 768.983', () => {
    expect(round(768.983, 2)).toBe(768.98)
  })

  // Test case 2: Round up 7 decimal places
  test('should return 768.98 given 768.983', () => {
    expect(round(768.983987254, 7)).toBe(768.9839873)
  })

  // Test case 2: Round negative number
  test('should return 768.98 given 768.983', () => {
    expect(round(-5.129, 2)).toBe(-5.13)
  })
})
