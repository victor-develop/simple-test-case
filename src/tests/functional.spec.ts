import { assert } from 'chai'
import * as supertest from 'supertest'
import * as cheerio from 'cheerio'
import { Server, thirdPartyNotAvailableMsg } from '../server'
import * as nock from 'nock'
import * as HttpStatus from 'http-status-codes'

describe('Server', () => {

  const testPort = 8888

  describe('Third Party api returns a 404 error to Server\'s request',() => {
    it('shows service unavailable message on web page', (done) => {
      const thridPartyURL = 'http://test.thirdparty.com/api'
      const mock3rdPartyService = nock(thridPartyURL).get('').reply(HttpStatus.NOT_FOUND)
      const server = new Server(thridPartyURL, { port: testPort })
      supertest(server.appInstance)
      .get('/')
      // 3rd Party Service is down,but the application web page should be successfully accessed
      .expect(HttpStatus.OK)
      .expect((res) => {
        const dom = cheerio.load(res.text)
        assert.equal(dom('#third-party-service-info').text(), thirdPartyNotAvailableMsg)
      })
      .end((err, res) => {
        done(err)
      })
    })
  })
})