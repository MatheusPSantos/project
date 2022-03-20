test("Task should have correct structure.", async () => {
  let task = {
    name: "task name",
    description: "some description",
    status: "done",
    createdAt: new Date(),
    finishedAt: new Date()
  };

  expect(task).toHaveProperty("name");
  expect(task).toHaveProperty("description");
  expect(task).toHaveProperty("status");
  expect(task).toHaveProperty("createdAt");
  expect(task).toHaveProperty("finishedAt");
});