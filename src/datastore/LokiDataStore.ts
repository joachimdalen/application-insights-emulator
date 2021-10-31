import { IDataStore } from "./IDataStore";
import Loki from "lokijs";
import { stat } from "fs";
import { IAppMetric, IAppRequest, IAppTrace } from "../types";
import chalk from "chalk";
import EventFormatter from "../EventFormatter";

export class LokiDataStore implements IDataStore {
  private readonly db: Loki;
  private readonly formatter: EventFormatter;
  public constructor(public readonly path: string) {
    this.db = new Loki(path);
    this.formatter = new EventFormatter();
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

  private addTransforms(col: Collection<any>) {
    const tx: Transform[] = [
      {
        type: "find",
        value: {
          iKey: "[%lktxp]appId",
        },
      },
    ];
    col.addTransform("ByKey", tx);
  }

  public async runQuery(appId: string) {
    return await new Promise<any>((resolve, reject) => {
      const col = this.db.getCollection("AppMetrics");
      // const tx = col.getTransform("ByKey");
      // console.log(tx);
      // if (tx === undefined) {
      //
      // }
      console.log(appId);
      //this.addTransforms(col);
      const result = col
        .chain()
        .find({ iKey: { $eq: appId } })
        //.find({ cloud_RoleInstance: "dev-desktop.(none)" })
        .limit(10)
        .data();
      console.log(result);
      resolve(result);
      // try {

      // } catch (error) {
      //   reject(error);
      // }
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
              console.log("Load database");
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
      this.db.addCollection("AppMetrics");
      this.db.addCollection("AppMetricsRaw", {
        indices: ["iKey"],
      });
    }
    if (this.db.getCollection("AppRequests") === null) {
      this.db.addCollection("AppRequests", {
        indices: ["iKey"],
      });
      this.db.addCollection("AppRequestsRaw", {
        indices: ["iKey"],
      });
    }
    if (this.db.getCollection("AppTraces") === null) {
      this.db.addCollection("AppTraces", {
        indices: ["iKey"],
      });
      this.db.addCollection("AppTracesRaw", {
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
    const formatted = this.formatter.formatEvent(event);
    switch (name) {
      case "AppMetrics": {
        const metric = event as IAppMetric;
        const col = this.db.getCollection("AppMetrics");
        col.insert(formatted);

        const colRaw = this.db.getCollection("AppMetricsRaw");
        colRaw.insert(metric);

        console.log(`[${chalk.blue(name)}]: Tracked`);
        break;
      }
      case "AppRequests": {
        const request = event as IAppRequest;
        const col = this.db.getCollection("AppRequests");
        col.insert(formatted);

        const colRaw = this.db.getCollection("AppRequestsRaw");
        colRaw.insert(request);
        console.log(
          `[${chalk.cyan(name)}]: (${chalk.green(
            request.data.baseData.name
          )}) - ${chalk.white(request.data.baseData.responseCode)} `
        );
        break;
      }
      case "AppTraces": {
        const trace = event as IAppTrace;
        const col = this.db.getCollection("AppTraces");
        col.insert(formatted);

        const colRaw = this.db.getCollection("AppTracesRaw");
        colRaw.insert(trace);
        console.log(`[${chalk.yellow(name)}]: Tracked`);
        break;
      }
    }
    this.db.save();
  }
}
