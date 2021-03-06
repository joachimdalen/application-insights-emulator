export interface IAppExceptions {
  _ResourceId: string;
  _SubscriptionId: string;
  AppRoleInstance: string;
  AppRoleName: string;
  AppVersion: string;
  Assembly: string;
  ClientBrowser: string;
  ClientCity: string;
  ClientCountryOrRegion: string;
  ClientIP: string;
  ClientModel: string;
  ClientOS: string;
  ClientStateOrProvince: string;
  ClientType: string;
  Details: any;
  ExceptionType: string;
  HandledAt: string;
  IKey: string;
  InnermostAssembly: string;
  InnermostMessage: string;
  InnermostMethod: string;
  InnermostType: string;
  ItemCount: number;
  Measurements: any;
  Message: string;
  Method: string;
  OperationId: string;
  OperationName: string;
  OuterAssembly: string;
  OuterMessage: string;
  OuterMethod: string;
  OuterType: string;
  ParentId: string;
  ProblemId: string;
  Properties: any;
  ResourceGUID: string;
  SDKVersion: string;
  SessionId: string;
  SeverityLevel: number;
  SourceSystem: string;
  SyntheticSource: string;
  TenantId: string;
  TimeGenerated: Date;
  Type: string;
  UserAccountId: string;
  UserAuthenticatedId: string;
  UserId: string;
}
