const Joi = require("joi");
const mongoose = require("mongoose");

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

exports.familySchema = familySchema;
exports.validateFamily = validateFamily;
exports.Family = Family;
