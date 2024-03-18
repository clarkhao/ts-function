import { IList, InsertDel } from "../interface";

class LinkedList<T> implements IList<T>, InsertDel<T> {
  val: T | undefined;
  next: LinkedList<T> | null;
  constructor(val?: T) {
    this.val = typeof val === "undefined" ? undefined : val;
    this.next = null;
  }
  /**
   * push(value: T) is a method that add new node onto end of LinkedList
   * @param value T that is the value of node
   * @returns the last node which is also a LinkedList instance
   */
  push(value: T): LinkedList<T> {
    if (this.val) {
      const newNode = new LinkedList(value);
      this.next = newNode;
      return this.next;
    } else {
      this.val = value;
      return this;
    }
  }
  pop(): T | undefined {
    let current = this.next;
    let prev = this as LinkedList<T>;
    while (current !== null) {
      if (current.next === null) {
        prev.next = null;
        return current.val;
      }
      prev = current;
      current = current.next;
    }
    if (this.val) {
      const value = this.val;
      this.val = undefined;
      return value;
    } else {
      return this.val;
    }
  }
  insertAt(pos: number, value: T): Error | LinkedList<T> {
    if (!this.val) {
      if (pos !== 0) {
        return new Error("failed to insert into list, out of bound");
      } else {
        this.val = value;
        return this;
      }
    }
    const node = new LinkedList<T>(value);
    switch (pos) {
      case 0: {
        node.next = this;
        return node;
      }
      case 1: {
        const next = this.next;
        this.next = node;
        node.next = next === null ? null : next;
        return this;
      }
      default: {
        let counter = 2;
        let current = this.next;
        if (current === null) {
          return new Error("failed to insert into list, out of bound");
        }
        let next = current.next;
        while (counter <= pos && current !== null) {
          if (counter === pos) {
            current.next = node;
            node.next = next;
            return this;
          }
          counter++;
          current = next;
          next = current?.next as LinkedList<T> | null;
        }
        return new Error("failed to insert into list, out of bound");
      }
    }
  }
  deleteAt(pos: number): Error | LinkedList<T> {
    if (!this.val) {
      return new Error("failed to delete item from list, out of bound");
    }
    switch (pos) {
      case 0: {
        if (this.next !== null) {
          this.val = undefined;
          return this.next;
        } else {
          return new LinkedList();
        }
      }
      case 1: {
        const current = this.next;
        if (current !== null) {
          this.next = current.next;
          return this;
        } else {
          return new Error("failed to delete item from list, out of bound");
        }
      }
      default: {
        let counter = 2;
        const current = this.next;
        if (current === null) {
          return new Error("failed to delete item from list, out of bound");
        }
        let next = current?.next;
        while (next !== null) {
          if (counter === pos) {
            next = next?.next;
            return this;
          }
          next = next.next;
          counter++;
        }
        return new Error("failed to delete item from list, out of bound");
      }
    }
  }
  /**
   * generator function make the class instance iterable
   */
  *[Symbol.iterator](): Iterator<T> {
    if (this.val) yield this.val;
    let current = this.next;
    while (current?.val) {
      yield current.val;
      current = current.next;
    }
  }
  /**
   * can asynchronous iterator be added?
   */
  async *[Symbol.asyncIterator](): AsyncIterator<T> {
    if (this.val) {
      yield await Promise.resolve(this.val);
    }
    let current = this.next;
    while (current?.val) {
      yield await Promise.resolve(current.val);
      current = current.next;
    }
  }
  /**
   * toString() is a method that make the Linkedlist instance represented by string
   * @returns string
   */
  toString(): string {
    let node = "LinkedList";
    let count = 0;
    for (const value of this) {
      count++;
      node += `{val:${value},next:`;
    }
    node += count === 0 ? "{val:undefined,next:null}" : "null";
    for (let i = 0; i < count; i++) {
      node += "}";
    }
    return node;
  }
}

export { LinkedList };
