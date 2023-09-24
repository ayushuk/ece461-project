import * as fs from 'node:fs'
import * as url from 'node:url'
import {exec} from 'node:child_process'
import * as path from 'node:path'

export function round(value: number, decimals: number): number {
  return Number(value.toFixed(decimals))
}

export function identifyLink(link: string) {
  const githubPattern = /^(https?:\/\/)?(www\.)?github\.com\/[\w.-]+\/[\w.-]+/

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
  return new Promise((resolve, reject) => {
    let lineCount = 0

    const stream = fs.createReadStream(filePath, {encoding: 'utf8'})

    stream.on('data', (chunk: string) => {
      // Use the corrected regular expression to match newlines
      lineCount += (chunk.match(/(\r\n|\n|\r)/g) || []).length
    })

    stream.on('end', () => {
      resolve(lineCount + 1) // Add 1 to account for the last line without a newline character
    })

    stream.on('error', (err: any) => {
      reject(err)
    })
  })
}

export function parseGHRepoName(repoUrl: string): string | null {
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
  const repoName = parseGHRepoName(ghUrl)
  let localPath = '../ece461-project/src/middleware/cloned-repos'
  if (repoName) {
    localPath = path.join(localPath, repoName)
  }
  // TODO: else error return

  const repoUrl = `${ghUrl}.git`

  return new Promise<void>((resolve, reject) => {
    exec(`git clone ${repoUrl} ${localPath}`, (error) => {
      if (error) {
        reject(error)
        // TODO logging and error handling
      } else {
        resolve()
      }
    })
  })
}

export async function calcRepoLines(repoPath: string): Promise<number> {
  let totalLines = 0

  async function processDirectory(directoryPath: string) {
    const files = fs.readdirSync(directoryPath)

    for (const file of files) {
      const filePath = path.join(directoryPath, file)

      if (file === '.git') {
        continue // Skip the .git directory
      }

      if (fs.statSync(filePath).isDirectory()) {
        await processDirectory(filePath) // Recursively process subdirectories
      } else {
        const lines = await getLinesOfCode(filePath)
        totalLines += lines
      }
    }
  }

  await processDirectory(repoPath)
  return totalLines
}
