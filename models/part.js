import Joi from "joi";
import JoiObjectId from "joi-objectid";
const myJoiObjectId = JoiObjectId(Joi);
import mongoose from "mongoose";

const partSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  composer: {
    required: true,
  },
  instrument: {
    required: true,
  },
  nivel: {
    required: true,
  },
  estilo: {
    required: true,
  },
  curso: {
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

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    composerId: myJoiObjectId().required(),
    instrmentId: myJoiObjectId().required(),
    nivelId: myJoiObjectId().required(),
    estiloId: myJoiObjectId().required(),
    cursoId: myJoiObjectId().required(),
    pdf: myJoiObjectId().required(),
  });
}

export { Part };
