import Joi from "joi";

export const registerValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().min(3).max(70).lowercase().required(),
  // confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
  //   "any.only": "Confirm password does not match password.",
  // }),
  password: Joi.string().min(6).required(),
});

export default registerValidation;
