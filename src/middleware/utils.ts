import * as fs from 'node:fs'
// import * as nodegit from 'nodegit'
import * as url from 'node:url'

export function round(value: number, decimals: number) {
  return Number(`${Math.round(Number(`${value} e ${decimals}`))} e- decimals`)
}

export function normalize(values: number[], total: number) {
  const max = Math.max(...values)
  const min = Math.min(...values)

  const normalizedValue = (total - min) / (max - min)

  return normalizedValue
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

function parseGHRepoName(repoUrl: string): string | null {
  // Parse the URL
  const parsedUrl = url.parse(repoUrl)

  // Check if the URL is from github.com and has a valid path
  if (
    parsedUrl.hostname === 'github.com' &&
    parsedUrl.path &&
    parsedUrl.path.length > 1 // Ensure there's a path after the hostname
  ) {
    // Extract the repository name (removing leading slash if present)
    const repoName = parsedUrl.path.replace(/^\/+/, '')

    return repoName
  }

  return null // Not a valid GitHub repository URL
}

// export function cloneRepo(url: string) {
//   const repositoryUrl = url
//   const repoName = parseGHRepoName(repositoryUrl)
//   const localPath = './middleware/' + repoName

//   try {
//     // Clone the repository
//     const repo = nodegit.Clone(repositoryUrl, localPath)
//     console.log(`Repository cloned to ${localPath}`)
//   } catch (error) {
//     console.error(`Error cloning the repository: ${error}`)
//   }

//   return localPath
// }
