const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateExperienceInput(data) {
    let { title,company,from} = data
    let errors = {}

  
  title = !isEmpty(title) ? title : ''
  company = !isEmpty(company) ? company : ''
  from = !isEmpty(from) ? from : ''
  

  //Validate Title
  if (Validator.isEmpty(title)) {
    errors.title = 'Job tittle is missing'
  }

  //Validate Company
  if (Validator.isEmpty(company)) {
    errors.company = 'Company name field is required'
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
