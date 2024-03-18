import { DoubleLinked } from "../list";
import { Queue } from "./queue";

class QueueWithID<T extends { id: string }> extends Queue<T> {
  del(id: string): T | undefined {
    let current = this.head;
    switch (this.length) {
      case 0:
        return this.pop();
      case 1:
        if (current.val?.id === id) {
          return this.pop();
        } else {
          return undefined;
        }
      default:
        while (current.val?.id !== id) {
          current =
            current.prev !== null ? current.prev : new DoubleLinked<T>();
        }
        if (current.val && current.val.id === id) {
          const value = current.val;
          const prev = current.prev;
          const next = current.next;
          if (current.next !== null) current.next.prev = prev;
          else {
            return this.pop();
          }
          if (current.prev !== null) {
            current.prev.next = next;
            this.length--;
          } else {
            if (next !== null) {
              this.tail = next;
              this.length--;
            }
          }
          return value;
        } else {
          return undefined;
        }
    }
  }
}

export { QueueWithID };
