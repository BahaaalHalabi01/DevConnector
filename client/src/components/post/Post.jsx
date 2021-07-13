import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPost } from '../../actions/postActions'
import PostItem from '../posts/PostItem'
import CommentForm from './CommentForm'
import CommentFeed from './CommentFeed'
import Spinner from '../common/Spinner'
import { Link } from 'react-router-dom'

export const Post = props => {
	const { getPost } = props
	const { post, loading } = props.post
	const id = props.match.params.id

	useEffect(() => {
		getPost(id)
	}, [getPost, id])

    

	let postContent
	post === null || loading || Object.keys(post).length === 0
		? (postContent = <Spinner />)
		: (postContent = (
				<div>
					<PostItem post={post} showActions={false} />
                    <CommentForm postId = {post._id}/>
                    <CommentFeed comments = {post.comments} postId={post._id}/>
				</div>
		  ))

	return (
		<div className='post'>
			<div className='container'>
				<div className='row'>
					<div className='col-md-12'>
						<Link to='/feed' className='btn btn-light mb-3'>
							Back to Feed
						</Link>
						{postContent}
					</div>
				</div>
			</div>
		</div>
	)
}

Post.propTypes = {
	post: PropTypes.object.isRequired,
	getPost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	post: state.post,
})

export default connect(mapStateToProps, { getPost })(Post)
