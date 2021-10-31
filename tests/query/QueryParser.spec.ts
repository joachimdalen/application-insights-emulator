import { expect } from "chai";
import QueryParser from "../../src/query/QueryParser";

describe("QueryParser", () => {
  it("should parse", () => {
    const qp = new QueryParser();
    qp.parse("AppMetrics | take 10");
  });
});
