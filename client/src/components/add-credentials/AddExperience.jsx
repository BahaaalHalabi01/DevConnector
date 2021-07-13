import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import { addExperience } from '../../actions/profileActions'
import isEmpty from '../../validation/isEmpty'
import classnames from 'classnames'
import { CLEAR_ERRORS } from '../../actions/types'



export const AddExperience = props => {
	const [state, setState] = useState({
		company: '',
		title: '',
		location: '',
		from: '',
		to: '',
		current: false,
		description: '',
	})
	const [errors, setErrors] = useState({})
	const { clearErrors } = props

	useEffect(() => {
		clearErrors()

	}, [ props.history, clearErrors])

	useEffect(() => {
		setErrors(props.errors)
	}, [props.errors])

	const handleChange = event => {
		setState({ ...state, [event.target.name]: event.target.value })
	}

	//Dont let him submit if current not selected without a to date
	const handleSubmit = event => {
		event.preventDefault()

		if (!isEmpty(state.from) && isEmpty(state.to)) {
			if (!state.current) {
				setErrors({ ...errors, currentError: 'Are you still undergoing this degree or did it end ? Please specify ' })
				return
			}
		} else {
			setErrors({ ...errors, currentError: '' })
		}

		const { company, title, location, from, to, description, current } = state

		props.addExperience(
			{
				company,
				title,
				location,
				from,
				to,
				current,
				description,
			},
			props.history
		)
	}

	return (
		<div className='add-experience'>
			<div className='container'>
				<div className='row'>
					<div className='col-md-8 m-auto'>
						<Link to='/dashboard' className='btn btn-light'>
							Go Back
						</Link>
						<h1 className='display-4 text-center'>Add Your Experience</h1>
						<p className='lead text-center'>Add any job or positon that you have had in the past or undergoing currently</p>
						<small className='d-block pb-3 font-weight-bold text-center'>* = required</small>
						<form onSubmit={handleSubmit}>
							<TextFieldGroup placeholder='* Job Tittle' name='title' value={state.title} onChange={handleChange} error={errors.title} />
							<TextFieldGroup placeholder='* Company' name='company' value={state.company} onChange={handleChange} error={errors.company} />
							<TextFieldGroup placeholder='Location' name='location' value={state.location} onChange={handleChange} error={errors.location} />
							<h6>From Date</h6>
							<TextFieldGroup type='date' name='from' value={state.from} onChange={handleChange} error={errors.from} />
							<h6>To Date</h6>
							<TextFieldGroup type='date' name='to' value={state.to} onChange={handleChange} error={errors.to} disabled={state.current} />
							<div className='form-check mb-4'>
								<input
									type='checkbox'
									id='current'
									className={classnames('form-check-input ', { 'is-invalid': errors.currentError })}
									aria-describedby='invalidCurrent'
									value={state.current}
									checked={state.current}
									onChange={event => {
										setState({ ...state, to: '', current: event.target.checked })
									}}
								/>
								<label htmlFor="current" className='form-check-label'>
									Current Job
								</label>
								<div id='invalidCurrent' className='invalid-feedback'>
									{errors.currentError}
								</div>
							</div>
							<TextAreaFieldGroup
								placeholder='Job Description'
								info='Some of your responsabilities, etc'
								name='description'
								value={state.description}
								error={errors.description}
								onChange={handleChange}
							/>
							<input type='submit' className='btn btn-primary btn-block mt-4' value='Submit'></input>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

AddExperience.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	addExperience: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
})

const mapDispatchToProps = dispatch => {
	return {
		addExperience: (experienceData, history) => dispatch(addExperience(experienceData, history)),
		clearErrors: () => dispatch({ type: CLEAR_ERRORS }),

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddExperience))
