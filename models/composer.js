const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const { estiloSchema } = require("./estilo");

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
    estilo: Joi.objectId(),
  });
};

exports.Composer = Composer;
exports.composerSchema = composerSchema;
exports.validateComposer = validateComposer;
