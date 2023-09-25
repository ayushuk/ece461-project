/* eslint-disable no-console */
/* eslint-disable no-process-exit */
/* eslint-disable unicorn/no-process-exit */
import {Command} from '@oclif/core'
import {exec} from 'node:child_process'
import * as fs from 'node:fs'

export default class Test extends Command {
  static description = 'describe the command here'
  public async run() {
    const hiddenPath = './check_install'
    const fileContent = fs.readFileSync(hiddenPath, 'utf8')
    if (fileContent === 'yes\n') {
      exec(
        'npx jest --config ./jest.config.ts',
        (_error, stdout: string, stderr: string) => {
          const testRegex =
            /Tests:\s+(\d+) failed,\s+(\d+) passed,\s+(\d+) total/
          const testCompleteRegex = /Tests:\s+(\d+) passed,\s+(\d+) total/
          const testMatch = testRegex.exec(stderr)
          const testCompleteMatch = testCompleteRegex.exec(stderr)
          const covRegex =
            /All files\s+\|\s+(\d+(?:\.\d+)?|\d{2,3})\s+\|\s+(\d+(?:\.\d+)?|\d{2,3})\s+\|\s+(\d+(?:\.\d+)?|\d{2,3})\s+\|\s+(\d+(?:\.\d+)?|\d{2,3})/
          const covMatch = covRegex.exec(stdout)
          const coverage = covMatch ? Number.parseInt(covMatch[4], 10) : 0
          if (testMatch) {
            const passTests = Number.parseInt(testMatch[2], 10)
            const failTests = Number.parseInt(testMatch[1], 10)
            const totalTests = passTests + failTests
            this.log(
              `${passTests}/${totalTests} test cases passed. ${coverage.toFixed(
                0,
              )}% line coverage achieved.`,
            )
          } else if (testCompleteMatch) {
            const passTests = Number.parseInt(testCompleteMatch[1], 10)
            this.log(
              `${passTests}/${passTests} test cases passed. ${coverage.toFixed(
                0,
              )}% line coverage achieved.`,
            )
          } else {
            this.log(`0/0 test cases passed. 0% line coverage achieved.`)
          }
        },
      )
      // process.exit(0)
    } else {
      console.log(
        'Dependencies not yet installed. Please run the following command:\n./run install',
      )
      process.exit(1)
    }
  }
}
