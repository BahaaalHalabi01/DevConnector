const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateRegisterInput(data) {
  let { name, email, password, confirmpassword } = data
  let errors = {}

  name = !isEmpty(name) ? name : ''
  email = !isEmpty(email) ? email : ''
  password = !isEmpty(password) ? password : ''
  confirmpassword = !isEmpty(confirmpassword) ? confirmpassword : ''

  //Validate Name

  if (!Validator.isLength(name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters'
  }

  if (Validator.isEmpty(name)) {
    errors.name = 'Name field is required'
  }

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

  //Validate Confirm Password
  if (!Validator.equals(password, confirmpassword)) {
    errors.confirmpassword = 'Passwords must match'
  }

  if (Validator.isEmpty(confirmpassword)) {
    errors.confirmpassword = 'Confirm Password field is required'
  }

  
  return {
    errors,
    isValid: isEmpty(errors),
  }
}
