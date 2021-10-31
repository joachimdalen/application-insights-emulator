/// <reference path="../../node_modules/@kusto/language-service/Kusto.JavaScript.Client.d.ts" />
/// <reference path="../../node_modules/@kusto/language-service-next/Kusto.Language.Bridge.d.ts" />

require("@kusto/language-service-next/bridge");
require("@kusto/language-service-next/Kusto.Language.Bridge");
require("@kusto/language-service/Kusto.JavaScript.Client");

import KustoCode = Kusto.Language.KustoCode;

interface Position {
  collection: string;
}

export default class QueryParser {
  public parse(query: string) {
    const parsed = KustoCode.Parse(query);
    console.log(parsed?.GetLexicalTokens());
  }

  private buildLokiQuery(parsed: KustoCode) {
    const nextToken = parsed.Syntax?.GetFirstToken();
  }
}
