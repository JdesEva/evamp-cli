/*
 * @Author: jdeseva
 * @Date: 2021-06-03 17:03:54
 * @LastEditors: jdeseva
 * @LastEditTime: 2021-06-03 17:14:34
 * @Description: Home
 */
const automator = require('miniprogram-automator')

describe('Home', () => {
  let miniProgram
  let page

  beforeAll(async () => {
    miniProgram = await automator.launch({
      cliPath: 'your cli path',
      projectPath: 'your project path',
    })
    page = await miniProgram.reLaunch('/pages/home/index')
    await page.waitFor(500)
  }, 30000)

  it('Home', async () => {
    const container = await page.$('.index-container')
    expect(container.tagName).toBe('view')
    expect(await container.text()).toContain('2132423')
  })

  afterAll(async () => {
    await miniProgram.close()
  })
})
