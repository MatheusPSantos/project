test("Project should have correct structure.", async () => {
  let Project = {
    _id: "someId",
    name: "some name",
    tasks: [
      "sometaskId",
      "othertaskId"
    ]
  };

  expect(Project).toHaveProperty("_id");
  expect(Project).toHaveProperty("name");
  expect(Project).toHaveProperty("tasks");
});