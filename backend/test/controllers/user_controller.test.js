test("First test", async () => {

  let a = 1;
  expect(a).toBe(1);
});

test("User should have correct structure.", async () => {
  let user = {
    _id: "someId",
    username: "someuser",
    email: "some@email.com",
    password: "somepassword",
    projects: [
      "someProjectId",
      "otherProjectId"
    ]
  };

  expect(user).toHaveProperty("_id");
  expect(user).toHaveProperty("username");
  expect(user).toHaveProperty("email");
  expect(user).toHaveProperty("password");
  expect(user).toHaveProperty("projects");

});
