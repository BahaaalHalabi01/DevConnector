import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {deleteComment } from '../../actions/postActions'

export const CommentItem = (props) => {

    const {comment,postId,auth} = props

    return (
        <div className="card card-body mb-3">
              <div className="row">
                <div className="col-md-2">
                  <a href="profile.html">
                    <img className="rounded-circle d-none d-md-block" src={comment.avatar} alt="" />
                  </a>
                  <br />
                  <p className="text-center">{comment.name}</p>
                </div>
                <div className="col-md-10">
                  <p className="lead">{comment.text}</p>
                  {comment.user === auth.user.id ? (
						<button
							className='btn btn-danger mr-1'
							type='button'
							onClick={() => {
								props.deleteComment(postId,comment._id)
							}}>
							<i className='fas fa-times' />
						</button>
					) : null}
                </div>
              </div>
            </div>
    )
}

CommentItem.propTypes = {
    deleteComment:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    comment:PropTypes.object.isRequired,
    postId:PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
    auth:state.auth
})



export default connect(mapStateToProps, {deleteComment})(CommentItem)
