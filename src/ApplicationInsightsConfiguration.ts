import { DEFAULT_PORT } from "./Constants";

export class ApplicationInsightsConfiguration {
  constructor(
    public port: number = DEFAULT_PORT,
    public readonly dbPath: string
  ) {}
}
