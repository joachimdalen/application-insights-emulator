import { Request, Response } from 'express'
import { EOL } from 'os'
import { unzip } from 'zlib'
import { ApplicationInsightsConfiguration } from '../ApplicationInsightsConfiguration'
import { IDataStore } from '../datastore/IDataStore'
import { IQueryHandler } from './IQueryHandler'
class TrackHandler implements IQueryHandler {
  private dataStore: IDataStore
  constructor(
    dataStore: IDataStore,
    private readonly configuration: ApplicationInsightsConfiguration,
  ) {
    this.dataStore = dataStore

    if (dataStore === undefined) {
      throw new Error('Failed')
    }
  }

  async handleRequest(req: Request, res: Response) {
    const body: Uint8Array[] = []
    req.on('data', (data) => {
      body.push(data)
    })
    req.on('end', async () => {
      unzip(Buffer.concat(body), async (err, buffer) => {
        if (err) {
          console.error(err)
        } else {
          const lines = buffer.toString().split(EOL)
          for (const event of lines) {
            const jsonEvent = JSON.parse(event)
            const { name } = jsonEvent
            switch (name) {
              case 'AppMetrics': {
                if (this.configuration.appMetrics) {
                  this.dataStore.trackEvent(jsonEvent)
                }
                break
              }
              case 'AppRequests': {
                if (this.configuration.appRequests) {
                  this.dataStore.trackEvent(jsonEvent)
                }
                break
              }
              case 'AppTraces': {
                if (this.configuration.appTraces) {
                  this.dataStore.trackEvent(jsonEvent)
                }
                break
              }
            }
          }
        }
      })

      res.status(200).end()
    })
  }
}
export default TrackHandler
