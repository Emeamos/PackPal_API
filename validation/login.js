import Joi from "joi";

export const loginValidation = Joi.object({
  email: Joi.string().email().min(3).max(70).lowercase().required(),
  password: Joi.string().required()

    // .pattern(
    //   new RegExp(
    //     '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
    //   )
    // )
    // .required("student"),
});
export default loginValidation;
