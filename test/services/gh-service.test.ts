import axios from 'axios'
import * as ghService from '../../src/services/gh-service'
// import {BusFactorData} from '../../src/models/middleware-inputs'

const mockedAxios = axios as jest.Mocked<typeof axios>
jest.mock('axios')
// source: https://stackoverflow.com/questions/60410731/how-to-mock-interceptors-when-using-jest-mockaxios
mockedAxios.create.mockImplementation(() => axios)

describe('test getCommitData', () => {
  it('get commit data sucessfully', async () => {
    const data = [
      {
        login: 'critUser',
        contributions: 100,
      },
      {
        login: 'otherUser',
        contributions: 50,
      },
    ]
    mockedAxios.get.mockReturnValueOnce(Promise.resolve({data}))
    const result = await ghService.getCommitData('')
    expect(result).toStrictEqual(['critUser', 100, 150])
  })
  it('get commit data failure', async () => {
    mockedAxios.get.mockRejectedValue(new Error('error'))
    const result = await ghService.getCommitData('')
    expect(result).toStrictEqual(['', -1, -1])
  })
})

describe('test getPullReqestData', () => {
  it('get pull request data successfully', async () => {
    const data = [
      {
        user: {
          login: 'critUser',
        },
      },
      {
        user: {
          login: 'otherUser',
        },
      },
      {
        user: {
          login: 'critUser',
        },
      },
      {
        user: {
          login: 'otherUser2',
        },
      },
    ]
    mockedAxios.get.mockReturnValueOnce(Promise.resolve({data}))
    const result = await ghService.getPullRequestData('', 'critUser')
    expect(result).toStrictEqual([2, 4])
  })
  it('get pull request data failure', async () => {
    mockedAxios.get.mockRejectedValue(new Error('error'))
    const result = await ghService.getPullRequestData('', 'critUser')
    expect(result).toStrictEqual([-1, -1])
  })
})

// TODO: test get bus factor data (need mocks)
// describe('test getBusFactorData', () => {
//   it('get bus factor data successfully', () => {
//     const mockGetCommitData = jest.spyOn(ghService, 'getCommitData')
//     const mockGetPullRequestData = jest.spyOn(ghService, 'getPullRequestData')

//     mockGetCommitData.mockReturnValueOnce(Promise.resolve(['critUser', 100, 150]))
//     mockGetPullRequestData.mockReturnValueOnce(Promise.resolve([2, 4]))

//     const result: BusFactorData = ghService.getBusFactorData('')
//     const expected: BusFactorData = {
//       criticalContrubitorCommits: 100,
//       totalCommits: 150,
//       criticalContributorPullRequests: 2,
//       totalPullRequests: 4,
//     }

//     expect(result).toStrictEqual(expected)
//   })
//   it('get bus factor data failure', () => {})
// })

describe('test getIssues', () => {
  it('get issues successfully', async () => {
    const data = [{}, {}, {}]
    mockedAxios.get.mockReturnValueOnce(Promise.resolve({data}))
    const result = await ghService.getIssues('', 'open')
    expect(result).toStrictEqual(3)
  })
  it('get issues failure', async () => {
    mockedAxios.get.mockRejectedValue(new Error('error'))
    const result = await ghService.getIssues('', 'open')
    expect(result).toStrictEqual(-1)
  })
})

// TODO: test get correctness data (need mocks)

describe('test getLicense', () => {
  it('get license successfully', async () => {
    const data = {
      license: {
        key: 'test license',
      },
    }
    mockedAxios.get.mockReturnValueOnce(Promise.resolve({data}))
    const result = await ghService.getLicense('')
    expect(result).toStrictEqual('test license')
  })
  it('get license failure', async () => {
    mockedAxios.get.mockRejectedValue(new Error('error'))
    const result = await ghService.getLicense('')
    expect(result).toStrictEqual('')
  })
})

// TODO: test get license compliance (need mocks)
