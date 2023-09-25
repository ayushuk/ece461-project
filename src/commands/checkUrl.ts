import {Args, Command, Flags, run} from '@oclif/core'
import * as fs from 'fs'
<<<<<<< HEAD
import {assignMetrics} from '../../src/fill-models'
=======
import {assignMetrics} from '../middleware/fill-models';
>>>>>>> create-run

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
      const urls = allFileContents
        .split(/\r?\n/)
        .filter((line) => line.trim() !== '')
      urls.forEach((url) => {
        const Metrics = assignMetrics(url).then((Metrics) => {
          console.log(
            `{"URL": "${url}", "NET_SCORE":${Metrics.NetScore}, "RAMP_UP_SCORE":1, "CORRECTNESS_SCORE":${Metrics.Correctness}, "BUS_FACTOR_SCORE":${Metrics.BusFactor}, "RESPONSIVE_MAINTAINER_SCORE":${Metrics.Responsiveness}, "LICENSE_SCORE":${Metrics.License}}`,
          )

          process.exit(0)
        })
      })
    } else {
      console.log(
        'Dependencies not yet installed. Please run the following command:\n./run install',
      )
      process.exit(1)
    }
  }
}
