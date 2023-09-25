import CheckUrl from '../../src/commands/checkUrl'

describe('CheckUrl Command', () => {
  it('runs without dependencies', async () => {
    // const fs = require('fs')
    // const fsSpy = jest.spyOn(fs, 'readFileSync').mockImplementation(function () {
    //   return 'no\n'
    // })
    const consoleSpy = jest.spyOn(console, 'log')

    // call the command, ensure the file exists
    await CheckUrl.run(['./URLs'])

    // expect(consoleSpy).toContain('URL')

    // expect(consoleSpy.getMockImplementation).toHaveBeenCalledWith(5)

    consoleSpy.mockRestore()
  })
})
