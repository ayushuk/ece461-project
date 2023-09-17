import * as fs from 'node:fs'
import * as nodegit from 'nodegit'
import * as url from 'node:url'

export function round(value: number, decimals: number): number {
  return Number(value.toFixed(decimals))
}

export function getLinesOfCode(filePath: string) {
  return new Promise((resolve, reject) => {
    let lineCount = 0

    const stream = fs.createReadStream(filePath, {encoding: 'utf8'})

    stream.on('data', (chunk: string) => {
      lineCount += (chunk.match(/|n/g) || []).length
    })

    stream.on('end', () => {
      resolve(lineCount + 1)
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

export async function cloneRepo(GhUrl: string) {
  let repositoryUrl = GhUrl
  const repoName = parseGHRepoName(repositoryUrl)
  repositoryUrl = GhUrl + '.git'
  console.log(repositoryUrl)
  console.log(repoName)
  const localPath = ``
  // ./cloned-repos/${repoName}

  try {
    // Clone the repository
    await nodegit.Clone(repositoryUrl, localPath)
    console.log('Cloned')
  } catch (error) {
    //error = null
    console.error('Error', error)
    return error
  }

  return localPath
}
