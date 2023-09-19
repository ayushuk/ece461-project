// import {expect, test} from '@oclif/test'
import fs from 'node:fs'
import {readFileAsync, Install} from '../../src/commands/install'
import logger from '../../src/logger'

describe('readFileAsync', () => {
  it('should read a file successfully', async () => {
    // Create a temporary package.json file for testing
    const packagePath = 'test-package.json'
    const fileContent = {dependencies: {test: '1.0.0'}}
    fs.writeFile(packagePath, JSON.stringify(fileContent), (err) => {
      if (err) throw err
    })

    // Call the readFileAsync function
    const result = JSON.parse(await readFileAsync(packagePath))

    // Assertions
    expect(result).toEqual(fileContent)

    // Clean up: Delete the temporary file
    fs.unlink(packagePath, (err) => {
      if (err) throw err
    })
    //delete file
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
      await expect(readFileAsync(nonExistentFilePath)).rejects.toThrowErrorMatchingSnapshot();
    }

    // Assertions
    // expect(loggerStub.calledOnce).to.be.true
    // expect(loggerStub.calledWithMatch(sinon.match.instanceOf(Error))).to.be.true

    // Restore the stubbed method to its original state
    // loggerStub.restore()
  })
})

describe('run', () => {
  it('should successfully run the install command', async () => {
    const mockLog = jest.spyOn(process.stdout, 'write')

    // Run your CLI command
    Install.run()

    // Assert that the run method was called
    expect(Install.run()).toHaveBeenCalledWith(['install'])

    // Assert that the log function was called with the expected message
    expect(mockLog).toHaveBeenCalledWith('dependencies installed...\n')
    expect(mockLog).toHaveBeenCalledTimes(1) // Ensure it was called once

    // Clean up
    mockLog.mockRestore() // Restore the original log function
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
