import { Request, Response } from "express";
import { ApplicationInsightsConfiguration } from "../ApplicationInsightsConfiguration";
import { IDataStore } from "../datastore/IDataStore";
import { IQueryHandler } from "./IQueryHandler";
import { AnalyticsQueryPayload } from "./payloads/AnalyticsQueryPayload";
interface AppIdParams {
  appId: string;
}

class QueryHandler implements IQueryHandler {
  private dataStore: IDataStore;
  constructor(
    dataStore: IDataStore,
    private readonly configuration: ApplicationInsightsConfiguration
  ) {
    this.dataStore = dataStore;

    if (dataStore === undefined) {
      throw new Error("Failed");
    }
  }

  public async handleRequest(
    req: Request<AppIdParams, any, AnalyticsQueryPayload>,
    res: Response
  ) {
    try {
      const params = req.params;
      const result = await this.dataStore.runQuery(params.appId);
      res.json(result).status(200).end();
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  }
}
export default QueryHandler;
