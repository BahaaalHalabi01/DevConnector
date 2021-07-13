import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/authActions'
import { CLEAR_ERRORS } from '../../actions/types'
import TextFieldGroup from '../common/TextFieldGroup'

const Register = props => {
	//declaring state variables
	const [state, setState] = useState({
		name: '',
		email: '',
		password: '',
		confirmpassword: '',
	})
	const [errors, setErrors] = useState({})

	//Check if the component has changed, if changed, clean the errros
	const { clearErrors } = props
	useEffect(() => {
		clearErrors()
		if (props.auth.isAuthenticated) {
			props.history.push('/dashboard')
		}
	}, [props.history, clearErrors, props.auth.isAuthenticated])

	useEffect(() => {
		setErrors(props.errors)
		
	}, [props.errors])

	const handleChange = event => {
		setState({ ...state, [event.target.name]: event.target.value })
	}

	const handleSubmit = event => {
		event.preventDefault()

		const { name, email, password, confirmpassword } = state
		const newUser = { name, email, password, confirmpassword }
		props.registerUser(newUser, props.history)
	}

	return (
		<div className='register'>
			<div className='container'>
				<div className='row'>
					<div className='col-md-8 m-auto'>
						<h1 className='display-4 text-center'>Sign Up</h1>
						<p className='lead text-center'>Create your DevConnector account</p>
						<form onSubmit={handleSubmit}>
							<TextFieldGroup placeholder='Name' name='name' value={state.name} onChange={handleChange} error={errors.name} />
							<TextFieldGroup
								type='email'
								placeholder='Email Address'
								name='email'
								value={state.email}
								onChange={handleChange}
                info='This site uses Gravatar so if you want a profile image,use a Gravatar Email'
								error={errors.email}
							/>
							<TextFieldGroup
								type='password'
								placeholder='Password'
								name='password'
								value={state.password}
								onChange={handleChange}
								error={errors.password}
							/>
							<TextFieldGroup
								type='password'
								placeholder='Confirm Your Password'
								name='confirmpassword'
								value={state.confirmpassword}
								onChange={handleChange}
								error={errors.confirmpassword}
							/>
							<input type='submit' className='btn btn-info btn-block mt-4' />
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
	return {
		auth: state.auth,
		errors: state.errors,
		history: state.history,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		registerUser: (newUser, history) => dispatch(registerUser(newUser, history)),
		clearErrors: () => dispatch({ type: CLEAR_ERRORS }),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register))
