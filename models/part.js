const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const { instrumentSchema } = require("./instrument");
const { nivelSchema } = require("./nivel");
const { estiloSchema } = require("./estilo");
const { cursoSchema } = require("./curso");
const { composerSchema } = require("./composer");

const partSchema = mongoose.Schema({
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
    composerId: Joi.objectId().required(),
    instrmentId: Joi.objectId().required(),
    nivelId: Joi.objectId().required(),
    cursoId: Joi.objectId().required(),
    pdf: Joi.string().min(5).max(200).required(),
    audio: Joi.string().min(5).max(200).required(),
  });
  return schema.validate(part);
}

exports.Part = Part;
exports.validatePart = validatePart;
exports.partSchema = partSchema;
