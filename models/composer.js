import Joi from "joi";
import joiObjectid from "joi-objectid";
const myJoiObjectId = joiObjectid(Joi);
import mongoose from "mongoose";
import { estiloSchema } from "./estilo";

const composerSchema = new mongoose.Schema({
  composer: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true,
  },
  estilo: {
    type: estiloSchema,
    required: true,
  },
});

const Composer = mongoose.model("Composer", composerSchema);

const validateComposer = (composer) => {
  const schema = Joi.object({
    composer: Joi.string().min(5).max(50).required(),
    estilo: myJoiObjectId(),
  });
};

export { Composer, composerSchema, validateComposer };
