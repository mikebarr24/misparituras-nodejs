const request = require("supertest");
const mongoose = require("mongoose");
const { Part } = require("../../models/part.js");

let server;
describe("/api/parts", () => {
  let title;
  let composerId;
  let instrumentId;
  let nivelId;
  let estiloId;
  let cursoId;
  let familyId;
  let pdf;
  let audio;
  let part;

  beforeEach(async () => {
    server = require("../../index");
    composerId = mongoose.Types.ObjectId();
    instrumentId = mongoose.Types.ObjectId();
    nivelId = mongoose.Types.ObjectId();
    estiloId = mongoose.Types.ObjectId();
    cursoId = mongoose.Types.ObjectId();
    familyId = mongoose.Types.ObjectId();
    part = new Part({
      title: "12345",
      composer: {
        composer: "12345",
        estilo: {
          estilo: "12345",
        },
      },
      instrument: {
        instrument: "12345",
        family: {
          family: "12345",
        },
      },
      nivel: {
        nivel: "12345",
      },
      curso: {
        curso: "12345",
      },
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
    return request(server)
      .post("/api/parts")
      .send({ composerId, instrumentId, nivelId, estiloId, cursoId });
  };

  describe("GET /", () => {
    it("should return 200 and display all parts", async () => {
      const res = await request(server).get("/api/parts");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body.some((item) => item.title === "12345")).toBeTruthy();
    });
  });
});
