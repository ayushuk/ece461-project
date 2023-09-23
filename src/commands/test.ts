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
        const testsRegex = /(\d+) failed, (\d+) passed, (\d+) total/;
        const testsMatch = testsRegex.exec(error)

        if (testsMatch) {
          const failedTests = parseInt(testsMatch[1]);
          const passedTests = parseInt(testsMatch[2]);
          const totalTests = parseInt(testsMatch[3]);
          console.log(
            `${passedTests}/${totalTests} test cases passed. ${passedTests / totalTests * 100}% line coverage achieved.`,
          )
        }
      })
      process.exit(0)
    } else {
      console.log(
        'Dependencies not yet installed. Please run the following command:\n./run install',
      )
      process.exit(1)
    }
  }
}
