export interface DynamicBody {
  [key: string]: string;
}

export type AppInTypes = "AppRequests" | "AppTraces" | "AppMetrics";

export interface AppInBase<T> {
  name: AppInTypes;
  time: string;
  iKey: string;
  tags?: DynamicBody;
  data: AppInBodyData<T>;
}

export interface AppInBodyData<T> {
  baseType: string;
  baseData: T;
}

export interface AppInBaseData {
  ver: number;
  message: string;
  severityLevel: string;
  properties: DynamicBody;
}
export interface IMetric {
  name: string;
  kind: string;
  value: number;
  count: number;
}
export interface AppInMessageData extends AppInBaseData {}
export interface AppInMetricData extends AppInBaseData {
  metrics: IMetric[];
}
export interface AppInRequestData extends AppInBaseData {
  name: string;
  duration: string;
  success: boolean;
  responseCode: string;
  url: string;
}

export interface IAppRequest {
  name: "AppRequests";
  time: string;
  iKey: string;
  tags?: DynamicBody;
  data: {
    baseType: string;
    baseData: AppInRequestData;
  };
}
export interface IAppMetric {
  name: "AppMetrics";
  time: string;
  iKey: string;
  tags?: DynamicBody;
  data: {
    baseType: string;
    baseData: AppInMetricData;
  };
}

export interface IAppTrace {
  name: "AppTraces";
  time: string;
  iKey: string;
  tags?: DynamicBody;
  data: {
    baseType: string;
    baseData: AppInMessageData;
  };
}
