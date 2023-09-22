import {Args, Command, Flags} from '@oclif/core'
import * as fs from 'fs'
import { assignMetrics } from '../../src/fill-models';

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
    const hiddenPath = './check_install'
    const fileContent = fs.readFileSync(hiddenPath, 'utf-8')
    if (fileContent == 'yes\n') {
      const allFileContents = fs.readFileSync(args.urls, 'utf-8')
      allFileContents.split(/\r?\n/).forEach((url) => {

        const Metrics = assignMetrics(url);

        console.log(
          `{"URL": "${url}", "NET SCORE":${Metrics.NetScore}, "RAMP_UP_SCORE":${Metrics.RampUp}, "CORRECTNESS_SCORE":${Metrics.Correctness}, "BUS_FACTOR_SCORE":${Metrics.BusFactor}, "RESPONSIVE_MAINTAINER_SCORE":${Metrics.Responsiveness}, "LICENSE_SCORE":${Metrics.License}}`,
        )
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