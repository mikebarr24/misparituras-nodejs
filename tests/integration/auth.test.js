const { User } = require("../../models/user");
const mongoose = require("mongoose");
const request = require("supertest");

describe("POST /", () => {
  let user;
  let _id;
  let name;
  let email;
  let password;
  let server;
  beforeEach(async () => {
    server = require("../../index");
    name = "abcde";
    email = "aaa@aaa.com";
    password = "abcd1234";
    _id = mongoose.Types.ObjectId();
    user = { _id, isAdmin: true, isStaff: true };
    user = new User({
      _id,
      name,
      email,
      password,
      isAdmin: true,
      isStaff: true,
    });
    await user.save();
  });
  afterEach(async () => {
    await server.close();
    await User.deleteMany({});
  });

  const exec = () => {
    return request(server).post("/api/auth").send(user);
  };
  it("should return auth token in response", () => {});
});
