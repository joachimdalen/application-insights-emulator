import { IDataStore } from './IDataStore'
import Loki from 'lokijs'
import { stat } from 'fs'
import {
  IAppDependency,
  IAppMetric,
  IAppRequest,
  IAppTrace,
} from '../query/definitions'
import chalk from 'chalk'
import EventFormatter from '../EventFormatter'
import QueryParser, { LokiQueryResult } from '../query/QueryParser'
import { InvalidColumnError } from '../errors/InvalidColumnError'
import { IAppExceptions } from '../query/definitions/IAppException'

export class LokiDataStore implements IDataStore {
  private readonly db: Loki
  private readonly formatter: EventFormatter
  private readonly queryParser: QueryParser
  public constructor(public readonly path: string) {
    this.db = new Loki(path)
    this.formatter = new EventFormatter()
    this.queryParser = new QueryParser(this.db)
  }

  public async close(): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  private addTransforms(col: Collection<any>) {
    const tx: Transform[] = [
      {
        type: 'find',
        value: {
          iKey: '[%lktxp]appId',
        },
      },
    ]
    col.addTransform('ByKey', tx)
  }

  public async runQuery(query: string) {
    return await new Promise<LokiQueryResult>((resolve, reject) => {
      try {
        const result = this.queryParser.Parse(query)
        if (result) {
          //const itemResult = result.query;
          resolve(result)
          /*    if (result.selectedColumns) {
            const mapped = itemResult.map((f: any) => {
              let obj2: { [key: string]: any } = {};
              Object.keys(f).map((k) => {
                if (result.selectedColumns?.includes(k)) {
                  obj2[k] = f[k];
                }
              });
              return obj2;
            });
            resolve(mapped);
          } else {
            resolve(result?.query);
          } */
        } else {
          reject()
        }
      } catch (error) {
        if (error instanceof InvalidColumnError) {
          console.log('INVALID ERROR')
        }
        reject(error)
      }
    })
  }

  public async init(): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      stat(this.path, (statError, stats) => {
        if (!statError) {
          this.db.loadDatabase({}, (dbError) => {
            if (dbError) {
              reject(dbError)
            } else {
              console.log('Load database')
              resolve()
            }
          })
        } else {
          resolve()
        }
      })
    })

    if (this.db.getCollection('AppMetrics') === null) {
      this.db.addCollection<IAppMetric>('AppMetrics')
      this.db.addCollection('AppMetricsRaw', {
        indices: ['iKey'],
      })
    }
    if (this.db.getCollection('AppRequests') === null) {
      this.db.addCollection<IAppRequest>('AppRequests', {
        indices: ['IKey'],
      })
      this.db.addCollection('AppRequestsRaw', {
        indices: ['iKey'],
      })
    }
    if (this.db.getCollection('AppTraces') === null) {
      this.db.addCollection<IAppTrace>('AppTraces', {
        indices: ['IKey'],
      })
      this.db.addCollection('AppTracesRaw', {
        indices: ['iKey'],
      })
    }
    if (this.db.getCollection('AppDependencies') === null) {
      this.db.addCollection<IAppDependency>('AppDependencies', {
        indices: ['IKey'],
      })
      this.db.addCollection('AppDependenciesRaw', {
        indices: ['iKey'],
      })
    }

    if (this.db.getCollection('AppExceptions') === null) {
      this.db.addCollection<IAppExceptions>('AppExceptions', {
        indices: ['IKey'],
      })
      this.db.addCollection('AppExceptionsRaw', {
        indices: ['iKey'],
      })
    }

    await new Promise<void>((resolve, reject) => {
      this.db.saveDatabase((err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  public async trackEvent(event: any): Promise<void> {
    const { name } = event
    const formatted = this.formatter.formatEvent(event)
    switch (name) {
      case 'AppMetrics': {
        const metric = formatted as IAppMetric
        const col = this.db.getCollection('AppMetrics')
        col.insert(formatted)

        const colRaw = this.db.getCollection('AppMetricsRaw')
        colRaw.insert(event)

        console.log(`[${chalk.blue(name)}]: ${metric.Name} Tracked`)
        break
      }
      case 'AppRequests': {
        const request = formatted as IAppRequest
        const col = this.db.getCollection('AppRequests')
        col.insert(formatted)

        const colRaw = this.db.getCollection('AppRequestsRaw')
        colRaw.insert(event)
        console.log(
          `[${chalk.cyan(name)}]: (${chalk.green(
            request.OperationName,
          )}) - ${chalk.white(request.ResultCode)} `,
        )
        break
      }
      case 'AppTraces': {
        const trace = formatted as IAppTrace
        const col = this.db.getCollection('AppTraces')
        col.insert(formatted)

        const colRaw = this.db.getCollection('AppTracesRaw')
        colRaw.insert(event)
        console.log(
          `[${chalk.yellow(name)}]: ${chalk.yellow(
            trace.OperationName,
          )} ${chalk.yellow(trace.Type)} Tracked`,
        )
        break
      }
      case 'AppDependencies': {
        const dependency = formatted as IAppDependency
        const col = this.db.getCollection('AppDependencies')
        col.insert(formatted)

        const colRaw = this.db.getCollection('AppDependenciesRaw')
        colRaw.insert(event)
        console.log(
          `[${chalk.magentaBright(name)}]: ${dependency.Type} Tracked`,
        )
        break
      }
      case 'AppExceptions': {
        const exception = formatted as IAppExceptions
        const col = this.db.getCollection('AppExceptions')
        col.insert(formatted)

        const colRaw = this.db.getCollection('AppExceptionsRaw')
        colRaw.insert(event)
        console.log(
          `[${chalk.redBright(name)}]: ${exception.ExceptionType} Tracked`,
        )
        break
      }
    }
    this.db.save()
  }
}
