import args from "args";
import { DEFAULT_PORT } from "./Constants";

args
  .option(["", "port"], "Optional. The port to listen on", DEFAULT_PORT)
  .option(
    ["l", "location"],
    "Optional. Location to store datbase files, default is current working directory",
    process.cwd()
  )
  .option(["s", "silent"], "Optional. Disable logging to onsole");

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
}
