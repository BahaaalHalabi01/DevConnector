const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateLoginInput(data) {
  let { email, password } = data
  let errors = {}

  
  email = !isEmpty(email) ? email : ''
  password = !isEmpty(password) ? password : ''
  

  
  //Validate Email
  if (!Validator.isEmail(email)) {
    errors.email = 'Email is invalid'
  }

  if (Validator.isEmpty(email)) {
    errors.email = 'Email field is required'
  }

  
  //Validate Password
  if (!Validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = 'Password must be between 6 and 30 characters'
  }

  if (Validator.isEmpty(password)) {
    errors.password = 'Password field is required'
  }


  return {
    errors,
    isValid: isEmpty(errors),
  }
}
