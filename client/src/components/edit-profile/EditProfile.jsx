import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import SelectListGroup from '../common/SelectListGroup'
import InputGroup from '../common/InputGroup'
import { CLEAR_ERRORS } from '../../actions/types'
import { createProfile, getCurrentProfile } from '../../actions/profileActions'
import isEmpty from '../../validation/isEmpty'

export const EditProfile = props => {
	const [state, setState] = useState({
		displaySocialInputs: false,
		handle: '',
		website: '',
		company: '',
		location: '',
		status: '',
		skills: '',
		githubusername: '',
		bio: '',
		twitter: '',
		facebook: '',
		linkedin: '',
		youtube: '',
		instagram: '',
	})
	const [errors, setErrors] = useState({})

	const {
		displaySocialInputs,
		handle,
		website,
		company,
		location,
		status,
		skills,
		githubusername,
		bio,
		twitter,
		facebook,
		linkedin,
		youtube,
		instagram,
	} = state

	const isLoaded = useRef(false)
	const getCurrentProfile = props.getCurrentProfile
	const { profile } = props

	//load profile once when component mounts and get current profile data
	useEffect(() => {
		if (!isLoaded.current) getCurrentProfile()
		isLoaded.current = true

		if (!isEmpty(profile.profile)) {
			const current = profile.profile
			const skillsCSV = current.skills.join(',')
			setState({
				handle: !isEmpty(current.handle) ? current.handle : '',
				website: !isEmpty(current.website) ? current.website : '',
				company: !isEmpty(current.company) ? current.company : '',
				location: !isEmpty(current.location) ? current.location : '',
				status: !isEmpty(current.status) ? current.status : '',
				skills: !isEmpty(skillsCSV) ? skillsCSV : [],
				githubusername: !isEmpty(current.githubusername) ? current.githubusername : '',
				bio: !isEmpty(current.bio) ? current.bio : '',
				twitter: !isEmpty(current.social) && !isEmpty(current.social.twitter) ? current.social.twitter : '',
				facebook: !isEmpty(current.social) && !isEmpty(current.social.facebook) ? current.social.facebook : '',
				linkedin: !isEmpty(current.social) && !isEmpty(current.social.linkedin) ? current.social.linkedin : '',
				instagram: !isEmpty(current.social) && !isEmpty(current.social.instagram) ? current.social.instagram : '',
				youtube: !isEmpty(current.social) && !isEmpty(current.social.youtube) ? current.social.youtube : '',
			})
		}
	}, [getCurrentProfile, profile])

	//Check if the component has changed, if changed, clean the errors
	const {clearErrors} = props
	useEffect(() => {
		clearErrors()
	}, [ props.history, clearErrors])

	useEffect(() => {
		setErrors(props.errors)
	}, [props.errors])

	const handleChange = event => {
		setState({ ...state, [event.target.name]: event.target.value })
	}
	const handleSubmit = event => {
		event.preventDefault()
		let { displaySocialInputs, ...profileData } = state
		props.createProfile(profileData, props.history)
	}

	const statusOptions = [
		{ label: '* Select Professional Status', value: '' },
		{ label: 'Developer', value: 'Developer' },
		{ label: 'Junior Developer', value: 'Junior Developer' },
		{ label: 'Senior Developer', value: 'Senior Developer' },
		{ label: 'Manager', value: 'Manager' },
		{ label: 'Student/Learning', value: 'Student/Learning' },
		{ label: 'Intructor/Teacher', value: 'Instructor/Teacher' },
		{ label: 'Intern', value: 'Intern' },
		{ label: 'Other', value: 'Other' },
	]

	let socialInputs
	if (displaySocialInputs) {
		socialInputs = (
			<div>
				<InputGroup name='twitter' placeholder='Twitter Profile URL' value={twitter} onChange={handleChange} icon='fab fa-twitter' error={errors.twitter}/>
				<InputGroup name='facebook' placeholder='Facebook Profile URL' value={facebook} onChange={handleChange} icon='fab fa-facebook' error={errors.facebook}/>
				<InputGroup name='linkedin' placeholder='Linkedin Profile URL' value={linkedin} onChange={handleChange} icon='fab fa-linkedin' error={errors.linkedin}/>
				<InputGroup name='youtube' placeholder='Youtube Profile URL' value={youtube} onChange={handleChange} icon='fab fa-youtube' error={errors.youtube}/>
				<InputGroup name='instagram' placeholder='Instagram Profile URL' value={instagram} onChange={handleChange} icon='fab fa-instagram' error={errors.instagram}/>
			</div>
		)
	} else {
		socialInputs = <div></div>
	}

	return (
		<div className='create-profile'>
			<div className='container'>
				<div className='row'>
					<div className='col-md-8 m-auto'>
						<h1 className='display-4 text-center'>Edit Your Profile</h1>
						<small className='d-block pb-3 text-center font-weight-bold'>* = required fields</small>
						<form onSubmit={handleSubmit}>
							<TextFieldGroup
								placeholder='* Profile Handle'
								name='handle'
								value={handle}
								onChange={handleChange}
								info="A unique handle for your profile URL.Your full name,company name,nickname,etc (This CAN'T be changed later)"
								error={errors.handle}
							/>
							<SelectListGroup
								name='status'
								value={status}
								info='Give us an idea of where you are at in your career'
								options={statusOptions}
								onChange={handleChange}
								error={errors.status}
							/>
							<TextFieldGroup
								placeholder='Company'
								name='company'
								value={company}
								onChange={handleChange}
								info='Could be your own company or one you work for'
								error={errors.company}
							/>
							<TextFieldGroup
								placeholder='Website'
								name='website'
								value={website}
								onChange={handleChange}
								info='Could be your own or a company webiste'
								error={errors.website}
							/>
							<TextFieldGroup
								placeholder='Location'
								name='location'
								value={location}
								onChange={handleChange}
								info='City & state suggested (eg. Boston,MA)'
								errro={errors.location}
							/>
							<TextFieldGroup
								placeholder='* Skills'
								name='skills'
								value={skills}
								onChange={handleChange}
								info='Please use comma seperated values (eg. HTML,CSS,JavaScript,PHP,React)'
								error={errors.skills}
							/>

							<TextFieldGroup
								placeholder='Github Username'
								name='githubusername'
								value={githubusername}
								onChange={handleChange}
								info='If you want your latest repos and a Github link,include your username'
								error={errors.githubusername}
							/>
							<TextAreaFieldGroup
								placeholder='A Short Bio of Yourself'
								name='bio'
								value={bio}
								info='Tell us a little about yourself!'
								onChange={handleChange}
								error={errors.bio}
							/>
							<div className='mb-3'>
								<button
									type='button'
									onClick={() => {
										setState({ ...state, displaySocialInputs: !displaySocialInputs })
									}}
									className='btn btn-light mr-3'>
									Add Social Network Links
								</button>
								<span className='text-muted'>Optional</span>
								{socialInputs}
							</div>
							<input className='btn btn-primary btn-block mt-4' type='submit' value='Submit'></input>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

EditProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	createProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors,
})

const mapDispatchToProps = dispatch => ({
	createProfile: (profileData, history) => dispatch(createProfile(profileData, history)),
	clearErrors: () => dispatch({ type: CLEAR_ERRORS }),
	getCurrentProfile: () => dispatch(getCurrentProfile()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditProfile))
