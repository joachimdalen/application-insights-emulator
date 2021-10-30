interface IAppInEvent {}
type DynamicObject = { [key: string]: any };

class EventFormatter {
  private _mapping: {
    [key: string]: string | ((value: DynamicObject) => object);
  } = {
    time: "timestamp",
    responseCode: "resultCode",
    tags: this.formatTags,
    properties: this.formatProperties,
  };

  public formatEvent() {
    this.formatTags();
    this.formatProperties();
  }

  private formatTags() {
    const tags: DynamicObject = {
      "ai.cloud.roleInstance": "dev-desktop.(none)",
      "ai.operation.id": "d3fb79de48afde42a86a43b7d91d98ae",
      "ai.operation.parentId": "233e461d5732db40",
      "ai.operation.name": "VersionedHttpTrigger",
      "ai.location.ip": "127.0.0.1",
      "ai.internal.sdkVersion": "azurefunctionscoretools: 3.0.3734",
    };

    const parsed: DynamicObject = {};

    Object.keys(tags).map((key: string) => {
      const val: any = tags[key];
      const keyParts = key
        .replace("ai.", "")
        .replace("internal.", "")
        .split(".");

      const newKey =
        keyParts.length > 1
          ? `${keyParts[0]}_${
              keyParts[1].charAt(0).toUpperCase() + keyParts[1].slice(1)
            }`
          : keyParts[0];
      parsed[newKey] = val;
    });
    console.log(parsed);
    return parsed;
  }

  private formatProperties() {
    const properties: DynamicObject = {
      LogLevel: "Information",
      prop__invocationId: "ee8eb64f-eea9-4223-a081-927bacc9ce6c",
      InvocationId: "ee8eb64f-eea9-4223-a081-927bacc9ce6c",
      HostInstanceId: "a3fa3d9d-508b-4a2a-ba22-e178478f84ae",
      Category: "Function.VersionedHttpTrigger",
      prop__reason:
        "This function was programmatically called via the host APIs.",
      prop__functionName: "VersionedHttpTrigger",
      EventName: "FunctionStarted",
      ProcessId: "46677",
      "prop__{OriginalFormat}":
        "Executing '{functionName}' (Reason='{reason}', Id={invocationId})",
      EventId: "1",
    };

    const parsed: DynamicObject = {};

    Object.keys(properties).map((key: string) => {
      const val: any = properties[key];
      const newKey = `customDimensions.${key}`;
      parsed[newKey] = val;
    });
    console.log(parsed);
    return parsed;
  }
}

new EventFormatter().formatEvent();
