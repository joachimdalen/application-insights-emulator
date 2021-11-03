export default class QueryResponseFormatter {
  public format(result: any[]): Result {
    const item: {
      name: string
      type: string
    }[] = Object.keys(result[0]).map((k) => {
      return {
        name: k,
        type: 'string',
      }
    })
    const values: any[][] = result.map((res) => Object.values(res))
    const res: Result = this.createResponse(item, values)
    return res
  }

  private createResponse(columns: any, rows: any): Result {
    return {
      headers: {
        'x-ms-request-id': 'todo',
        'x-ms-correlation-request-id': 'todo',
      },
      body: {
        tables: [
          {
            name: 'PrimaryResult',
            columns,
            rows,
          },
        ],
      },
    }
  }
}

interface Result {
  headers: { [key: string]: any }
  body: {
    tables: {
      name: string
      columns: {
        name: string
        type: string
      }[]
      rows: any[][]
    }[]
  }
}
