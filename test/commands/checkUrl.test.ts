import CheckUrl from '../../src/commands/checkUrl'

describe('CheckUrl Command', () => {
  it('runs without dependencies', async () => {
    // const fs = require('fs')
    // const fsSpy = jest.spyOn(fs, 'readFileSync').mockImplementation(function () {
    //   return 'no\n'
    // })
    const consoleSpy = jest.spyOn(console, 'error')

    // call the command, ensure the file exists
    await CheckUrl.run(['./URLs'])

    expect(consoleSpy).toContain(
      'Dependencies not yet installed. Please run the following command:\n./run install',
    )

    expect(process.exit).toHaveBeenCalledWith(1)
    // fsSpy.mockRestore()
    consoleSpy.mockRestore()
  })
})
