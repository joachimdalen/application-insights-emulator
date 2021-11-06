export interface IAppSystemEvent {
  EventType: string;
  Measurements: any;
  Name: string;
  Properties: any;
  _ResourceId: string;
  SourceSystem: string;
  _SubscriptionId: string;
  TenantId: string;
  TimeGenerated: Date;
  Type: string;
}
