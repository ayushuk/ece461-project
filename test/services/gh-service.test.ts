import axios from 'axios'
import {
  BusFactorData,
  CorrectnessData,
  ResponsesivenessData,
} from '../../src/models/middleware-inputs'
import * as ghApi from '../../src/services/gh-api'
import {
  getBusFactorData,
  getCorrectnessData,
  getLiscenseComplianceData,
  getResponsivenessData,
  getGithubLinkFromNpm,
} from '../../src/services/gh-service'

const mockedAxios = axios as jest.Mocked<typeof axios>
jest.mock('axios')
// source: https://stackoverflow.com/questions/60410731/how-to-mock-interceptors-when-using-jest-mockaxios
mockedAxios.create.mockImplementation(() => axios)

describe('test getBusFactorData', () => {
  it('get bus factor data successfully', async () => {
    const getCommitDataMock = jest.spyOn(ghApi, 'getCommitData')
    const getPullReqestDataMock = jest.spyOn(ghApi, 'getPullRequestData')

    getCommitDataMock.mockReturnValueOnce(
      Promise.resolve(['critUser', 100, 150]),
    )
    getPullReqestDataMock.mockReturnValueOnce(Promise.resolve([2, 4]))

    const result: BusFactorData = await getBusFactorData('')
    const expected: BusFactorData = {
      criticalContrubitorCommits: 100,
      totalCommits: 150,
      criticalContributorPullRequests: 2,
      totalPullRequests: 4,
    }

    expect(result).toStrictEqual(expected)
  })
})

describe('test getCorrectnessData', () => {
  it('get correctness data successfully', async () => {
    const getIssuesMock = jest.spyOn(ghApi, 'getIssues')

    getIssuesMock.mockReturnValueOnce(Promise.resolve(10))

    const result: CorrectnessData = await getCorrectnessData('')
    const expected: CorrectnessData = {closedIssues: 10, openIssues: -1} // for some reason open issues return -1 in the mock

    expect(result).toStrictEqual(expected)
  })
})

describe('test getLicenseCompliance', () => {
  it('get license compliance successfully', async () => {
    const getLicenseMock = jest.spyOn(ghApi, 'getLicense')

    getLicenseMock.mockReturnValueOnce(Promise.resolve('lpgl-2.1'))

    const result: number = await getLiscenseComplianceData('')
    const expected: number = 1

    expect(result).toStrictEqual(expected)
  })
  it('get license compliance failure', async () => {
    const getLicenseMock = jest.spyOn(ghApi, 'getLicense')

    getLicenseMock.mockReturnValueOnce(Promise.resolve('some other license'))

    const result: number = await getLiscenseComplianceData('')
    const expected: number = 0

    expect(result).toStrictEqual(expected)
  })
})

describe('test getResponsivenessData', () => {
  it('get responsiveness data successfully', async () => {
    const getMonthlyCommitCountMock = jest.spyOn(ghApi, 'getMonthlyCommitCount')
    const getAnualCommitCountMock = jest.spyOn(ghApi, 'getAnualCommitCount')

    getMonthlyCommitCountMock.mockReturnValueOnce(Promise.resolve([100]))
    getAnualCommitCountMock.mockReturnValueOnce(Promise.resolve(200))

    const result: ResponsesivenessData = await getResponsivenessData('')
    const expected: ResponsesivenessData = {
      monthlyCommitCount: [100],
      annualCommitCount: 200,
    }

    expect(result).toStrictEqual(expected)
  })
})

describe('test getGithubLinkFromNpm', () => {
  it('get github link from npm successfully', async () => {
    const data = {
      repository: {url: 'git+https://github.com/facebook/react.git'},
    }
    mockedAxios.get.mockReturnValueOnce(Promise.resolve({data}))
    const expected = 'git+https://github.com/facebook/react.git'
    const received = await getGithubLinkFromNpm(
      'https://www.npmjs.com/package/react',
    )
    expect(received).toBe(expected)
  })
})
