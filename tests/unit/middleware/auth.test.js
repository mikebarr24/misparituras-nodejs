const mongoose = require("mongoose");
const { User } = require("../../../models/user");
const auth = require("../../../middleware/auth");

describe("auth middleware", () => {
  let user;
  let token;
  let res;
  let next;
  let req;
  beforeEach(() => {
    user = {
      _id: mongoose.Types.ObjectId().toHexString(),
      isAdmin: true,
      isStaff: true,
    };
    token = new User(user).generateAuthToken();
    res = {};
    next = jest.fn();
  });
  it("should return a valid json web token in the req.user", () => {
    req = {
      header: jest.fn().mockReturnValue(token),
    };

    auth(req, res, next);
    expect(req.user).toMatchObject(user);
  });
  it("shoould return 400 if invalid token", () => {
    req = {
      header: jest.fn().mockReturnValue(token),
    };

    auth(req, res, next);
    expect(req.user).toMatchObject(user);
  });
});
