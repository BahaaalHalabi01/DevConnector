const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateProfileInput(data) {
  let { handle, status, skills } = data
  const { website, youtube, instagram, facebook, linkedin, twitter } = data

  let errors = {}

  handle = !isEmpty(handle) ? handle : ''
  status = !isEmpty(status) ? status : ''
  skills = !isEmpty(skills) ? skills : ''

  //Vaildate Handle
  if (!Validator.isLength(handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle needs to be between 2 and 40 characters'
  }

  if (Validator.isEmpty(handle)) {
    errors.handle = 'Profile handle is required'
  }

  //Validate Status
  if (Validator.isEmpty(status)) {
    errors.status = 'Status field is required'
  }

  //Validate Skills
  if (Validator.isEmpty(skills)) {
    errors.skills = 'Skill fields are required'
  }

  //Validate Website
  if (!isEmpty(website)) {
    if (!Validator.isURL(website)) {
      errors.website = 'Not a valid URL'
    }
  }

  //Validate Socials
  if (!isEmpty(youtube)) {
    if (!Validator.isURL(youtube)) {
      errors.youtube = 'Not a valid URL'
    }
  }
  if (!isEmpty(facebook)) {
    if (!Validator.isURL(facebook)) {
      errors.facebook = 'Not a valid URL'
    }
  }
  if (!isEmpty(linkedin)) {
    if (!Validator.isURL(linkedin)) {
      errors.linkedin = 'Not a valid URL'
    }
  }
  if (!isEmpty(twitter)) {
    if (!Validator.isURL(twitter)) {
      errors.twitter = 'Not a valid URL'
    }
  }
  if (!isEmpty(instagram)) {
    if (!Validator.isURL(instagram)) {
      errors.instagram = 'Not a valid URL'
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
