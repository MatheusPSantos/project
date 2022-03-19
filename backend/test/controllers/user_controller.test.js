test("First test", async () => {

  let a = 1;
  expect(a).toBe(1);
});

test("User should have correct structure.", async () => {
  let user = {
    _id: "someId",
    username: "someuser",
    password: "somepassword",
    projects: [
      "someProjectId",
      "otherProjectId"
    ]
  };

  expect(user).toHaveProperty("_id");
  expect(user).toHaveProperty("username");
  expect(user).toHaveProperty("password");
  expect(user).toHaveProperty("projects");

});

test("Project should have correct structure.", async () => {
  let Project = {
    _id: "someId",
    user_id: "someUserId",
    tasks: [
      "sometaskId",
      "othertaskId"
    ]
  };

  expect(Project).toHaveProperty("_id");
  expect(Project).toHaveProperty("user_id");
  expect(Project).toHaveProperty("tasks");
});

test("Task should have correct structure.", async () => {
  let task = {
    description: "some description",
    createdAt: new Date(),
    finishedAt: new Date()
  };

  expect(task).toHaveProperty("description");
  expect(task).toHaveProperty("createdAt");
  expect(task).toHaveProperty("finishedAt");
});