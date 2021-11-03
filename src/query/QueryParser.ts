/// <reference path="../../node_modules/@kusto/language-service/Kusto.JavaScript.Client.d.ts" />
/// <reference path="../../node_modules/@kusto/language-service-next/Kusto.Language.Bridge.d.ts" />

require('@kusto/language-service-next/bridge')
require('@kusto/language-service-next/Kusto.Language.Bridge')
require('@kusto/language-service/Kusto.JavaScript.Client')

import Code = Kusto.Language
import Symbols = Kusto.Language.Symbols
interface LokiQueryResult {
  collection: string
  query: any
  selectedColumns?: string[]
}

interface HandledToken {
  token: Code.Syntax.SyntaxToken | null | undefined
  collection: Resultset<any>
  selectedColumns?: string[]
}
interface QueryPart {
  field: string
  operator: Code.Syntax.SyntaxKind
  value: string | boolean | number
}

const toArray = <T>(
  bridgeList: System.Collections.Generic.IEnumerable$1<T>,
): T[] => {
  return (Bridge as any).toArray(bridgeList)
}

class QueryParser {
  private db: LokiConstructor

  constructor(lokiInstance: LokiConstructor) {
    this.db = lokiInstance
  }

  public Parse(query: string) {
    var f = Symbols.TableSymbol.From('(a: real, b: real)')?.Columns

    if (!f) throw new Error('Failed to parse tables')

    const dd: Symbols.Symbol[] = [
      new Symbols.TableSymbol.$ctor3(
        'AppMetrics',
        this.toBridgeList([
          new Symbols.ColumnSymbol(
            'a',
            Symbols.ScalarTypes.GetSymbol('real'),
            null,
          ),
        ]),
      ),
    ]

    var globals = Code.GlobalState?.Default?.WithDatabase(
      new Symbols.DatabaseSymbol.ctor('AppInEmulator', dd),
    )

    const parsed = Code.KustoCode.ParseAndAnalyze(query, globals)
    const ii = parsed?.GetSyntaxDiagnostics()
    const jj = parsed?.GetDiagnostics()
    if (ii) {
      console.log(toArray(ii))
    }
    if (jj) console.log(toArray(jj))
    if (parsed) {
      return this.buildQuery(parsed)
    }
  }
  private toBridgeList(array: any): any {
    // copied from bridge.js from the implementation of Enumerable.prototype.toList
    return new (System.Collections.Generic.List$1(System.Object).$ctor1)(array)
  }
  public buildQuery(parsed: Code.KustoCode): LokiQueryResult {
    const parsedResult: LokiQueryResult = {
      collection: '',
      query: {},
    }
    let currToken = parsed.Syntax?.GetFirstToken()
    console.log(currToken?.Kind)
    if (
      currToken?.Kind !== Code.Syntax.SyntaxKind.IdentifierToken ||
      currToken.Text === null
    ) {
      throw new Error('Failed to find collection')
    }

    let collection = this.db.getCollection(currToken.Text).chain()
    parsedResult.collection = currToken.Text
    currToken = currToken.GetNextToken()

    let position: HandledToken = {
      token: currToken,
      collection: collection,
    }

    while (position.token !== null && position.token !== undefined) {
      console.log(position.token.Kind)
      switch (position.token.Kind) {
        case Code.Syntax.SyntaxKind.BarToken: {
          position = this.handleBarToken(position)
          break
        }
        case Code.Syntax.SyntaxKind.LimitKeyword: {
          position = this.handleLimitKeyword(position)
          break
        }
        case Code.Syntax.SyntaxKind.WhereKeyword: {
          // Get operator
          position = this.handleWhereKeyword(position)
          break
        }
        case Code.Syntax.SyntaxKind.TakeKeyword: {
          console.log('Take keyword')
          position = this.handleTakeKeyword(position)
          break
        }
        case Code.Syntax.SyntaxKind.ProjectKeyword: {
          position = this.handleProjectKeyword(position)
          break
        }
        default: {
          console.log(position.token?.Kind, 'Set to null')
          console.log(position.token?.ValueText, 'Set to null')
          position = {
            ...position,
            token: null,
          }
          throw new Error('Unsupported token used')
        }
      }
    }
    parsedResult.query = position.collection.data()
    parsedResult.selectedColumns = position.selectedColumns
    return parsedResult
  }

  private handleBarToken(position: HandledToken): HandledToken {
    return {
      ...position,
      token: position.token?.GetNextToken(),
    }
  }

  private handleProjectKeyword(position: HandledToken): HandledToken {
    let nextToken = position.token?.GetNextToken()
    const selCols: string[] = []

    while (nextToken !== null && nextToken !== undefined) {
      switch (nextToken.Kind) {
        case Code.Syntax.SyntaxKind.IdentifierToken: {
          console.log(nextToken?.Kind + ' ' + nextToken?.Kind)
          if (nextToken.ValueText) selCols.push(nextToken.ValueText)
          nextToken = nextToken.GetNextToken()
          console.log('Next token is: ' + nextToken?.Kind)
          break
        }
        case Code.Syntax.SyntaxKind.CommaToken: {
          nextToken = nextToken.GetNextToken()
          break
        }
        default: {
          console.log(position.token?.Kind, 'Set to null in Project')
          console.log(position.token?.ValueText, 'Set to null in Project')
          nextToken = null
          throw new Error('Unsupported token used')
        }
      }
    }

    console.log(selCols)
    return {
      ...position,
      selectedColumns: selCols,
      token: nextToken,
    }
  }

  private handleLimitKeyword(position: HandledToken): HandledToken {
    const nextToken = position.token?.GetNextToken()
    return {
      ...position,
      token: nextToken?.GetNextToken(),
      collection: position.collection.limit(nextToken?.Value),
    }
  }

  private handleWhereKeyword(position: HandledToken): HandledToken {
    let compareType: 'single' | 'and' | 'or' = 'single'
    const parts: QueryPart[] = []
    let col = position.collection
    //const nextToken = position.token?.GetNextToken()?.GetNextToken()
    let nextToken = position.token?.GetNextToken()
    let loop = true

    while (loop) {
      switch (nextToken?.Kind) {
        case Code.Syntax.SyntaxKind.StringLiteralToken:
        case Code.Syntax.SyntaxKind.IntLiteralToken:
        case Code.Syntax.SyntaxKind.IdentifierToken: {
          nextToken = nextToken.GetNextToken()
          break
        }
        case Code.Syntax.SyntaxKind.EqualEqualToken: {
          const field = nextToken.GetPreviousToken()?.ValueText || ''
          const valueToken = nextToken.GetNextToken()
          const value = this.parseValueToken(valueToken)

          if (value === undefined) {
            throw new Error('Failed to parse value')
          }

          parts.push({
            field,
            operator: Code.Syntax.SyntaxKind.EqualEqualToken,
            value,
          })
          console.log(parts)

          nextToken = nextToken.GetNextToken()?.GetNextToken()
          break
        }
        case Code.Syntax.SyntaxKind.OrKeyword: {
          compareType = 'or'
          nextToken = nextToken.GetNextToken()
          break
        }
        case Code.Syntax.SyntaxKind.AndKeyword: {
          compareType = 'and'
          nextToken = nextToken.GetNextToken()
          break
        }
        case Code.Syntax.SyntaxKind.BarToken: {
          loop = false
          break
        }
        default: {
          console.log(nextToken?.Kind)
          console.log(nextToken?.ValueText)
          loop = false
          break
        }
      }
    }

    const baseQuery = parts.map((p) => {
      return { [p.field || '']: p.value }
    })

    console.log(baseQuery)
    switch (compareType) {
      case 'single': {
        col = col.find(baseQuery[0])
        break
      }
      case 'or': {
        col = col.find({ $or: [...baseQuery] })
        break
      }
      case 'and': {
        col = col.find({ $and: [...baseQuery] })
        break
      }
    }

    return {
      ...position,
      token: nextToken,
      collection: col,
    }
  }
  private handleTakeKeyword(position: HandledToken): HandledToken {
    const nextToken = position.token?.GetNextToken()
    let col = position.collection

    const intParsed = parseInt(nextToken?.ValueText || '')

    if (intParsed !== NaN) {
      console.log('int parsed', intParsed)
      col = col.limit(intParsed)
    }

    return {
      ...position,
      token: nextToken?.GetNextToken(),
      collection: col,
    }
  }

  private parseValueToken(
    token: Code.Syntax.SyntaxToken | null,
  ): boolean | string | number | undefined {
    /*
        BooleanLiteralToken = 413,
        IntLiteralToken = 414,
        LongLiteralToken = 415,
        RealLiteralToken = 416,
        DecimalLiteralToken = 417,
        DateTimeLiteralToken = 418,
        TimespanLiteralToken = 419,
        GuidLiteralToken = 420,
        StringLiteralToken = 421,
    */
    if (token === null || !token.ValueText) {
      return undefined
    }
    console.log('Parsing value kind ' + token.Kind)

    switch (token.Kind) {
      case Code.Syntax.SyntaxKind.BooleanLiteralToken: {
        return JSON.parse(token.ValueText)
      }
      case Code.Syntax.SyntaxKind.IntLiteralToken:
      case Code.Syntax.SyntaxKind.LongLiteralToken: {
        return parseInt(token.ValueText)
      }
      default:
        console.warn('Unhandled value type: ' + token.Kind)
        return token.ValueText
    }
  }
}

export default QueryParser
