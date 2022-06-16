const request = require("supertest");
const mongoose = require("mongoose");
const { Part } = require("../../models/part.js");
const { User } = require("../../models/user");

let server;
describe("/api/parts", () => {
  let token;
  let part;

  beforeEach(async () => {
    server = require("../../index");
    token = new User({ isAdmin: true, isStaff: true }).generateAuthToken();
    part = new Part({
      title: "12345",
      composer: "12345",
      instrument: "12345",
      nivel: "12345",
      curso: "12345",
      pdf: "1234567890",
      audio: "1234567890",
    });
    await part.save();
  });
  afterEach(async () => {
    await server.close();
    await Part.deleteMany({});
  });
  const exec = () => {
    return request(server).post("/api/parts").set("x-auth-token", token).send({
      title: "12345",
      composer: "12345",
      instrument: "12345",
      nivel: "12345",
      curso: "12345",
      pdf: "1234567890",
      audio: "1234567890",
    });
  };

  describe("GET /", () => {
    it("should return 200 and display all parts", async () => {
      const res = await request(server).get("/api/parts");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body.some((item) => item.title === "12345")).toBeTruthy();
    });
  });

  describe("POST /", () => {
    it("should return 401 if no auth token provided", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });
    it("should return 403 logged in user is unauthorised to compete action", async () => {
      token = new User({ isAdmin: false, isStaff: false }).generateAuthToken();
      const res = await exec();
      expect(res.status).toBe(403);
    });
    it("should return 200 if part saved correctly", async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("title", "12345");
    });
  });
});
