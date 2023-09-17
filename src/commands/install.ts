import * as dotenv from 'dotenv'
import fs from 'node:fs'
import {Command} from '@oclif/core'
import logger from '../logger'

// import and configure dotenv
dotenv.config()

// read file asynchronously
export async function readFileAsync(packagePath: string): Promise<string> {
  try {
    const data: string = await fs.promises.readFile(packagePath, 'utf8')
    return data
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error reading file: ${error.message}`)
    }

    throw error // Re-throw the error if needed
  }
}

export class Install extends Command {
  // static description = 'Install dependecies'
  async run(): Promise<void> {
    const packagePath = './package.json'
    try {
      const fileContent = await readFileAsync(packagePath)
      try {
        // Parse the JSON data
        const packageJson = JSON.parse(fileContent)
        // Access the dependencies object
        const dependencies = packageJson.dependencies

        // Get the number of dependencies
        const numDependencies = Object.keys(dependencies).length
        this.log(`${numDependencies} dependencies installed...`)
      } catch (error) {
        this.error(`Error parsing package.json: ${error}`)
      }
    } catch (error) {
      if (error instanceof Error) {
        this.error(`Error reading file: ${error.message}`)
      }

      throw error
    }
  }
}
