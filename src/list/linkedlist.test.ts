import { LinkedList } from "./linkedlist";

let head: LinkedList<string>;
beforeEach(() => {
  head = new LinkedList<string>();
});

it("push() method checked, let's see if new node was pushed to the end of LinkedList", () => {
  head.push("Hello").push("World");
  expect(head.next?.val).toBe("World");
  expect(head.next?.next).toBe(null);
});

it("pop() method checked, let's see if end of node was popped out", () => {
  expect(head.pop()).toBe(undefined);
  expect([...head].length).toBe(0);
});

it("insertAt() method checked. Let's see if assert item into list", () => {
  head.push("Hello").push("World");
  head.insertAt(1, "Clark");
  expect([...head].length).toBe(3);
  expect([...head][1]).toBe("Clark");
  head.insertAt(3, "Last");
  expect([...head].length).toBe(4);
  expect([...head][0]).toBe("Hello");
  expect([...head][1]).toBe("Clark");
  expect([...head][2]).toBe("World");
  expect([...head][3]).toBe("Last");
  const newHead = head.insertAt(0, "First");
  expect([...(newHead as LinkedList<string>)].length).toBe(5);
  expect([...(newHead as LinkedList<string>)][0]).toBe("First");
  const err = head.insertAt(6, "error");
  expect(err instanceof Error).toBeTruthy;
});

it("deleteAt() method checked. Let's see if delete item from list", () => {
  expect(head.deleteAt(0) instanceof Error).toBeTruthy;
  head.push("Hello").push("World");
  const newHead = head.deleteAt(0) as LinkedList<string>;
  expect([...newHead].length).toBe(1);
  expect([...newHead][0]).toBe("World");
});

it("iterator checked, We can see that the LinkedList iterable", () => {
  head.push("Hello").push("World");
  expect([...head].length).toBe(2);
  expect([...head][0]).toBe("Hello");
  expect([...head][1]).toBe("World");
  expect([...head][2]).toBeUndefined();
});

it("toString() method checked, let's see if it returns a valid string", () => {
  head.push("Hello").push("World");
  expect(head.toString()).toBe(
    "LinkedList{val:Hello,next:{val:World,next:null}}",
  );
  head.pop();
  head.pop();
  expect(head.toString()).toBe("LinkedList{val:undefined,next:null}");
});

it("asynchronous iterator checked, we can see the LinkedList async iterable", () => {
  head.push("Hello").push("World");
  return Promise.resolve(head).then(async (node) => {
    for await (const v of node) {
      expect(["Hello", "World"].includes(v)).toBe(true);
    }
  });
});
