const puppeteer = require('puppeteer')
const {exec} = require('child_process')

describe('using puppeteer', () => {
  let process = null
  beforeAll(() => {
    console.log('beforeall')
    process = exec('node app.js')
  })

  afterAll(() => {
    console.log('afterall')
    process.kill('SIGINT')
  })

  it('will render', async (done) => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('http://localhost:3000')

    const h1Text = await page.$eval('h1', (e) => e.innerHTML)

    expect(h1Text).toBe('Testing')

    console.log(h1Text)

    await browser.close()
    done()
  })
})
