export interface EndpointOptions {
  responseType?: (new (...args: any[]) => any) | [new (...args: any[]) => any];
}
