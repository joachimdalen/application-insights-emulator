import { DEFAULT_PORT } from "./Constants";

export class ApplicationInsightsConfiguration {
  constructor(
    public port: number = DEFAULT_PORT,
    public readonly dbPath: string,
    public readonly appMetrics: boolean,
    public readonly appTraces: boolean,
    public readonly appRequests: boolean
  ) {}
}
