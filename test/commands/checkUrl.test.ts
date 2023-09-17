import {expect, test} from '@oclif/test'

describe('check_url', () => {
  test
    .stdout()
    .command(['check_url'])
    .it('runs hello', (ctx) => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['check_url', '--name', 'jeff'])
    .it('runs hello --name jeff', (ctx) => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})
