import Joi from "joi";
import mongoose from "mongoose";

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

export { validateNivel, nivelSchema, Nivel };
