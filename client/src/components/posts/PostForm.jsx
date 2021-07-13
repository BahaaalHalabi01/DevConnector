import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import { addPost } from '../../actions/postActions'
import { CLEAR_ERRORS } from '../../actions/types'

const PostForm = props => {
	const [text, setText] = useState('')
	const [errors, setErrors] = useState({})

	const handleSubmit = event => {
		event.preventDefault()

		const { user } = props.auth
		const newPost = {
			text,
			name: user.name,
			avatar: user.avatar,
		}
		props.addPost(newPost)
        setText('')

	}

    //Check if the component has changed, if changed, clean the errors
	const {clearErrors} = props
	useEffect(() => {
		clearErrors()
	}, [ props.history, clearErrors])


	const handleChange = event => {
		setText(event.target.value)
	}

	useEffect(() => {
		setErrors(props.errors)

	}, [props.errors])

	return (
		<div className='post-form mb-3'>
			<div className='card card-info'>
				<div className='card-header bg-info text-white'>Say Something...</div>
				<div className='card-body'>
					<form onSubmit={handleSubmit}>
						<div className='form-group'>
							<TextAreaFieldGroup placeholder='Create a post' name='text' value={text} onChange={handleChange} error={errors.text} />
						</div>
						<button type='submit' className='btn btn-dark'>
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

PostForm.propTypes = {
	addPost: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	errors: state.errors,
	auth: state.auth,
})

const clearErrors = () => dispatch => {
	dispatch({ type: CLEAR_ERRORS })
}

export default connect(mapStateToProps, { addPost, clearErrors})(PostForm)
