const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validatePostInput(data) {
  let { text } = data
  let errors = {}

  
  text = !isEmpty(text) ? text : ''
   
  //Validate Text
  if(!Validator.isLength(text,{min:10,max:300})){
      errors.text = 'Post length should be between 10 and 300 characters'
  }

  if (Validator.isEmpty(text)) {
    errors.text = 'Post text field is required'
  }


  return {
    errors,
    isValid: isEmpty(errors),
  }
}
