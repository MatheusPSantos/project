test("Project should have correct structure.", async () => {
  let Project = {
    _id: "someId",
    tasks: [
      "sometaskId",
      "othertaskId"
    ]
  };

  expect(Project).toHaveProperty("_id");
  expect(Project).toHaveProperty("tasks");
});