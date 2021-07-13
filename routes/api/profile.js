const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')
const isEmpty = require('../../validation/is-empty')
//Load Profile Validation
const validateProfileInput = require('../../validation/profile')
//Load Experience Profile validation
const validateExperienceInput = require('../../validation/experience')
//Load Education Profile validation
const validateEducationInput = require('../../validation/education')
//Load Profile Model
const Profile = require('../../models/Profile')
//Load User Model
const User = require('../../models/User')

// @route  GET api/profile/test
// @desc   Tests profile route
// @access Public

router.get('/test', (req, res) => {
	res.json({
		msg: 'profile Works',
	})
})

// @route  GET api/profile
// @desc   Get current users profile
// @access Private

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { id } = req.user
	const errors = {}

	Profile.findOne({ user: id })
		.then(profile => {
			if (!profile) {
				errors.noprofile = 'There is no profile for this user'
				return res.status(404).json(errors)
			}
			res.json(profile)
		})
		.catch(err => res.status(404).json(err))
})

// @route  Get api/profile/handle/:handle
// @desc   Get profile by handle
// @access Public

router.get('/handle/:handle', (req, res) => {
	const errors = {}
	Profile.findOne({ handle: req.params.handle })
		.populate('user', ['name', 'avatar'])
		.then(profile => {
			if (!profile) {
				errors.noprofile = 'There is no profile for this user'
				return res.status(404).json(errors)
			}
			return res.json(profile)
		})
		.catch(err => res.status(404).json(err))
})
// @route  Get api/profile/user/:user_id
// @desc   Get profile by user ID
// @access Public

router.get('/user/:user_id', (req, res) => {
	const errors = {}

	Profile.findOne({ user: req.params.user_id })
		.populate('user', ['name', 'avatar'])
		.then(profile => {
			if (!profile) {
				errors.noprofile = 'There is no profile for this user'
				return res.status(404).json(errors)
			}
			return res.json(profile)
		})
		.catch(err => res.status(404).json({ profile: 'There is no profile for this user ' + err }))
})

// @route  Get api/profile/all
// @desc   Get all profiles
// @access Public

router.get('/all', (req, res) => {
	const errors = {}
	Profile.find()
		.populate('user', ['name', 'avatar'])
		.then(profiles => {
			if (!profiles) {
				errors.profile = 'There are no profiles'
				return res.status(404).json(errors)
			}
			return res.json(profiles)
		})
		.catch(err => res.status(404).json({ profile: 'There are no profiles ' + err }))
})

// @route  Post api/profile
// @desc   Create user profile
// @access Private

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	//Get fields
	const { errors, isValid } = validateProfileInput(req.body)
	//Check Validation
	if (!isValid) {
		return res.status(400).json(errors)
	}

	const { id } = req.user
	const { handle, company, website, location, status, skills, bio, githubusername, date, youtube, twitter, instagram, linkedin, facebook } = req.body
	const profileFields = {}

	profileFields.user = id
	profileFields.social = {}

	//required fields no need checking
	profileFields.handle = handle
	profileFields.status = status
	profileFields.skills = skills.split(',')

	//check not required fields
	!isEmpty(company) ? (profileFields.company = company) : (profileFields.company = '')

	!isEmpty(website) ? (profileFields.website = website) : (profileFields.website = '')

	!isEmpty(location) ? (profileFields.location = location) : (profileFields.location = '')

	!isEmpty(bio) ? (profileFields.bio = bio) : (profileFields.bio = '')

	!isEmpty(githubusername) ? (profileFields.githubusername = githubusername) : profileFields.githubusername=''

	//Socials
	!isEmpty(facebook) ? (profileFields.social.facebook = facebook) : profileFields.social.facebook =''
	!isEmpty(twitter) ? (profileFields.social.twitter = twitter) : profileFields.social.twitter =''
	!isEmpty(instagram) ? (profileFields.social.instagram = instagram) : profileFields.social.instagram =''
	!isEmpty(youtube) ? (profileFields.social.youtube = youtube) : profileFields.social.youtube = ''
	!isEmpty(linkedin) ? (profileFields.social.linkedin = linkedin) : profileFields.social.linkedin = ''

	!isEmpty(date) ? (profileFields.date = date) : profileFields.date =''

	Profile.findOne({ user: id })
		.populate('user', ['name', 'avatar'])
		.then(profile => {
			if (profile) {
				//Update
				Profile.findOneAndUpdate({ user: id }, { $set: profileFields }, { new: true }).then(profile => {
					return res.json(profile)
				})
			} else {
				//Create
				//Check if handle exists
				Profile.findOne({ handle }).then(profile => {
					if (profile) {
						errors.handle = 'That handle already exists'
						return res.status(400).json(errors)
					}
					//Save Profile
					new Profile(profileFields).save().then(profile => res.json(profile))
				})
			}
		})
		.catch(err => res.status(404).json(err))
})

// @route  Post api/profile/experience
// @desc   Add experience to profile
// @access Private
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
	//Check validation
	const { errors, isValid } = validateExperienceInput(req.body)
	if (!isValid) {
		return res.status(400).json(errors)
	}

	const { title, company, location, from, to, current, description } = req.body

	Profile.findOne({ user: req.user.id })
		.then(profile => {
			const newExperience = {
				title,
				company,
				location,
				from,
				to,
				current,
				description,
			}
			//Add to experience array
			profile.experience.unshift(newExperience)
			profile
				.save()
				.then(profile => res.json(profile))
				.catch(err => res.json(err.message))
		})
		.catch(err => res.status(404).json(err.message))
})
// @route  Delete api/profile/experience/:exp_id
// @desc   Delete experience from profile
// @access Private
router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOne({ user: req.user.id })
		.then(profile => {
			//Get remove index
			const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id)
			//Splice out of array
			profile.experience.splice(removeIndex, 1)
			//Resave profile
			profile
				.save()
				.then(profile => res.json(profile))
				.catch(err => res.status(404).json(err))
		})
		.catch(err => res.status(404).json(err))
})

// @route  Post api/profile/education
// @desc   Add education to profile
// @access Private
router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
	//Check validation
	const { errors, isValid } = validateEducationInput(req.body)
	if (!isValid) {
		return res.status(400).json(errors)
	}

	const { school, degree, fieldofstudy, from, to, current, description } = req.body

	Profile.findOne({ user: req.user.id })
		.then(profile => {
			const newEducation = {
				school,
				degree,
				fieldofstudy,
				from,
				to,
				current,
				description,
			}
			//Add to education array
			profile.education.unshift(newEducation)
			profile
				.save()
				.then(profile => res.json(profile))
				.catch(err => res.json(err.message))
		})
		.catch(err => res.status(404).json(err.message))
})
// @route  Delete api/profile/education/:edu_id
// @desc   Delete education from profile
// @access Private
router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOne({ user: req.user.id })
		.then(profile => {
			//Get remove index
			const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id)
			//Splice out of array
			profile.education.splice(removeIndex, 1)
			//Resave profile
			profile.save().then(profile => res.json(profile))
		})
		.catch(err => res.status(404).json(err.message))
})
// @route  Delete api/profile
// @desc   Delete user and profile
// @access Private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOneAndRemove({ user: req.user.id })
		.then(() => {
			User.findByIdAndRemove({ _id: req.user.id }).then(() => res.json({ success: true }))
		})
		.catch(err => res.status(404).json(err.message))
})

module.exports = router
