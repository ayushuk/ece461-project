import {expect, test} from '@oclif/test'
import {normalize} from '../../src/middleware/helper-functions'

describe('Helper Functions', () => {
  test('Normalize', () => {
    expect(normalize([1, 2, 3], 4)).toBe(1)
  })
})
