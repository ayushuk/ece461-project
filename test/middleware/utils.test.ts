// import {parse} from 'path'
import * as utils from '../../src/middleware/utils'
// import {
//   round,
//   identifyLink,
//   cloneRepo,
//   parseGHRepoName,
//   getLinesOfCode,
//   calcRepoLines,
// } from '../../src/middleware/utils'

describe('round', () => {
  // Test case 1: Round down 2 decimal places
  it('should return 768.98 given 768.983', () => {
    expect(utils.round(768.983, 2)).toBe(768.98)
  })

  // Test case 2: Round up 7 decimal places
  it('should return 768.98 given 768.983', () => {
    expect(utils.round(768.983_987_254, 7)).toBe(768.983_987_3)
  })

  // Test case 2: Round negative number
  it('should return 768.98 given 768.983', () => {
    expect(utils.round(-5.129, 2)).toBe(-5.13)
  })
})

describe('identifyLink', () => {
  // test case 1: valid gh link
  it('Should return github when given a valid github link', () => {
    const testUrl = 'https://github.com/ayushuk/ece461-project'

    expect(utils.identifyLink(testUrl)).toBe('github')
  })

  // test case 2: valid npm link
  it('Should return npm when given a valid npm link', () => {
    const testUrl = 'https://npmjs.com/package/express'

    expect(utils.identifyLink(testUrl)).toBe('npm')
  })

  // test case 3: invalid link
  it('Should return null when given an invalid link', () => {
    const testUrl = 'https://google.com'

    expect(utils.identifyLink(testUrl)).toBe(null)
  })
})

describe('parseGHRepoName', () => {
  it('should return the repo name when given a valid github link', () => {
    const testUrl = 'https://github.com/octocat/Spoon-Knife'

    expect(utils.parseGHRepoName(testUrl)).toBe('Spoon-Knife')
  })
})

// describe('cloneRepo', () => {
//   // test case 1: valid gh link
//   it('should clone a github repo', () => {
//     const testUrl = 'https://github.com/octocat/Spoon-Knife'
//     // const localPath = '../ece461-project/src/middleware/cloned-repos'

//     cloneRepo(testUrl)
//     // TODO: fix this test
//     expect(utils.cloneRepo(testUrl))
//   })
//   it('should clone a github repo', () => {
//     const testUrl = 'https://github.com/cloudinary/cloudinary_npm'
//     // const localPath = '../ece461-project/src/middleware/cloned-repos'

//     cloneRepo(testUrl)
//     // TODO: fix this test
//     expect(utils.cloneRepo(testUrl))
//   })
// })

// describe('getLinesOfCode', () => {
//   // test case 1: valid file path
//   it('should return the number of lines of code in a file', async () => {
//     const testFilePath =
//       '../ece461-project/src/middleware/cloned-repos/Spoon-Knife/README.md'

//     const result = await utils.getLinesOfCode(testFilePath)

//     expect(result).toBe(10)
//   })
// })

// describe('calcRepoLines', () => {
//   it('should return the number of lines of code in a repo', async () => {
//     const testRepoPath =
//       '../ece461-project/src/middleware/cloned-repos/Spoon-Knife'

//     const result = await utils.calcRepoLines(testRepoPath)

//     expect(result).toBe(49)
//   })
//   it('should return the number of lines of code in a repo', async () => {
//     const testRepoPath =
//       '../ece461-project/src/middleware/cloned-repos/cloudinary_npm'

//     const result = await calcRepoLines(testRepoPath)

//     expect(result).toBe(171_992)
//   })
// })
