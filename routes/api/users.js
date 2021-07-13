const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')

//Load Input Validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

//Load User Model
const User = require('../../models/User')

// @route  GET api/users/test
// @desc   Tests user route
// @access Public

router.get('/test', (req, res) => {
  res.json({
    msg: 'Users Works',
  })
})

// @route  GET api/users/register
// @desc   Register User
// @access Public

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)

  //Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }
  User.findOne({
    email: req.body.email.toLowerCase(),
  }).then(user => {
    if (user) {
      errors.email = 'Email already exists'
      return res.status(400).json(errors)
    } else {
      const { name, email, password } = req.body
      const avatar = gravatar.url(email, {
        s: '200', //size
        r: 'pg', //rating
        d: 'mm', //default
      })
      const newUser = new User({
        name,
        email:email.toLowerCase(),
        password,
        avatar,
      })
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err))
        })
      })
    }
  })
})

// @route  GET api/users/login
// @desc   Login User / returning JWT
// @access Public

router.post('/login', (req, res) => {
  let { email, password } = req.body
  const { errors, isValid } = validateLoginInput(req.body)

  //Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  //Find user by email
  email = email.toLowerCase()
  User.findOne({
    email
  }).then(user => {
    if (!user) {
      errors.email = 'User not found'
      return res.status(404).json(errors)
    }

    //check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User Matched
        const { id, name, avatar } = user

        const payload = {
          id,
          name,
          avatar,
        } // jwt payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 3600,
          },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token,
            })
          }
        )
      } else {
        errors.password = 'Password incorrect'
        return res.status(400).json(errors)
      }
    })
  })
})

// @route  GET api/users/current
// @desc   Return Current User
// @access Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id, name, email, avatar } = req.user
  res.json({
    id,
    name,
    email,
    avatar,
  })
})

module.exports = router
