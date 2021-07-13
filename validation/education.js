const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateEducationInput(data) {
    let { school,degree,fieldofstudy,from} = data
    let errors = {}

  
  school = !isEmpty(school) ? school : ''
  degree = !isEmpty(degree) ? degree : ''
  fieldofstudy = !isEmpty(fieldofstudy) ? fieldofstudy : ''
  from = !isEmpty(from) ? from : ''
  

  //Validate School
  if (Validator.isEmpty(school)) {
    errors.school = 'School name is missing'
  }

  //Validate degree
  if (Validator.isEmpty(degree)) {
    errors.degree = 'Degree name field is required'
  }

  //Validate fieldofstudy
  if (Validator.isEmpty(fieldofstudy)) {
    errors.fieldofstudy = 'Field of study is required'
  }

  //Validate from date
  if(Validator.isEmpty(from)){
      errors.from = 'The date of start is required'
  }


  return {
    errors,
    isValid: isEmpty(errors),
  }
}
