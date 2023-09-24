import {command, test} from '@oclif/test'
import fs from 'node:fs'
import {readFileAsync, Install} from '../../src/commands/install'
import logger from '../../src/logger'
import { exec } from 'node:child_process'


describe('readFileAsync', () => {
  it('should read a file successfully', async () => {
    const filePath = './package.json'
    const result = JSON.parse(await readFileAsync(filePath))
    expect(result.dependencies).toBeDefined()
  })
  
  it('should log an error if file reading fails', async () => {
    const loggerSpy = jest.spyOn(logger, 'info').mockImplementation();
    const nonExistentFilePath = 'non-existent-file.json'
    let error: any
    try {
      readFileAsync(nonExistentFilePath)
    } catch (error_) {
      error = error_
      expect(loggerSpy).toHaveBeenCalled()
      await expect(
        readFileAsync(nonExistentFilePath),
        ).rejects.toThrowErrorMatchingSnapshot()
      }
      loggerSpy.mockRestore()
    })
  })
  
describe('Install', () => {
  it('should successfully run the install command', async () => {
    const packagePath = "./package.json"
    
    const consoleLogMock = jest
    .spyOn(process.stdout, 'write')
    .mockImplementation()

  // Call the async run() function
    await Install.run(['install'])

    const logCalls = consoleLogMock.mock.calls
      .map((args) => args.join(' ')) // Convert arguments to a single string
      .join('\n')
    const expectedLogCalls = 'dependencies installed...'

    // Assert on the mock
    expect(logCalls).toContain(expectedLogCalls)

    // Restore the original console.log
    consoleLogMock.mockRestore()
  })
})

describe('install', () => {
  test
    .stdout()
    .command(['install'])
    .it('runs Install', (ctx) => {
      expect(ctx.stdout).toContain('dependencies installed...')
    })
})
