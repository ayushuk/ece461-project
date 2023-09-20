// import {parse} from 'path'
// import * as utils from '../../src/middleware/utils'
import {round, identifyLink} from '../../src/middleware/utils'

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

describe('identifyLink', () => {
  // test case 1: valid gh link
  it('Should return github when given a valid github link', () => {
    const testUrl = 'https://github.com/ayushuk/ece461-project'

    expect(identifyLink(testUrl)).toBe('github')
  })

  // test case 2: valid npm link
  it('Should return npm when given a valid npm link', () => {
    const testUrl = 'https://npmjs.com/package/express'

    expect(identifyLink(testUrl)).toBe('npm')
  })

  // test case 3: invalid link
  it('Should return null when given an invalid link', () => {
    const testUrl = 'https://google.com'

    expect(identifyLink(testUrl)).toBe(null)
  })
})
