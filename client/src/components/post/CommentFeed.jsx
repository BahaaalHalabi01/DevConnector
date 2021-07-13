import React from 'react'
import PropTypes from 'prop-types'
import CommentItem from './CommentItem'

const CommentFeed = props => {
	const { comments,postId } = props
	return comments.map(item => <CommentItem key={item._id} comment={item} postId={postId} />)
}

CommentFeed.propTypes = {
	comments: PropTypes.array.isRequired,
	postId:PropTypes.string.isRequired
}

export default CommentFeed
