import Environment from "../src/Environment";
import { expect } from "chai";

describe("Environment", () => {
  it("should parse all", async () => {
    process.argv = [
      "--dummy",
      "yes",
      "--location",
      "/home/dir",
      "--port",
      "1515",
      "--silent",
      "--noMetrics",
      "--noTraces",
      "--noRequests",
    ];
    const env = new Environment();
    const location = await env.location();

    expect(location).to.eq("/home/dir");
    expect(env.silent()).to.be.true;
    expect(env.trackAppMetrics()).to.be.false;
    expect(env.trackAppTraces()).to.be.false;
    expect(env.trackAppRequests()).to.be.false;
    expect(env.port()).to.eq(1515);
  });
  it("should enable when not disabled", async () => {
    process.argv = [
      "--dummy",
      "yes",
      "--location",
      "/home/dir",
      "--port",
      "1515",
    ];
    const env = new Environment();
    const location = await env.location();

    expect(location).to.eq("/home/dir");
    expect(env.silent()).to.be.false;
    expect(env.trackAppMetrics()).to.be.true;
    expect(env.trackAppTraces()).to.be.true;
    expect(env.trackAppRequests()).to.be.true;
    expect(env.port()).to.eq(1515);
  });
});
