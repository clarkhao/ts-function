import { Queue } from "./queue";

let queue: Queue<number>;
//complex data queue test
type TToast = {
  id: string;
  msg: string;
  colors: "info" | "success" | "error" | "warning" | "msg";
  display: "standard" | "writer";
  timed: "sm" | "md" | "lg" | null;
  variant: "default" | "colored";
};
let complexQueue: Queue<TToast>;
beforeEach(() => {
  queue = new Queue<number>();
  complexQueue = new Queue<TToast>();
});

it("push() method checked. Let's see if new item is pushed into the tail of queue", () => {
  const q = queue.push(1);
  expect(q.tail.val).toBe(1);
  q.push(2).push(3);
  expect(queue.length).toBe(3);
  expect([...queue][0]).toBe(1);
  expect([...queue][1]).toBe(2);
  expect([...queue][2]).toBe(3);
  expect([...queue]).toEqual([1, 2, 3]);
  expect([...queue.iterateFromTail()]).toEqual([3, 2, 1]);
});

it("pop() method checked. Let's see if head item is popped out from queue", () => {
  queue.push(1).push(2).push(3);
  expect(queue.pop()).toBe(1);
  expect(queue.length).toBe(2);
  expect(queue.pop()).toBe(2);
  expect(queue.pop()).toBe(3);
  expect(queue.pop()).toBe(undefined);
});

it("push() complex data queue checked.", () => {
  const cq = complexQueue.push({
    id: "1",
    colors: "info",
    msg: "hello",
    display: "standard",
    timed: null,
    variant: "default",
  });
  expect(cq.tail.val?.colors).toBe("info");
});
