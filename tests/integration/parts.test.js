const request = require("supertest");
const mongoose = require("mongoose");
const { Part } = require("../../models/part.js");
const { User } = require("../../models/user");
const { differenceInMilliseconds } = require("date-fns");

let server;
describe("/api/parts", () => {
  let token;
  let part;
  let myTitle;
  let myComposer;
  let myInstrument;
  let myNivel;
  let myCurso;
  let myPdf;
  let myAudio;

  beforeEach(async () => {
    server = require("../../index");
    myTitle = "12345";
    myComposer = "12345";
    myInstrument = "12345";
    myNivel = "12345";
    myCurso = "12345";
    myPdf = "1234567890";
    myAudio = "1234567890";
    token = new User({ isAdmin: true, isStaff: true }).generateAuthToken();
    part = new Part({
      title: myTitle,
      composer: myComposer,
      instrument: myInstrument,
      nivel: myNivel,
      curso: myCurso,
      pdf: myPdf,
      audio: myAudio,
    });
    await part.save();
  });
  afterEach(async () => {
    await server.close();
    await Part.deleteMany({});
  });
  const exec = () => {
    return request(server).post("/api/parts").set("x-auth-token", token).send({
      title: myTitle,
      composer: myComposer,
      instrument: myInstrument,
      nivel: myNivel,
      curso: myCurso,
      pdf: myPdf,
      audio: myAudio,
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
    it("should return 400 if the title is less than 5 characters", async () => {
      myTitle = "1234";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("should return 400 if the composer is less than 5 characters", async () => {
      myComposer = "1234";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("should return 400 if the instrument is less than 5 characters", async () => {
      myInstrument = "1234";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("should return 400 if the nivel is less than 5 characters", async () => {
      myNivel = "1234";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("should return 400 if the curso is less than 5 characters", async () => {
      myCurso = "1234";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("should return 400 if the pdf is less than 10 characters", async () => {
      myPdf = "1234";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("should return 400 if the audio is less than 10 characters", async () => {
      myAudio = "1234";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("should return 400 if the title is more than 50 characters", async () => {
      myTitle = new Array(52).join("a");
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("should return 400 if the composer is more than 50 characters", async () => {
      myComposer = new Array(52).join("a");
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("should return 400 if the instrument is more than 50 characters", async () => {
      myInstrument = new Array(52).join("a");
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("should return 400 if the nivel is more than 50 characters", async () => {
      myNivel = new Array(52).join("a");
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("should return 400 if the curso is more than 5 characters", async () => {
      myCurso = new Array(52).join("a");
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("should return 400 if the pdf is more than 200 characters", async () => {
      myPdf = new Array(202).join("a");
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("should return 400 if the audio is more than 200 characters", async () => {
      myAudio = new Array(202).join("a");
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("should return 200 if part saved correctly", async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("title", "12345");
    });
    it("should save the part to DB", async () => {
      await exec();
      const part = await Part.findOne({ title: "12345" });
      expect(part).not.toBeNull();
    });
    it("should set the date and time of creation", async () => {
      await exec();
      const part = await Part.findOne({ title: "12345" });
      const diff = differenceInMilliseconds(new Date(), part.dateCreated);
      expect(diff).toBeLessThan(5 * 1000);
    });
  });
});
