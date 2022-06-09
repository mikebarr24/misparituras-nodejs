import Joi from "joi";
import JoiObjectId from "joi-objectid";
const myJoiObjectId = JoiObjectId(Joi);
import mongoose from "mongoose";
import { instrumentSchema } from "./instrument";
import { nivelSchema } from "./nivel";
import { estiloSchema } from "./estilo";
import { cursoSchema } from "./curso";
import { composerSchema } from "./composer";

const partSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  composer: {
    type: composerSchema,
    required: true,
  },
  instrument: {
    type: instrumentSchema,
    required: true,
  },
  nivel: {
    type: nivelSchema,
    required: true,
  },
  estilo: {
    type: estiloSchema,
    required: true,
  },
  curso: {
    type: cursoSchema,
    required: true,
  },
  pdf: {
    type: String,
    minlength: 10,
    maxlength: 100,
  },
  audio: {
    type: String,
    minlength: 10,
    maxlength: 100,
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Part = mongoose.model("Part", partSchema);

function validatePart(part) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    composerId: myJoiObjectId().required(),
    instrmentId: myJoiObjectId().required(),
    nivelId: myJoiObjectId().required(),
    estiloId: myJoiObjectId().required(),
    cursoId: myJoiObjectId().required(),
    pdf: Joi.string().min(5).max(200).required(),
    audio: Joi.string().min(5).max(200).required(),
  });
  return schema.validate(part);
}

export { Part, validatePart, partSchema };
