import { Command } from "@oclif/core";
import { exec } from "child_process";
import logger from "../logging";

// import and configure dotenv
require("dotenv").config();

export default class Install extends Command {
  static description = "Install dependecies";

  async run(): Promise<void> {
    const installProcess = exec("npm install", (error, stdout, stderr) => {
      if (error) {
        logger.debug(stderr);

        return -1;
      } else {
        if (process.env.LOG_LEVEL === "1") {
          logger.info(stdout);
        }
        const numberOfDependencies = exec(
          "npm ls --depth=0 --parseable | wc -l | xargs -I {}",
          (num) => {
            this.log(`${num === null ? 0 : num} dependencies installed...`);
          }
        );

        numberOfDependencies.stderr?.on("data", (data) => {
          this.error(`stderr: ${data}`);
        });

        return 0;
      }
    });

    installProcess.stderr?.on("data", (data) => {
      if (process.env.LOG_LEVEL === "2") {
        logger.debug(`${data}`);
      }
    });
  }
}
