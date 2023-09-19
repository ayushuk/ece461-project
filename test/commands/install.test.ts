// import {expect, test} from '@oclif/test'
import fs from 'node:fs'
import sinon from 'sinon'
import {readFileAsync} from '../../src/commands/install'
import logger from '../../src/logger'

// describe('test', () => {
//   test
//     .stdout()
//     .command(['test'])
//     .it('runs hello', (ctx) => {
//       expect(ctx.stdout).to.contain('hello world')
//     })
// })

describe('readFileAsync', () => {
  it('should read a file successfully', async () => {
    // Create a temporary package.json file for testing
    const packagePath = 'test-package.json'
    const fileContent = JSON.stringify({dependencies: {test: '1.0.0'}})
    fs.writeFile(packagePath, fileContent, (err) => {
      if (err) throw err
    })

    // Call the readFileAsync function
    const result = readFileAsync(packagePath)

    // Assertions
    expect(result).to.equal(fileContent)

    // Clean up: Delete the temporary file
    fs.unlink(packagePath, (err) => {
      if (err) throw err
    })
    //delete file
  })

  it('should log an error if file reading fails', () => {
    // Create a stub for the logger's error method
    const loggerStub = sinon.stub(logger, 'error')

    // Call the readFileAsync function with a non-existent file path
    const nonExistentFilePath = 'non-existent-file.json'
    let error: any
    try {
      readFileAsync(nonExistentFilePath)
    } catch (error_) {
      error = error_
    }

    // Assertions
    expect(error).to.exist
    expect(loggerStub.calledOnce).to.be.true
    expect(loggerStub.calledWithMatch(sinon.match.instanceOf(Error))).to.be.true

    // Restore the stubbed method to its original state
    loggerStub.restore()
  })
})

describe('run', () => {
  it('should successfully run the install command', () => {
    const packagePath = 'test-package.json'
    const fileContent = JSON.stringify({dependencies: {test: '1.0.0'}})

    // Create a temporary package.json file for testing
    fs.writeFile(packagePath, fileContent, (err) => {
      if (err) throw err
    })

    const result = test.stdout().command(['install'])

    // Assertions
    expect(result.stdout).to.contain('1 dependencies installed')

    // Clean up: Delete the temporary file
    fs.unlink(packagePath, (err) => {
      if (err) throw err
    })
  })

  it('should handle errors when reading the file', () => {
    // Create a stub for the logger's error method
    const loggerStub = sinon.stub(logger, 'error')

    const result = test.stdout().command(['install'])

    // Assertions
    expect(result.stderr).to.contain('Error reading file')
    expect(loggerStub.calledOnce).to.be.true
    expect(loggerStub.calledWithMatch(sinon.match.instanceOf(Error))).to.be.true

    // Restore the stubbed method to its original state
    loggerStub.restore()
  })

  it('should handle errors when parsing package.json', () => {
    // Create a temporary package.json file with invalid JSON for testing
    const packagePath = 'test-package.json'
    const fileContent = 'invalid-json'

    // Write the invalid JSON to the file
    fs.writeFile(packagePath, fileContent, (err) => {
      if (err) throw err
    })

    const result = test.stdout().command(['install'])

    // Assertions
    expect(result.stderr).to.contain('Error parsing package.json')
    expect(result.stderr).to.contain('SyntaxError')
    expect(result.stderr).to.contain('invalid-json')

    // Clean up: Delete the temporary file
    fs.unlink(packagePath, (err) => {
      if (err) throw err
    })
  })
})
