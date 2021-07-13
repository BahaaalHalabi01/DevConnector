import React from 'react'
import PropTypes from 'prop-types'
import PostItem from './PostItem'

const PostFeed = (props) => {
    
    const {posts} = props
    return posts.map(item => <PostItem key={item._id} post={item}/>)
      
    
}

PostFeed.propTypes = {
    posts:PropTypes.array.isRequired
}

export default PostFeed
