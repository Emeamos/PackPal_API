import Joi from 'joi'

export const updateEssentials = function validate(input) {
  const schema = Joi.object({
    essential: Joi.string(),
  })
  return schema.validate(input)
}