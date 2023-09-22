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
      exec('npm test', (error: string, stdout: string) => {
        // console.log(stdout)
        const passRegex = /(\d+) passing/
        const failRegex = /(\d+) failing/
        const passMatch = passRegex.exec(stdout)
        const failMatch = failRegex.exec(stdout)
        const passTests = passMatch ? Number.parseInt(passMatch[1], 10) : 0
        const failTests = failMatch ? Number.parseInt(failMatch[1], 10) : 0
        const totalTests = passTests + failTests
        const covRegex =
          /All files\s+\|\s+(\d+(?:\.\d+)?|\d{2,3})\s+\|\s+(\d+(?:\.\d+)?|\d{2,3})\s+\|\s+(\d+(?:\.\d+)?|\d{2,3})\s+\|\s+(\d+(?:\.\d+)?|\d{2,3})/
        const covMatch = covRegex.exec(stdout)
        const coverage = covMatch ? Number.parseFloat(covMatch[4]) : 0

        // console.log(`Total: ${totalTests}`)
        // console.log(`Passed: ${passTests}`)
        // console.log(`Coverage: ${coverage}%`)
        console.log(
          `${passTests}/${totalTests} test cases passed. ${coverage}% line coverage achieved.`,
        )
      })
    } else {
      console.log(
        'Dependencies not yet installed. Please run the following command:\n./run install',
      )
      process.exit(1)
    }
  }
}
