import EventFormatter from "../src/EventFormatter";
import { expect } from "chai";

const testObj = {
  name: "AppRequests",
  time: "2021-10-30T07:27:16.0073104Z",
  iKey: "b03685a6-299b-4b7f-a23c-b398fcbddd69",
  tags: {
    "ai.cloud.roleInstance": "dev-desktop.(none)",
    "ai.operation.id": "d3fb79de48afde42a86a43b7d91d98ae",
    "ai.operation.name": "VersionedHttpTrigger",
    "ai.location.ip": "127.0.0.1",
    "ai.internal.sdkVersion": "azurefunctions: 3.1.4.0",
  },
  data: {
    baseType: "RequestData",
    baseData: {
      ver: 2,
      id: "233e461d5732db40",
      name: "VersionedHttpTrigger",
      duration: "00:00:00.1301893",
      success: true,
      responseCode: "400",
      url: "http://localhost:7071/api/version",
      properties: {
        HttpMethod: "GET",
        LogLevel: "Information",
        InvocationId: "ee8eb64f-eea9-4223-a081-927bacc9ce6c",
        HostInstanceId: "a3fa3d9d-508b-4a2a-ba22-e178478f84ae",
        Category: "Host.Results",
        HttpPath: "/api/version",
        FunctionExecutionTimeMs: "84.9854",
        FullName: "VersionedHttpTrigger",
        ProcessId: "46677",
        TriggerReason:
          "This function was programmatically called via the host APIs.",
      },
    },
  },
};

describe("EventFormatter", () => {
  describe("#Tags", () => {
    it("should strip and rename tags", () => {
      const ef = new EventFormatter();
      const formatted = ef.formatEvent(testObj);
      console.log(JSON.stringify(formatted, null,2))
      expect(formatted).to.have.property("AppRoleInstance");
      expect(formatted).to.have.property("OperationId");
      expect(formatted).to.have.property("OperationName");
      expect(formatted).to.have.property("ClientIP");
      expect(formatted).to.have.property("SdkVersion");
    });
  });
  describe("#Properties", () => {
    it("should rename properties to Properties", () => {
      const ef = new EventFormatter();
      const formatted = ef.formatEvent(testObj);
      expect(formatted).to.have.property("Properties");
    });
    it("should keep original properties in Properties", () => {
      const ef = new EventFormatter();
      const formatted = ef.formatEvent(testObj);
      expect(formatted.Properties).to.eql({
        HttpMethod: "GET",
        LogLevel: "Information",
        InvocationId: "ee8eb64f-eea9-4223-a081-927bacc9ce6c",
        HostInstanceId: "a3fa3d9d-508b-4a2a-ba22-e178478f84ae",
        Category: "Host.Results",
        HttpPath: "/api/version",
        FunctionExecutionTimeMs: "84.9854",
        FullName: "VersionedHttpTrigger",
        ProcessId: "46677",
        TriggerReason:
          "This function was programmatically called via the host APIs.",
      });
    });
  });
  describe("#Root", () => {
    it("should rename type", () => {
      const ef = new EventFormatter();
      const formatted = ef.formatEvent(testObj);
      expect(formatted.EventType).to.equal("AppRequests");
    });
    it("should rename responseCode", () => {
      const ef = new EventFormatter();
      const formatted = ef.formatEvent(testObj);
      expect(formatted.ResultCode).to.equal("400");
    });
  });
});
