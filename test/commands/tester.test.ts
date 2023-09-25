import {test} from '@oclif/test'
import * as fs from 'fs'

describe('Test', () => {
  // const check = jest.spyOn(fs, 'readFileSync').mockReturnValue('yes\n')

  test
    .stdout()
    .command(['tester'])
    .it('runs Test', async (ctx) => {
      expect(ctx.stdout).toContain('')
    })

  // check.mockRestore()
})
