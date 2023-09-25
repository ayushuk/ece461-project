import * as fs from 'node:fs'
import * as url from 'node:url'
import {exec} from 'node:child_process'
import * as path from 'node:path'
import {getGithubLinkFromNpm} from '../services/gh-service'
import logger from '../logger'

export function round(value: number, decimals: number): number {
  logger.info(`Rounding ${value} to ${decimals} decimal places`)

  // rounds number to specified decimal places
  return Number(value.toFixed(decimals))
}

export function identifyLink(link: string) {
  logger.info(`Identifying link type for ${link}`)

  // link pattern for github
  const githubPattern = /^(https?:\/\/)?(www\.)?github\.com\/[\w.-]+\/[\w.-]+/

  // link pattern for npm
  const npmPattern = /^(https?:\/\/)?(www\.)?npmjs\.com\/package\/[\w.-]+/

  if (githubPattern.test(link)) {
    return 'github'
  }

  if (npmPattern.test(link)) {
    return 'npm'
  }

  return null
}

export async function getLinesOfCode(filePath: string): Promise<number> {
  logger.info(`Getting lines of code for ${filePath}`)

  return new Promise((resolve, reject) => {
    let lineCount = 0

    // open file stream
    const stream = fs.createReadStream(filePath, {encoding: 'utf8'})

    // count the lines of code in file stream
    stream.on('data', (chunk: string) => {
      // Use the corrected regular expression to match newlines
      lineCount += (chunk.match(/(\r\n|\n|\r)/g) || []).length
    })

    stream.on('end', () => {
      resolve(lineCount + 1) // Add 1 to account for the last line without a newline character
      logger.debug(`Lines of code: ${lineCount}`)
    })

    stream.on('error', (err: any) => {
      reject(err)
    })
  })
}

export function parseGHRepoName(repoUrl: string): string | null {
  logger.info(`Parsing GitHub repository name from ${repoUrl}`)

  // Parse the URL
  const parsedUrl = url.parse(repoUrl)

  // Check if the URL is from github.com and has a valid path
  if (
    parsedUrl.hostname === 'github.com' &&
    parsedUrl.path &&
    parsedUrl.path.length > 1 // Ensure there's a path after the hostname
  ) {
    // Extract the repository name (removing leading slash if present)

    const pathComponents = parsedUrl.path.split('/')
    const repoName = pathComponents.pop() // Get the last path component

    return repoName || null
  }

  return null // Not a valid GitHub repository URL
}

export async function cloneRepo(ghUrl: string) {
  logger.info(`Cloning GitHub repository from ${ghUrl}`)

  const repoName = parseGHRepoName(ghUrl)
  let localPath = '../ece461-project/src/middleware/cloned-repos'

  // format local path name
  if (repoName) {
    localPath = path.join(localPath, repoName)
  }

  // add .git to end of url
  const repoUrl = `${ghUrl}.git`

  // clone repo
  return new Promise<void>((resolve, reject) => {
    exec(`git clone ${repoUrl} ${localPath}`, (error) => {
      if (error) {
        logger.error(`Error cloning repo: ${error}`)
        reject(error)
      } else {
        logger.debug(`Cloned repo to ${localPath}`)
        resolve()
      }
    })
  })
}

export async function calcRepoLines(repoPath: string): Promise<number> {
  logger.info(`Calculating lines of code for ${repoPath}`)

  let totalLines = 0

  // go through all files in the given directory
  async function processDirectory(directoryPath: string) {
    const files = fs.readdirSync(directoryPath)

    for (const file of files) {
      const filePath = path.join(directoryPath, file)

      if (file === '.git') {
        // Skip the .git directory
        continue // eslint-disable-line no-continue
      }

      // if the file is a directory, recursively process it to count all files lines of code
      if (fs.statSync(filePath).isDirectory()) {
        // Recursively process subdirectories
        await processDirectory(filePath) // eslint-disable-line no-await-in-loop
      } else {
        const lines = await getLinesOfCode(filePath) // eslint-disable-line no-await-in-loop
        totalLines += lines
      }
    }
  }

  await processDirectory(repoPath)

  logger.debug(`Total lines of code: ${totalLines}`)

  return totalLines
}

export async function evaluateLink(link: string) {
  logger.info(`Evaluating link ${link}`)

  // checks whether the link is a github link or npm link
  const linkType = identifyLink(link)
  if (linkType === 'github') {
    return link
  }

  if (linkType === 'npm') {
    return getGithubLinkFromNpm(link)
  }

  return null
}
