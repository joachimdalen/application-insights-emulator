import { IDataStore } from "./IDataStore";
import Loki from "lokijs";
import { stat } from "fs";
import { IAppMetric, IAppRequest, IAppTrace } from "../types";
import chalk from "chalk";

export class LokiDataStore implements IDataStore {
  private readonly db: Loki;
  public constructor(public readonly path: string) {
    this.db = new Loki(path);
  }

  public async close(): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  public async init(): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      stat(this.path, (statError, stats) => {
        if (!statError) {
          this.db.loadDatabase({}, (dbError) => {
            if (dbError) {
              reject(dbError);
            } else {
              resolve();
            }
          });
        } else {
          // when DB file doesn't exist, ignore the error because following will re-create the file
          resolve();
        }
      });
    });

    if (this.db.getCollection("AppMetrics") === null) {
      this.db.addCollection<IAppMetric>("AppMetrics", {
        indices: ["iKey"],
      });
    }
    if (this.db.getCollection("AppRequests") === null) {
      this.db.addCollection<IAppRequest>("AppRequests", {
        indices: ["iKey"],
      });
    }
    if (this.db.getCollection("AppTraces") === null) {
      this.db.addCollection<IAppTrace>("AppTraces", {
        indices: ["iKey"],
      });
    }

    await new Promise<void>((resolve, reject) => {
      this.db.saveDatabase((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  public async trackEvent(event: any): Promise<void> {
    const { name } = event;
    switch (name) {
      case "AppMetrics": {
        const metric = event as IAppMetric;
        const col = this.db.getCollection<IAppMetric>("AppMetrics");
        col.insert(metric);
        console.log(`[${chalk.blue(name)}]: Tracked`);
        break;
      }
      case "AppRequests": {
        const request = event as IAppRequest;
        const col = this.db.getCollection<IAppRequest>("AppRequests");
        col.insert(request);
        console.log(
          `[${chalk.cyan(name)}]: (${chalk.green(
            request.data.baseData.name
          )}) - ${chalk.white(request.data.baseData.responseCode)} `
        );
        break;
      }
      case "AppTraces": {
        const trace = event as IAppTrace;
        const col = this.db.getCollection<IAppTrace>("AppTraces");
        col.insert(trace);
        console.log(`[${chalk.yellow(name)}]: Tracked`);
        break;
      }
    }
    this.db.save();
  }
}
