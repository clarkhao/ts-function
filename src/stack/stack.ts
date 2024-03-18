import { IList } from "../interface";
import { LinkedList } from "../list";
/**
 * Stack is class for data structure stack
 * length is the stack size
 * and top is a linkedlist
 */
class Stack<T> implements IList<T> {
  length: number;
  top: LinkedList<T>;
  constructor(val?: T) {
    this.top = new LinkedList<T>(val);
    this.length = val ? 1 : 0;
  }
  /**
   * push() method will push the new value on top of stack
   * @param value new value pushed on top
   * @returns Stack itself
   */
  push(value: T): IList<T> {
    if (this.top?.val) {
      const node = new LinkedList(value);
      node.next = this.top;
      this.top = node;
    } else {
      this.top.val = value;
    }
    this.length++;
    return this;
  }
  /**
   * pop() is the method that will pop out the top value
   * @returns value popped out on top
   */
  pop(): T | undefined {
    switch (this.length) {
      case 0:
        return undefined;
      default: {
        const next = this.top.next;
        const value = this.top.val;
        this.top = next !== null ? next : new LinkedList();
        this.length--;
        return value;
      }
    }
  }
  *[Symbol.iterator](): Iterator<T> {
    let current = this.top;
    while (current !== null && current.val) {
      yield current.val;
      if (current.next !== null) current = current.next;
    }
  }
}

export { Stack };
