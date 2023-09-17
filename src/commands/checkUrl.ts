import {Args, Command, Flags} from '@oclif/core'

export default class CheckUrl extends Command {
  static description = 'describe the command here'

  static args = {
    urls: Args.string({
      description: 'file path to URLs',
      required: true,
    }),
  }

  public async run(): Promise<void> {
    const {args} = await this.parse(CheckUrl)
    const fs = require('fs')
    const hiddenPath = './check_install'
    const fileContent = fs.readFileSync(hiddenPath, 'utf-8')
    if (fileContent == 'yes\n') {
      const rl = fs.readline.createInterface({
        input: fs.createReadStream(args),
        output: process.stdout,
        terminal: false,
      })
      rl.on('line', (url: string) => {
        const Metrics = {
          URL: url,
          netScore: 0,
          rampUp: 0,
          correctness: 0,
          busFactor: 0,
          respMaintain: 0,
          license: 0,
        }

        console.log(`{"URL": "${url}", "NET SCORE":${Metrics.netScore}, "RAMP_UP_SCORE":${Metrics.rampUp},
        "CORRECTNESS_SCORE":${Metrics.correctness}, "BUS_FACTOR_SCORE":${Metrics.busFactor},
        "RESPONSIVE_MAINTAINER_SCORE":${Metrics.respMaintain}, "LICENSE_SCORE":${Metrics.license}}`)
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
