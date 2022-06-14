const Joi = require("joi");
const mongoose = require("mongoose");

const nivelSchema = new mongoose.Schema({
  nivel: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
});

const Nivel = mongoose.model("Nivel", nivelSchema);

const validateNivel = (nivel) => {
  const schema = Joi.object({
    nivel: Joi.string().min(3).max(50).required(),
  });
  return schema.validate(nivel);
};

exports.Nivel = Nivel;
exports.nivelSchema = nivelSchema;
exports.validateNivel = validateNivel;
