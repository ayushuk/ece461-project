import {test} from '@oclif/test'
import {jest, expect} from '@jest/globals'

describe('check_url', () => {
  it('should return scores in NDJSON format', async () => {
    const { assignMetrics } = require('../src/fill-models')
    const { Urlmetrics } = require('../src/url-models')
    const metrics = new Urlmetrics('https://github.com/user/repo')
    metrics.BusFactor = 0.5
    metrics.Correctness = 0.4
    metrics.RampUp = 0.3
    metrics.Responsiveness = 0.2
    metrics.License = 1
    metrics.NetScore = 0.6
    assignMetrics.mockReturnValue(metrics)

    expect(stdout).toContain('{"URL": "https://github.com/user/repo", "NET_SCORE": 0.6, "RAMP_UP_SCORE":0.3, "CORRECTNESS_SCORE":0.4, "BUS_FACTOR_SCORE":0.5, "RESPONSIVE_MAINTAINER_SCORE":0.2, "LICENSE_SCORE":1}')
  })

  test
    .stdout()
    .command(['check_url', '--name', 'jeff'])
    .it('runs hello --name jeff', (ctx) => {
      expect(ctx.stdout).to.contain('hello jeff')
    })

  test
    .stdout()
    .command([''])
    .it('runs check_url without passing in a URL', (ctx) => {
      expect(ctx.stdout).to.contain('')
  })
})