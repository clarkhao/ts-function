class DoubleLinked<T> {
  val: T | undefined;
  next: DoubleLinked<T> | null;
  prev: DoubleLinked<T> | null;
  constructor(val?: T, next?: DoubleLinked<T>, prev?: DoubleLinked<T>) {
    this.val = typeof val === "undefined" ? undefined : val;
    this.next = next ? next : null;
    this.prev = prev ? prev : null;
  }
}

export { DoubleLinked };
