import Environment from "./Environment";
import chalk from "chalk";
import ApplicationInsightsServer from "./ApplicationInsightsServer";
import path from "path";
import { ApplicationInsightsConfiguration } from "./ApplicationInsightsConfiguration";
import { DB_NAME } from "./Constants";

function shutdown(server: ApplicationInsightsServer) {
  server.close().then(() => {
    console.log(chalk.yellow("Closed server"));
  });
}

async function main() {
  const env = new Environment();
  const location = await env.location();
  const config = new ApplicationInsightsConfiguration(
    env.port(),
    path.join(location, DB_NAME),
    env.trackAppMetrics(),
    env.trackAppTraces(),
    env.trackAppRequests()
  );
  const server = new ApplicationInsightsServer(config);

  await server.start().then(() => {
    console.log(`Server listening on port: ${chalk.blue(env.port())}`);
  });

  process
    .once("message", (msg) => {
      if (msg === "shutdown") {
        shutdown(server);
      }
    })
    .once("SIGINT", () => shutdown(server))
    .once("SIGTERM", () => shutdown(server));
}

main().catch((err) => {
  console.error(`Exit due to unhandled error: ${err.message}`);
  process.exit(1);
});
