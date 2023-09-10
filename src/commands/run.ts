import {Args, Command} from '@oclif/core'

export class Run extends Command {
  static args = {
    firstArg: Args.string(),
  }

  async run() {
    // can get args as an object
    const {args} = await this.parse(Run)
    this.log(`running my command with args: ${args.firstArg}`)
    // can also get the args as an array
    const {argv} = await this.parse(Run)
    this.log(`running my command with args: ${argv[0]}`)
  }
}