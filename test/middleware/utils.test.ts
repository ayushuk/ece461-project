// import {parse} from 'path'
// import * as utils from '../../src/middleware/utils'
import {round, parseGHRepoName} from '../../src/middleware/utils'

describe('round', () => {
  // Test case 1: Round down 2 decimal places
  it('should return 768.98 given 768.983', () => {
    expect(round(768.983, 2)).toBe(768.98)
  })

  // Test case 2: Round up 7 decimal places
  it('should return 768.98 given 768.983', () => {
    expect(round(768.983_987_254, 7)).toBe(768.983_987_3)
  })

  // Test case 2: Round negative number
  it('should return 768.98 given 768.983', () => {
    expect(round(-5.129, 2)).toBe(-5.13)
  })
})

describe('parseGHRepoName', () => {
  // Test case 1: Test valid github URL with https://
  it('should return "test-repo" given https://github.com/test/test-repo', () => {
    expect(parseGHRepoName('https://github.com/ayushuk/ece461-project')).toBe(
      'ece461-project',
    )
  })
})
