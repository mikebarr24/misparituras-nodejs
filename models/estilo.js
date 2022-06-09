import Joi from "joi";
import mongoose from "mongoose";

const estiloSchema = new mongoose.Schema({
  estilo: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
});

const Estilo = mongoose.model("Estilo", estiloSchema);

const validateEstilo = (estilo) => {
  const schema = Joi.object({
    estilo: Joi.string().min(3).max(50).required(),
  });

  return schema.validate(estilo);
};

export { Estilo, estiloSchema, validateEstilo };
