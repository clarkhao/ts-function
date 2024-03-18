/* eslint-disable @typescript-eslint/consistent-type-definitions */
export interface IList<T> {
  push(value: T): IList<T>;
  pop(): T | undefined;
}

export interface InsertDel<T> {
  insertAt(pos: number, value: T): Error | InsertDel<T>;
  deleteAt(pos: number): Error | InsertDel<T>;
}
