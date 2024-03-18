import { DoubleLinked } from "../list";
import { IList } from "../interface";

class Queue<T> implements IList<T> {
  length: number;
  head: DoubleLinked<T>;
  tail: DoubleLinked<T>;
  constructor() {
    this.head = new DoubleLinked<T>();
    this.tail = this.head;
    this.length = 0;
  }
  push(value: T): Queue<T> {
    switch (this.length) {
      case 0:
        this.head.val = value;
        this.length++;
        return this;
      case 1: {
        const node = new DoubleLinked<T>(value, this.tail);
        this.head.prev = node;
        this.tail = node;
        this.length++;
        return this;
      }
      default: {
        const node = new DoubleLinked<T>(value, this.tail);
        this.tail.prev = node;
        this.tail = node;
        this.length++;
        return this;
      }
    }
  }
  pop(): T | undefined {
    switch (this.length) {
      case 0: {
        return undefined;
      }
      case 1: {
        const value = this.head.val;
        this.head.val = undefined;
        this.length--;
        return value;
      }
      default: {
        const value = this.head.val;
        this.head = this.head.prev as DoubleLinked<T>;
        this.head.next = null;
        this.length--;
        return value;
      }
    }
  }
  *[Symbol.iterator](): Iterator<T> {
    let current = this.head;
    while (current.val) {
      yield current.val;
      current = current.prev !== null ? current.prev : new DoubleLinked<T>();
    }
  }
  *iterateFromTail() {
    let current = this.tail;
    while (current.val) {
      yield current.val;
      current = current.next !== null ? current.next : new DoubleLinked<T>();
    }
  }
}

export { Queue };
