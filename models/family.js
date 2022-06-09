import Joi from "joi";
import mongoose from "mongoose";

const familySchema = new mongoose.Schema({
  family: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true,
  },
});

const Family = mongoose.model("Family", familySchema);

function validateFamily(family) {
  const schema = Joi.object({
    family: Joi.string().min(5).max(50).required(),
  });
  return schema.validate(family);
}

export { familySchema, validateFamily, Family };
