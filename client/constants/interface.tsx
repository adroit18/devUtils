export interface IDispatchAction {
  type: string;
  payload: string | number;
}

export interface ISelectedRoute {
  selectedUtility: string;
}
