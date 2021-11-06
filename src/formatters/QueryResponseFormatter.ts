import {
  appDependencies,
  appExceptions,
  appMetrics,
  appRequests,
  appTraces,
} from '../query/definitions/TableDefinitions'
import { LokiQueryResult } from '../query/QueryParser'

export default class QueryResponseFormatter {
  public format(result: LokiQueryResult): Result {
    const type = result?.query && result.query[0].Type
    const schema = this.getSchemaForType(type)

    const item: {
      name: string
      type: string
    }[] = (result.selectedColumns !== undefined &&
    result.selectedColumns.length > 1
      ? schema.columns.filter((x) => result.selectedColumns?.includes(x.name))
      : schema.columns
    ).map((c) => {
      return {
        name: c.name,
        type: c.type,
      }
    })
    const values: any[][] = result.query.map(
      (res: { [key: string]: string }) => {
        const rows: any[] = []
        item.map((k) => {
          if (k?.type === 'dynamic') {
            rows.push(JSON.stringify(res[k.name]))
          } else rows.push(res[k.name])
        })
        return rows
      },
    )
    const res: Result = this.createResponse(item, values)
    return res
  }

  private createResponse(columns: any, rows: any): Result {
    return {
      tables: [
        {
          name: 'PrimaryResult',
          columns,
          rows,
        },
      ],
    }
  }

  private getSchemaForType(type: string) {
    switch (type) {
      case 'AppMetrics':
        return appMetrics
      case 'AppRequests':
        return appRequests
      case 'AppDependencies':
        return appDependencies
      case 'AppTraces':
        return appTraces
      case 'AppExceptions':
        return appExceptions;
      default: {
        throw new Error('Unsupported type ' + type)
      }
    }
  }
}

interface Result {
  tables: {
    name: string
    columns: {
      name: string
      type: string
    }[]
    rows: any[][]
  }[]
}
