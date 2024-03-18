import { Stack } from "./stack";

let stack: Stack<number>;
beforeEach(() => {
  stack = new Stack<number>();
});

it("push() method checked, let's see if the new item is pushed into stack and the top value is the new item", () => {
  stack.push(1).push(2);
  expect(stack.length).toBe(2);
  expect([...stack.top][0]).toBe(2);
  expect([...stack.top][1]).toBe(1);
});

it("pop() method checked. Let's see if the top item is popped out", () => {
  stack.push(1).push(2).push(3);
  expect(stack.pop()).toBe(3);
  expect(stack.pop()).toBe(2);
  expect(stack.pop()).toBe(1);
  expect(stack.pop()).toBe(undefined);
});
