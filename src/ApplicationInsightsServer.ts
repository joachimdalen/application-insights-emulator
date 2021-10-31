import express from "express";
import * as http from "http";
import { ApplicationInsightsConfiguration } from "./ApplicationInsightsConfiguration";
import { EXECUTE_QUERY_ENDPOINT, TRACK_ENDPOINT } from "./Constants";
import { IDataStore } from "./datastore/IDataStore";
import { LokiDataStore } from "./datastore/LokiDataStore";
import QueryHandler from "./handlers/QueryHandler";
import TrackHandler from "./handlers/TrackHandler";

export default class ApplicationInsightsServer {
  private server: http.Server;
  private dataStore: IDataStore;

  constructor(
    private readonly configuration: ApplicationInsightsConfiguration
  ) {
    const dataStore = new LokiDataStore(this.configuration.dbPath);
    const trackHandler = new TrackHandler(dataStore, this.configuration);
    const queryHandler = new QueryHandler(dataStore, this.configuration);
    const app = express();
    app.post(TRACK_ENDPOINT, (req, res) =>
      trackHandler.handleRequest(req, res)
    );
    app.get(EXECUTE_QUERY_ENDPOINT, (req: any, res: express.Response) =>
      queryHandler.handleRequest(req, res)
    );
    this.server = http.createServer(app);
    this.dataStore = dataStore;
  }

  public async close(): Promise<void> {
    this.server.removeAllListeners("request");

    await new Promise((resolve) => {
      this.server.close(resolve);
    });
  }
  async beforeStart() {
    if (this.dataStore !== undefined) {
      await this.dataStore.init();
    }
  }

  async start() {
    await this.beforeStart();
    await new Promise<void>((resolve, reject) => {
      const port = this.configuration.port;
      this.server.listen(port, resolve).on("error", reject);
    });
  }
}
