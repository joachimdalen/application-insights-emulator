import express from "express";
import * as http from "http";
import { ApplicationInsightsConfiguration } from "./ApplicationInsightsConfiguration";
import { IDataStore } from "./datastore/IDataStore";
import { LokiDataStore } from "./datastore/LokiDataStore";

export default class ApplicationInsightsServer {
  private server: http.Server;
  private dataStore?: IDataStore;

  constructor(
    private readonly configuration: ApplicationInsightsConfiguration
  ) {
    const app = express();
    this.server = http.createServer(app);

    this.dataStore = new LokiDataStore(this.configuration.dbPath);
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
