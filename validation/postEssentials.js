import Joi from 'joi'

const postEssential = function validate(input) {
  const schema = Joi.object({
    essential: Joi.string().required(),
  })
  return schema.validate(input)
}
export default postEssential;
