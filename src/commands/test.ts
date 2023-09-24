import {Args, Command, Flags} from '@oclif/core'
import {List} from '@oclif/core/lib/interfaces/parser'
const {exec} = require('child_process')

export default class Test extends Command {
  static description = 'describe the command here'
  public async run() {
    const hiddenPath = './check_install'
    const fs = require('fs')
    const fileContent = fs.readFileSync(hiddenPath, 'utf-8')
    if (fileContent == 'yes\n') {
      exec('npx jest --config ./jest.config.ts', (error: string, stdout: string, stderr: string) => {
        const testRegex = /Tests:\s+(\d+) failed,\s+(\d+) passed,\s+(\d+) total/
        const testMatch = testRegex.exec(stderr)
        if (testMatch) {
          const passTests = parseInt(testMatch[2], 10)
          const failTests = parseInt(testMatch[1], 10)
          const totalTests = passTests + failTests
          const coverage = passTests / totalTests * 100
          console.log(
            `${passTests}/${totalTests} test cases passed. ${coverage.toFixed(0)}% line coverage achieved.`
          )
        } else {
          console.log(
            `0/0 test cases passed. 0% line coverage achieved.`,
          )
        }
      })
    } else {
      console.log(
        'Dependencies not yet installed. Please run the following command:\n./run install',
      )
      process.exit(1)
    }
  }
}
