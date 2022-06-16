const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");

const partSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  composer: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  instrument: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  nivel: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  curso: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
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
    composer: Joi.string().min(5).max(50).required(),
    instrment: Joi.string().min(5).max(50).required(),
    nivel: Joi.string().min(5).max(50).required(),
    curso: Joi.string().min(5).max(50).required(),
    pdf: Joi.string().min(5).max(200).required(),
    audio: Joi.string().min(5).max(200).required(),
  });
  return schema.validate(part);
}

exports.Part = Part;
exports.validatePart = validatePart;
exports.partSchema = partSchema;
