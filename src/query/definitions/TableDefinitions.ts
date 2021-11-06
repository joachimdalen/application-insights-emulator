import { DefinitionSchema } from "./DefinitionGenerator";

const appSystemEvents: DefinitionSchema = {
  tableName: "AppSystemEvents",
  columns: [
    { name: "EventType", type: "string", description: "Event type" },
    {
      name: "Measurements",
      type: "dynamic",
      description: "Event measurements.",
    },
    { name: "Name", type: "string", description: "Event name" },
    { name: "Properties", type: "dynamic", description: "Event properties." },
    {
      name: "_ResourceId",
      type: "string",
      description:
        "A unique identifier for the resource that the record is associated with",
    },
    { name: "SourceSystem", type: "string" },
    {
      name: "_SubscriptionId",
      type: "string",
      description:
        "A unique identifier for the subscription that the record is associated with",
    },
    { name: "TenantId", type: "string" },
    {
      name: "TimeGenerated",
      type: "datetime",
      description: "Date and time when the system event was recorded.",
    },
    { name: "Type", type: "string", description: "The name of the table" },
  ],
};
const appExceptions: DefinitionSchema = {
  tableName: "AppExceptions",
  columns: [
    {
      name: "AppRoleInstance",
      type: "string",
      description: "Role instance of the application.",
    },
    {
      name: "AppRoleName",
      type: "string",
      description: "Role name of the application.",
    },
    {
      name: "AppVersion",
      type: "string",
      description: "Version of the application.",
    },
    {
      name: "Assembly",
      type: "string",
      description: "Exception assembly.",
    },
    {
      name: "ClientBrowser",
      type: "string",
      description: "Browser running on the client device.",
    },
    {
      name: "ClientCity",
      type: "string",
      description: "City where the client device is located.",
    },
    {
      name: "ClientCountryOrRegion",
      type: "string",
      description: "Country or region where the client device is located.",
    },
    {
      name: "ClientIP",
      type: "string",
      description: "IP address of the client device.",
    },
    {
      name: "ClientModel",
      type: "string",
      description: "Model of the client device.",
    },
    {
      name: "ClientOS",
      type: "string",
      description: "Operating system of the client device.",
    },
    {
      name: "ClientStateOrProvince",
      type: "string",
      description: "State or province where the client device is located.",
    },
    {
      name: "ClientType",
      type: "string",
      description: "Type of the client device.",
    },
    {
      name: "Details",
      type: "dynamic",
      description: "Details of the exception.",
    },
    {
      name: "ExceptionType",
      type: "string",
      description: "Type of exception.",
    },
    {
      name: "HandledAt",
      type: "string",
      description: "Where the exception was seen.",
    },
    {
      name: "IKey",
      type: "string",
      description: "Instrumentation key of the Azure resource.",
    },
    {
      name: "InnermostAssembly",
      type: "string",
      description: "Assembly of the innermost exception.",
    },
    {
      name: "InnermostMessage",
      type: "string",
      description: "Message of the innermost exception.",
    },
    {
      name: "InnermostMethod",
      type: "string",
      description: "Method of the innermost exception.",
    },
    {
      name: "InnermostType",
      type: "string",
      description: "Type of the innermost exception.",
    },
    {
      name: "ItemCount",
      type: "int",
      description:
        "Number of telemetry items represented by a single sample item.",
    },
    {
      name: "Measurements",
      type: "dynamic",
      description: "Application-defined measurements.",
    },
    { name: "Message", type: "string", description: "Exception message." },
    { name: "Method", type: "string", description: "Exception method." },
    {
      name: "OperationId",
      type: "string",
      description: "Application-defined operation ID.",
    },
    {
      name: "OperationName",
      type: "string",
      description:
        "Application-defined name of the overall operation. The OperationName values typically match the Name values for AppRequests.",
    },
    {
      name: "OuterAssembly",
      type: "string",
      description: "Assembly of the outer exception.",
    },
    {
      name: "OuterMessage",
      type: "string",
      description: "Message of the outer exception.",
    },
    {
      name: "OuterMethod",
      type: "string",
      description: "Method of the outer exception.",
    },
    {
      name: "OuterType",
      type: "string",
      description: "Type of the outer exception.",
    },
    {
      name: "ParentId",
      type: "string",
      description: "ID of the parent operation.",
    },
    {
      name: "ProblemId",
      type: "string",
      description: "Problem ID of the exception.",
    },
    {
      name: "Properties",
      type: "dynamic",
      description: "Application-defined properties.",
    },
    {
      name: "ResourceGUID",
      type: "string",
      description: "Unique, persistent identifier of an Azure resource.",
    },
    {
      name: "_ResourceId",
      type: "string",
      description:
        "A unique identifier for the resource that the record is associated with",
    },
    {
      name: "SDKVersion",
      type: "string",
      description:
        "Version of the SDK used by the application to generate this telemetry item.",
    },
    {
      name: "SessionId",
      type: "string",
      description: "Application-defined session ID.",
    },
    {
      name: "SeverityLevel",
      type: "int",
      description: "Severity level of the exception.",
    },
    { name: "SourceSystem", type: "string" },
    {
      name: "_SubscriptionId",
      type: "string",
      description:
        "A unique identifier for the subscription that the record is associated with",
    },
    {
      name: "SyntheticSource",
      type: "string",
      description: "Synthetic source of the operation.",
    },
    { name: "TenantId", type: "string" },
    {
      name: "TimeGenerated",
      type: "datetime",
      description: "Date and time when request was recorded.",
    },
    { name: "Type", type: "string", description: "The name of the table" },
    {
      name: "UserAccountId",
      type: "string",
      description: "Application-defined account associated with the user.",
    },
    {
      name: "UserAuthenticatedId",
      type: "string",
      description:
        "Persistent string that uniquely represents each authenticated user in the application.",
    },
    {
      name: "UserId",
      type: "string",
      description: "Anonymous ID of a user accessing the application.",
    },
  ],
};
const appDependencies: DefinitionSchema = {
  tableName: "AppDependencies",
  columns: [
    {
      name: "AppRoleInstance",
      type: "string",
      description: "Role instance of the application.",
    },
    {
      name: "AppRoleName",
      type: "string",
      description: "Role name of the application.",
    },
    {
      name: "AppVersion",
      type: "string",
      description: "Version of the application.",
    },
    {
      name: "ClientBrowser",
      type: "string",
      description: "Browser running on the client device.",
    },
    {
      name: "ClientCity",
      type: "string",
      description: "City where the client device is located.",
    },
    {
      name: "ClientCountryOrRegion",
      type: "string",
      description: "Country or region where the client device is located.",
    },
    {
      name: "ClientIP",
      type: "string",
      description: "IP address of the client device.",
    },
    {
      name: "ClientModel",
      type: "string",
      description: "Model of the client device.",
    },
    {
      name: "ClientOS",
      type: "string",
      description: "Operating system of the client device.",
    },
    {
      name: "ClientStateOrProvince",
      type: "string",
      description: "State or province where the client device is located.",
    },
    {
      name: "ClientType",
      type: "string",
      description: "Type of the client device.",
    },
    {
      name: "Data",
      type: "string",
      description:
        "Detailed information about the dependency call, such as a full URI or a SQL statement.",
    },
    {
      name: "DependencyType",
      type: "string",
      description: "Dependency type, such as HTTP or SQL.",
    },
    {
      name: "DurationMs",
      type: "real",
      description:
        "Number of milliseconds the dependency call took to complete.",
    },
    {
      name: "Id",
      type: "string",
      description: "Application-generated, unique ID of the dependency call.",
    },
    {
      name: "IKey",
      type: "string",
      description: "Instrumentation key of the Azure resource.",
    },
    {
      name: "ItemCount",
      type: "int",
      description:
        "Number of telemetry items represented by a single sample item.",
    },
    {
      name: "Measurements",
      type: "dynamic",
      description: "Application-defined measurements.",
    },
    {
      name: "Name",
      type: "string",
      description:
        "Dependency name, such as an URI query without parameters or a SQL server table name.",
    },
    {
      name: "OperationId",
      type: "string",
      description: "Application-defined operation ID.",
    },
    {
      name: "OperationName",
      type: "string",
      description:
        "Application-defined name of the overall operation. The OperationName values typically match the Name values for AppRequests.",
    },
    {
      name: "ParentId",
      type: "string",
      description: "ID of the parent operation.",
    },
    {
      name: "Properties",
      type: "dynamic",
      description: "Application-defined properties.",
    },
    {
      name: "ReferencedItemId",
      type: "string",
      description:
        "Id of the item with additional details about the dependency call.",
    },
    {
      name: "ReferencedType",
      type: "string",
      description:
        "Name of the table with additional details about the dependency call.",
    },
    {
      name: "ResourceGUID",
      type: "string",
      description: "Unique, persistent identifier of an Azure resource.",
    },
    {
      name: "_ResourceId",
      type: "string",
      description:
        "A unique identifier for the resource that the record is associated with",
    },
    {
      name: "ResultCode",
      type: "string",
      description:
        "Result code returned to the application by the dependency call.",
    },
    {
      name: "SDKVersion",
      type: "string",
      description:
        "Version of the SDK used by the application to generate this telemetry item.",
    },
    {
      name: "SessionId",
      type: "string",
      description: "Application-defined session ID.",
    },
    { name: "SourceSystem", type: "string" },
    {
      name: "_SubscriptionId",
      type: "string",
      description:
        "A unique identifier for the subscription that the record is associated with",
    },
    {
      name: "Success",
      type: "bool",
      description:
        "Indicates whether the dependency call completed successfully.",
    },
    {
      name: "SyntheticSource",
      type: "string",
      description: "Synthetic source of the operation.",
    },
    {
      name: "Target",
      type: "string",
      description:
        "Target of a dependency call, such as a Web or a SQL server name.",
    },
    { name: "TenantId", type: "string" },
    {
      name: "TimeGenerated",
      type: "datetime",
      description: "Date and time when dependency call was recorded.",
    },
    { name: "Type", type: "string", description: "The name of the table" },
    {
      name: "UserAccountId",
      type: "string",
      description: "Application-defined account associated with the user.",
    },
    {
      name: "UserAuthenticatedId",
      type: "string",
      description:
        "Persistent string that uniquely represents each authenticated user in the application.",
    },
    {
      name: "UserId",
      type: "string",
      description: "Anonymous ID of a user accessing the application.",
    },
  ],
};
const appRequests: DefinitionSchema = {
  tableName: "AppRequests",
  columns: [
    {
      name: "AppRoleInstance",
      type: "string",
      description: "Role instance of the application.",
    },
    {
      name: "AppRoleName",
      type: "string",
      description: "Role name of the application.",
    },
    {
      name: "AppVersion",
      type: "string",
      description: "Version of the application.",
    },
    {
      name: "ClientBrowser",
      type: "string",
      description: "Browser running on the client device.",
    },
    {
      name: "ClientCity",
      type: "string",
      description: "City where the client device is located.",
    },
    {
      name: "ClientCountryOrRegion",
      type: "string",
      description: "Country or region where the client device is located.",
    },
    {
      name: "ClientIP",
      type: "string",
      description: "IP address of the client device.",
    },
    {
      name: "ClientModel",
      type: "string",
      description: "Model of the client device.",
    },
    {
      name: "ClientOS",
      type: "string",
      description: "Operating system of the client device.",
    },
    {
      name: "ClientStateOrProvince",
      type: "string",
      description: "State or province where the client device is located.",
    },
    {
      name: "ClientType",
      type: "string",
      description: "Type of the client device.",
    },
    {
      name: "DurationMs",
      type: "real",
      description:
        "Number of milliseconds it took the application to handle the request.",
    },
    {
      name: "Id",
      type: "string",
      description: "Application-generated, unique request ID.",
    },
    {
      name: "IKey",
      type: "string",
      description: "Instrumentation key of the Azure resource.",
    },
    {
      name: "ItemCount",
      type: "int",
      description:
        "Number of telemetry items represented by a single sample item.",
    },
    {
      name: "Measurements",
      type: "dynamic",
      description: "Application-defined measurements.",
    },
    {
      name: "Name",
      type: "string",
      description: "Human-readable name of the request.",
    },
    {
      name: "OperationId",
      type: "string",
      description: "Application-defined operation ID.",
    },
    {
      name: "OperationName",
      type: "string",
      description:
        "Application-defined name of the overall operation. The OperationName values typically match the Name values for AppRequests.",
    },
    {
      name: "ParentId",
      type: "string",
      description: "ID of the parent operation.",
    },
    {
      name: "Properties",
      type: "dynamic",
      description: "Application-defined properties.",
    },
    {
      name: "ReferencedItemId",
      type: "string",
      description: "Id of the item with additional details about the request.",
    },
    {
      name: "ReferencedType",
      type: "string",
      description:
        "Name of the table with additional details about the request.",
    },
    {
      name: "ResourceGUID",
      type: "string",
      description: "Unique, persistent identifier of an Azure resource.",
    },
    {
      name: "_ResourceId",
      type: "string",
      description:
        "A unique identifier for the resource that the record is associated with",
    },
    {
      name: "ResultCode",
      type: "string",
      description:
        "Result code returned by the application after handling the request.",
    },
    {
      name: "SDKVersion",
      type: "string",
      description:
        "Version of the SDK used by the application to generate this telemetry item.",
    },
    {
      name: "SessionId",
      type: "string",
      description: "Application-defined session ID.",
    },
    {
      name: "Source",
      type: "string",
      description:
        "Friendly name of the request source, when known. Source is based on the metadata supplied by the caller.",
    },
    { name: "SourceSystem", type: "string" },
    {
      name: "_SubscriptionId",
      type: "string",
      description:
        "A unique identifier for the subscription that the record is associated with",
    },
    {
      name: "Success",
      type: "bool",
      description:
        "Indicates whether the application handled the request successfully.",
    },
    {
      name: "SyntheticSource",
      type: "string",
      description: "Synthetic source of the operation.",
    },
    { name: "TenantId", type: "string" },
    {
      name: "TimeGenerated",
      type: "datetime",
      description: "Date and time when request processing started.",
    },
    { name: "Type", type: "string", description: "The name of the table" },
    { name: "Url", type: "string", description: "URL of the request." },
    {
      name: "UserAccountId",
      type: "string",
      description: "Application-defined account associated with the user.",
    },
    {
      name: "UserAuthenticatedId",
      type: "string",
      description:
        "Persistent string that uniquely represents each authenticated user in the application.",
    },
    {
      name: "UserId",
      type: "string",
      description: "Anonymous ID of a user accessing the application.",
    },
  ],
};
const appTraces: DefinitionSchema = {
  tableName: "AppTraces",
  columns: [
    {
      name: "AppRoleInstance",
      type: "string",
      description: "Role instance of the application.",
    },
    {
      name: "AppRoleName",
      type: "string",
      description: "Role name of the application.",
    },
    {
      name: "AppVersion",
      type: "string",
      description: "Version of the application.",
    },
    {
      name: "ClientBrowser",
      type: "string",
      description: "Browser running on the client device.",
    },
    {
      name: "ClientCity",
      type: "string",
      description: "City where the client device is located.",
    },
    {
      name: "ClientCountryOrRegion",
      type: "string",
      description: "Country or region where the client device is located.",
    },
    {
      name: "ClientIP",
      type: "string",
      description: "IP address of the client device.",
    },
    {
      name: "ClientModel",
      type: "string",
      description: "Model of the client device.",
    },
    {
      name: "ClientOS",
      type: "string",
      description: "Operating system of the client device.",
    },
    {
      name: "ClientStateOrProvince",
      type: "string",
      description: "State or province where the client device is located.",
    },
    {
      name: "ClientType",
      type: "string",
      description: "Type of the client device.",
    },
    {
      name: "IKey",
      type: "string",
      description: "Instrumentation key of the Azure resource.",
    },
    {
      name: "ItemCount",
      type: "int",
      description:
        "Number of telemetry items represented by a single sample item.",
    },
    {
      name: "Measurements",
      type: "dynamic",
      description: "Application-defined measurements.",
    },
    { name: "Message", type: "string", description: "Trace message." },
    {
      name: "OperationId",
      type: "string",
      description: "Application-defined operation ID.",
    },
    {
      name: "OperationName",
      type: "string",
      description:
        "Application-defined name of the overall operation. The OperationName values typically match the Name values for AppRequests.",
    },
    {
      name: "ParentId",
      type: "string",
      description: "ID of the parent operation.",
    },
    {
      name: "Properties",
      type: "dynamic",
      description: "Application-defined properties.",
    },
    {
      name: "ReferencedItemId",
      type: "string",
      description: "Id of the item with additional details about the trace.",
    },
    {
      name: "ReferencedType",
      type: "string",
      description: "Name of the table with additional details about the trace.",
    },
    {
      name: "ResourceGUID",
      type: "string",
      description: "Unique, persistent identifier of an Azure resource.",
    },
    {
      name: "_ResourceId",
      type: "string",
      description:
        "A unique identifier for the resource that the record is associated with",
    },
    {
      name: "SDKVersion",
      type: "string",
      description:
        "Version of the SDK used by the application to generate this telemetry item.",
    },
    {
      name: "SessionId",
      type: "string",
      description: "Application-defined session ID.",
    },
    {
      name: "SeverityLevel",
      type: "int",
      description: "Severity level of the trace.",
    },
    { name: "SourceSystem", type: "string" },
    {
      name: "_SubscriptionId",
      type: "string",
      description:
        "A unique identifier for the subscription that the record is associated with",
    },
    {
      name: "SyntheticSource",
      type: "string",
      description: "Synthetic source of the operation.",
    },
    { name: "TenantId", type: "string" },
    {
      name: "TimeGenerated",
      type: "datetime",
      description: "Date and time when trace was recorded.",
    },
    { name: "Type", type: "string", description: "The name of the table" },
    {
      name: "UserAccountId",
      type: "string",
      description: "Application-defined account associated with the user.",
    },
    {
      name: "UserAuthenticatedId",
      type: "string",
      description:
        "Persistent string that uniquely represents each authenticated user in the application.",
    },
    {
      name: "UserId",
      type: "string",
      description: "Anonymous ID of a user accessing the application.",
    },
  ],
};
const appMetrics: DefinitionSchema = {
  tableName: "AppMetrics",
  columns: [
    {
      name: "AppRoleInstance",
      type: "string",
      description: "Role instance of the application.",
    },
    {
      name: "AppRoleName",
      type: "string",
      description: "Role name of the application.",
    },
    {
      name: "AppVersion",
      type: "string",
      description: "Version of the application.",
    },
    {
      name: "ClientBrowser",
      type: "string",
      description: "Browser running on the client device.",
    },
    {
      name: "ClientCity",
      type: "string",
      description: "City where the client device is located.",
    },
    {
      name: "ClientCountryOrRegion",
      type: "string",
      description: "Country or region where the client device is located.",
    },
    {
      name: "ClientIP",
      type: "string",
      description: "IP address of the client device.",
    },
    {
      name: "ClientModel",
      type: "string",
      description: "Model of the client device.",
    },
    {
      name: "ClientOS",
      type: "string",
      description: "Operating system of the client device.",
    },
    {
      name: "ClientStateOrProvince",
      type: "string",
      description: "State or province where the client device is located.",
    },
    {
      name: "ClientType",
      type: "string",
      description: "Type of the client device.",
    },
    {
      name: "IKey",
      type: "string",
      description: "Instrumentation key of the Azure resource.",
    },
    {
      name: "ItemCount",
      type: "int",
      description:
        "The number of measurements that were aggregated into trackMetric(..) call.",
    },
    {
      name: "Max",
      type: "real",
      description:
        "The maximum value in the measurements that were aggregated into trackMetric(..) call.",
    },
    {
      name: "Min",
      type: "real",
      description:
        "The minimum value in the measurements that were aggregated into trackMetric(..) call.",
    },
    { name: "Name", type: "string", description: "Application-defined name" },
    {
      name: "OperationId",
      type: "string",
      description: "Application-defined operation ID.",
    },
    {
      name: "OperationName",
      type: "string",
      description:
        "Application-defined name of the overall operation. The OperationName values typically match the Name values for AppRequests.",
    },
    {
      name: "ParentId",
      type: "string",
      description: "ID of the parent operation.",
    },
    {
      name: "Properties",
      type: "dynamic",
      description: "Application-defined properties.",
    },
    {
      name: "ResourceGUID",
      type: "string",
      description: "Unique, persistent identifier of an Azure resource.",
    },
    {
      name: "_ResourceId",
      type: "string",
      description:
        "A unique identifier for the resource that the record is associated with",
    },
    {
      name: "SDKVersion",
      type: "string",
      description:
        "Version of the SDK used by the application to generate this telemetry item.",
    },
    {
      name: "SessionId",
      type: "string",
      description: "Application-defined session ID.",
    },
    { name: "SourceSystem", type: "string" },
    {
      name: "_SubscriptionId",
      type: "string",
      description:
        "A unique identifier for the subscription that the record is associated with",
    },
    {
      name: "Sum",
      type: "real",
      description:
        "This is the sum of the measurements. To get the mean value, divide by valueCount.",
    },
    {
      name: "SyntheticSource",
      type: "string",
      description: "Synthetic source of the operation.",
    },
    { name: "TenantId", type: "string" },
    {
      name: "TimeGenerated",
      type: "datetime",
      description: "Date and time when metric was generated.",
    },
    { name: "Type", type: "string", description: "The name of the table" },
    {
      name: "UserAccountId",
      type: "string",
      description: "Application-defined account associated with the user.",
    },
    {
      name: "UserAuthenticatedId",
      type: "string",
      description:
        "Persistent string that uniquely represents each authenticated user in the application.",
    },
    {
      name: "UserId",
      type: "string",
      description: "Anonymous ID of a user accessing the application.",
    },
  ],
};
export {
  appSystemEvents,
  appDependencies,
  appMetrics,
  appRequests,
  appTraces,
  appExceptions,
};
