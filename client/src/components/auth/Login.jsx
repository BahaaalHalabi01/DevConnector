import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/authActions'
import { withRouter } from 'react-router'
import { CLEAR_ERRORS } from '../../actions/types'
import TextFieldGroup from '../common/TextFieldGroup'

const Login = props => {
	const [state, setState] = useState({
		email: '',
		password: '',
	})
	const [errors, setErrors] = useState({})
	const { clearErrors } = props

	//Check if the component has changed, if changed, clean the errros
	useEffect(() => {
		clearErrors()

		if (props.auth.isAuthenticated) {
			props.history.push('/dashboard')
		}
	}, [props.auth, props.history, clearErrors])

	useEffect(() => {
		setErrors(props.errors)
		console.log(props.errors)
	}, [props.errors])

	const handleChange = event => {
		setState({ ...state, [event.target.name]: event.target.value })
	}

	const handleSubmit = event => {
		event.preventDefault()

		const { email, password } = state
		const user = { email, password }
		props.loginUser(user, props.history)
	}

	return (
		<div className='login'>
			<div className='container'>
				<div className='row'>
					<div className='col-md-8 m-auto'>
						<h1 className='display-4 text-center'>Log In</h1>
						<p className='lead text-center'>Sign in to your DevConnector account</p>
						<form onSubmit={handleSubmit}>
							<TextFieldGroup
								type='email'
								name='email'
								placeholder='Email Address'
								value={state.email}
								onChange={handleChange}
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
							<input type='submit' className='btn btn-info btn-block mt-4' />
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	clearErrors: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
	return {
		auth: state.auth,
		errors: state.errors,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		loginUser: (userData, history) => dispatch(loginUser(userData, history)),
		clearErrors: () => dispatch({ type: CLEAR_ERRORS }),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))
