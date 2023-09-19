// import {expect, test} from '@oclif/test'
import fs from 'node:fs'
import {readFileAsync, Install} from '../../src/commands/install'
import logger from '../../src/logger'

describe('readFileAsync', () => {
  it('should read a file successfully', async () => {
    const filePath = './package.json'
    const result = JSON.parse(await readFileAsync(filePath))
    expect(result.dependencies).toBeDefined()
  })

  it('should log an error if file reading fails', async () => {
    // Create a stub for the logger's error method
    // const loggerStub = sinon.stub(logger, 'error')

    // Call the readFileAsync function with a non-existent file path
    const nonExistentFilePath = 'non-existent-file.json'
    let error: any
    try {
      readFileAsync(nonExistentFilePath)
    } catch (error_) {
      error = error_
      await expect(
        readFileAsync(nonExistentFilePath),
      ).rejects.toThrowErrorMatchingSnapshot()
    }
  })
})

describe('run', () => {
  it('should successfully run the install command', async () => {
    // Mock console.log
    const consoleLogMock = jest.spyOn(console, 'log').mockImplementation();

    // Call the async run() function
    const command = Install.run(['install']);
    await command;

    const logCalls = consoleLogMock.mock.calls[0];
    const expectedLogCalls = 'dependencies installed...'

    // Assert on the mock
    expect(logCalls).toContain(expectedLogCalls);

    // Restore the original console.log
    consoleLogMock.mockRestore();
  })

  // it('should handle errors when reading the file', () => {
  //   // Create a stub for the logger's error method
  //   const loggerStub = sinon.stub(logger, 'error')

  //   const result = test.stdout().command(['install'])

  //   // Assertions
  //   expect(result.stderr).to.contain('Error reading file')
  //   expect(loggerStub.calledOnce).to.be.true
  //   expect(loggerStub.calledWithMatch(sinon.match.instanceOf(Error))).to.be.true

  //   // Restore the stubbed method to its original state
  //   loggerStub.restore()
  // })

  // it('should handle errors when parsing package.json', () => {
  //   // Create a temporary package.json file with invalid JSON for testing
  //   const packagePath = 'test-package.json'
  //   const fileContent = 'invalid-json'

  //   // Write the invalid JSON to the file
  //   fs.writeFile(packagePath, fileContent, (err) => {
  //     if (err) throw err
  //   })

  //   const result:string = test.stdout().command(['install'])

  //   // Assertions
  //   expect(result).to.contain('Error parsing package.json')
  //   expect(result).to.contain('SyntaxError')
  //   expect(result).to.contain('invalid-json')

  //   // Clean up: Delete the temporary file
  //   fs.unlink(packagePath, (err) => {
  //     if (err) throw err
  //   })
  // })
})
