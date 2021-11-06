import { QueryUtils } from "../QueryUtils";
import Symbols = Kusto.Language.Symbols;

interface DefinitionColumn {
  name: string;
  type: string;
  description?: string;
}
interface DefinitionSchema {
  tableName: string;
  columns: DefinitionColumn[];
}
class DefinitionGenerator {
  private static generateColumn(col: DefinitionColumn) {
    return new Symbols.ColumnSymbol(
      col.name,
      Symbols.ScalarTypes.GetSymbol(col.type),
      null
    );
  }
  public static generateTable(definition: DefinitionSchema) {
    const cols = definition.columns.map((colDef) =>
      this.generateColumn(colDef)
    );
    return new Symbols.TableSymbol.$ctor3(
      definition.tableName,
      QueryUtils.toBridgeList(cols)
    );
  }
}
export { DefinitionColumn, DefinitionSchema, DefinitionGenerator };
