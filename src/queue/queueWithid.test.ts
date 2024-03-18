import { QueueWithID } from "./queueWithid";
type TToast = {
  id: string;
  msg: string;
  colors: "info" | "success" | "error" | "warning" | "msg";
  display: "standard" | "writer";
  timed: "sm" | "md" | "lg" | null;
  variant: "default" | "colored";
};

it("del method checked. it will delete the item by its given id", () => {
  const queue = new QueueWithID<TToast>();
  queue.push({
    id: "1",
    msg: "a",
    colors: "info",
    display: "standard",
    timed: null,
    variant: "default",
  });
  const q = queue.del("1");
  expect(q?.id).toBe("1");
  expect(queue.length).toBe(0);
  expect(queue.head.val).toBe(undefined);
  queue.push({
    id: "1",
    msg: "a",
    colors: "info",
    display: "standard",
    timed: null,
    variant: "default",
  });
  queue.push({
    id: "2",
    msg: "b",
    colors: "info",
    display: "standard",
    timed: null,
    variant: "default",
  });
  queue.push({
    id: "3",
    msg: "c",
    colors: "info",
    display: "standard",
    timed: null,
    variant: "default",
  });
  const nq = queue.del("2");
  expect(nq?.id).toBe("2");

  expect(queue.length).toBe(2);
  expect(queue.head.val?.id).toBe("1");
  expect(queue.head.prev?.val?.id).toBe("3");
  queue.del("1");
  expect(queue.length).toBe(1);
  expect(queue.head.val?.id).toBe("3");
  queue.push({
    id: "2",
    msg: "b",
    colors: "info",
    display: "standard",
    timed: null,
    variant: "default",
  });
  queue.del("2");
  expect(queue.length).toBe(1);
  expect(queue.head.val?.id).toBe("3");
});
