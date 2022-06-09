import Joi from "joi";
import mongoose from "mongoose";
import JoiObjectId from "joi-objectid";
import { familySchema } from "./family";
const myJoiObjectId = JoiObjectId(Joi);

const instrumentSchema = new mongoose.Schema({
  instrument: {
    type: String,
    minlength: 5,
    maxlength: 30,
    required: true,
  },
  family: {
    type: familySchema,
    required: true,
  },
});

const Instrument = mongoose.model("Instrument", instrumentSchema);

const validateInstrument = (instrument) => {
  const schema = Joi.object({
    instrument: {
      type: Joi.string().min(5).max(30).required(),
      familyId: myJoiObjectId().required(),
    },
  });
  return schema.validate(instrument);
};

export { instrumentSchema, validateInstrument, Instrument };
