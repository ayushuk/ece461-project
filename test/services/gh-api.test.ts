import axios from 'axios'
import {
  getCommitData,
  getPullRequestData,
  getIssues,
  getLicense,
  getMonthlyCommitCount,
  getAnualCommitCount,
} from '../../src/services/gh-api'

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
    const result = await getCommitData('')
    expect(result).toStrictEqual(['critUser', 100, 150])
  })
  it('get commit data failure', async () => {
    mockedAxios.get.mockRejectedValue(new Error('error'))
    const result = await getCommitData('')
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
    const result = await getPullRequestData('', 'critUser')
    expect(result).toStrictEqual([2, 4])
  })
  it('get pull request data failure', async () => {
    mockedAxios.get.mockRejectedValue(new Error('error'))
    const result = await getPullRequestData('', 'critUser')
    expect(result).toStrictEqual([-1, -1])
  })
})

describe('test getIssues', () => {
  it('get issues successfully', async () => {
    const data = [{}, {}, {}]
    mockedAxios.get.mockReturnValueOnce(Promise.resolve({data}))
    const result = await getIssues('', 'open')
    expect(result).toStrictEqual(3)
  })
  it('get issues failure', async () => {
    mockedAxios.get.mockRejectedValue(new Error('error'))
    const result = await getIssues('', 'open')
    expect(result).toStrictEqual(-1)
  })
})

describe('test getLicense', () => {
  it('get license successfully', async () => {
    const data = {
      license: {
        key: 'test license',
      },
    }
    mockedAxios.get.mockReturnValueOnce(Promise.resolve({data}))
    const result = await getLicense('')
    expect(result).toStrictEqual('test license')
  })
  it('get license failure', async () => {
    mockedAxios.get.mockRejectedValue(new Error('error'))
    const result = await getLicense('')
    expect(result).toStrictEqual('')
  })
})

describe('test getMonthlyCommitCount', () => {
  it('get monthly commit count successfully', async () => {
    const data = {
      all: [2, 4, 6, 8], // 20 commits in total
    }
    mockedAxios.get.mockReturnValueOnce(Promise.resolve({data}))
    const result = await getMonthlyCommitCount('')
    expect(result).toStrictEqual(20)
  })
  it('get monthly commit count failure', async () => {
    mockedAxios.get.mockRejectedValue(new Error('error'))
    const result = await getMonthlyCommitCount('')
    expect(result).toStrictEqual(-1)
  })
})

describe('test getAnualCommitCount', () => {
  it('get anual commit count successfully', async () => {
    const data = [
      {
        total: 2,
      },
      {
        total: 4,
      },
      {
        total: 6,
      },
      {
        total: 8,
      },
    ]
    mockedAxios.get.mockReturnValueOnce(Promise.resolve({data}))
    const result = await getAnualCommitCount('')
    expect(result).toStrictEqual(20)
  })
  it('get anual commit count failure', async () => {
    mockedAxios.get.mockRejectedValue(new Error('error'))
    const result = await getAnualCommitCount('')
    expect(result).toStrictEqual(-1)
  })
})
