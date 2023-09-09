import { Command } from "@oclif/core";
import { exec } from "child_process";

export default class Install extends Command {
  static description = "Install dependecies";

  async run(): Promise<void> {
    const installProcess = exec('npm install 2> /dev/null', (error, stdout, stderr) => {
      if (error) {
        this.error(`Dependency installation failed: ${error.message}`);
      } else {
        const numberOfDependencies = exec('npm ls --depth=0 --parseable | wc -l | xargs -I {}', (num) => {
          this.log(`${num === null ? 0 : num} dependencies installed...`);
        });

        numberOfDependencies.stderr?.on('data', (data) => {
          this.error(`stderr: ${data}`);
        });
      }
    });

    installProcess.stderr?.on('data', (data) => {
      this.log(`stderr: ${data}`);
    });
  }
}
