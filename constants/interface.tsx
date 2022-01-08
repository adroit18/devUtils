export interface IDispatchAction {
  type: string;
  payload: string | number;
}

export interface ISelectedRoute {
  selectedUtility: string;
}

export interface IAvailableUrls {
  url: string;
  name: string;
}
