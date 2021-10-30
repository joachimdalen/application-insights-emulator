export interface IDataStore {
  init(): Promise<void>;
  close(): Promise<void>;
}
