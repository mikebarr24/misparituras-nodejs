import Joi from "joi";
import mongoose from "mongoose";

const cursoSchema = new mongoose.Schema({
  curso: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true,
  },
});

const Curso = mongoose.model("Curso", cursoSchema);

const validateCurso = (curso) => {
  const schema = Joi.object({
    curso: Joi.string().min(5).max(50),
  });

  return schema.validate(curso);
};

export { Curso, cursoSchema, validateCurso };