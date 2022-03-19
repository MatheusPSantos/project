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