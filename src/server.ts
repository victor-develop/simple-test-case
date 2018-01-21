import * as express from 'express'
import * as request from 'request'
import * as HttpStatus from 'http-status-codes'

interface IViewData {
  thridPartyInfo: string
}

export interface IServerConfig {
  port: number
}

export const thirdPartyNotAvailableMsg = 'Failed to access third-party service.'

const view = (data: IViewData) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Foo Web</title>
      </head>
      <body>
        <h1>Welcome to Foo.<br>
          <span id='third-party-service-info'>${data.thridPartyInfo}</span>
        </h1>
      </body>
    </html>
  `
}

export class Server {
  public readonly appInstance: express.Application
  private config: IServerConfig
  private thridPartyURL: string

  constructor(thridPartyURL: string, config: IServerConfig) {
    this.appInstance = express()
    this.config = config
    this.thridPartyURL = thridPartyURL
    this.boot()
  }

  private boot() {
    this.appInstance.get('/', (req, res) => {
      request(this.thridPartyURL, { json: true }, (apierr, thridPartyResponse, thridPartyBody) => {
        if (thridPartyResponse && thridPartyResponse.statusCode == HttpStatus.NOT_FOUND) {
          const data: IViewData = {
            thridPartyInfo: thirdPartyNotAvailableMsg
          }
          res.send(view(data))
        }
        else {
          res.send(view({ thridPartyInfo: 'Logic of this part has not been coded yet.'}))
        }
      });
    })
    this.appInstance.listen(this.config.port, () => console.log(`Server running on port ${this.config.port}!`));
  }
}