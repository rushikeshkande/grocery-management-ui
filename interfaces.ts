export interface IImmutableObject {
  get: (path: string, defaultValue?: any) => any;
  getIn: (path: string[]) => any;
  set: (path: string, value: any) => void;
  setIn: (path: string[], value: any) => void;
  toJS: () => any;
  toArray: () => any[];
  last: () => any;
  filter: (cb: Function) => any;
  findLast: (cb: Function) => any;
}
export interface IGutenbergStore {}
export interface IAction {
  type: string;
}
export interface IThunkAction {
  type: string;
  (dispatch: any, getState: () => IGutenbergStore, extraArgument: {}): {};
}
