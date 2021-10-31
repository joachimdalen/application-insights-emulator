import args from "args";
import { DEFAULT_PORT } from "./Constants";

args
  .option(["p", "port"], "Optional. The port to listen on", DEFAULT_PORT)
  .option(
    ["l", "location"],
    "Optional. Location to store datbase files, default is current working directory",
    process.cwd()
  )
  .option(["s", "silent"], "Optional. Disable logging to onsole")
  .option(["", "noMetrics"], "Track app metrics")
  .option(["", "noTraces"], "Track app traces")
  .option(["", "noRequests"], "Track app requests");

export default class Environment {
  private flags = args.parse(process.argv);

  public port(): number | undefined {
    return this.flags.port;
  }

  public async location(): Promise<string> {
    return this.flags.location || process.cwd();
  }

  public silent(): boolean {
    if (this.flags.silent !== undefined) {
      return true;
    }
    return false;
  }
  public trackAppMetrics(): boolean {
    if (this.flags.noMetrics !== undefined) {
      return false;
    }
    return true;
  }
  public trackAppTraces(): boolean {
    if (this.flags.noTraces !== undefined) {
      return false;
    }
    return true;
  }
  public trackAppRequests(): boolean {
    if (this.flags.noRequests !== undefined) {
      return false;
    }
    return true;
  }
}
