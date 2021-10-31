export interface IDataStore {
  init(): Promise<void>;
  close(): Promise<void>;
  trackEvent(event: any): Promise<void>;
  runQuery(appId: string): Promise<any>;
}
