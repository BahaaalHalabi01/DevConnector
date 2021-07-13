import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import { deletePost, addLike, removeLike } from '../../actions/postActions'

const PostItem = props => {
	const { post, auth, showActions } = props

	const findUserLike = () => {
		if (post.likes.filter(like => like.user === auth.user.id).length > 0) {
			return true
		} else {
			return false
		}
	}
	let actions
	showActions
		? (actions = (
				<div>
					<button
						type='button'
						className='btn btn-light mr-1'
						onClick={() => {
							props.addLike(post._id)
						}}>
						<i className={classnames('fas fa-thumbs-up', { 'text-success': findUserLike() })}></i>
						<span className='badge badge-light'>{post.likes.length}</span>
					</button>
					<button
						type='button'
						className='btn btn-light mr-1'
						onClick={() => {
							props.removeLike(post._id)
						}}>
						<i className='text-secondary fas fa-thumbs-down'></i>
					</button>
					<Link to={`/post/${post._id}`} className='btn btn-info mr-1'>
						Comments
					</Link>
					{post.user === auth.user.id ? (
						<button
							className='btn btn-danger mr-1'
							type='button'
							onClick={() => {
								props.deletePost(post._id)
							}}>
							<i className='fas fa-times' />
						</button>
					) : null}
				</div>
		  ))
		: (actions = null)

	return (
		<div className='card card-body mb-3'>
			<div className='row'>
				<div className='col-md-2'>
					<a href='profile.html'>
						<img className='rounded-circle d-none d-md-block' src={post.avatar} alt='' />
					</a>
					<br />
					<p className='text-center'>{post.name}</p>
				</div>
				<div className='col-md-10'>
					<p className='lead'>{post.text}</p>
					{actions}
				</div>
			</div>
		</div>
	)
}
PostItem.defaultProps = {
	showActions: true,
}

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	deletePost: PropTypes.func.isRequired,
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
	showActions: PropTypes.bool,
}

const mapStateToProps = state => ({
	auth: state.auth,
})

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(PostItem)
