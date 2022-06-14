const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const { familySchema } = require("./family");

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
      familyId: Joi.objectId().required(),
    },
  });
  return schema.validate(instrument);
};

exports.Instrument = Instrument;
exports.validateInstrument = validateInstrument;
exports.instrumentSchema = instrumentSchema;
