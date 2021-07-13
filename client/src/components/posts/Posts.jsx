import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PostForm from './PostForm'
import PostFeed from './PostFeed'
import Spinner from '../common/Spinner'
import { getPosts } from '../../actions/postActions'


export const Posts = (props) => {

    const {getPosts} = props
    useEffect(()=>{
        getPosts()
    },[getPosts])

    const {posts,loading} = props.post
    let postContent

    if(posts === null || loading){
        postContent=<Spinner/>
    }else{
        postContent=<PostFeed posts ={posts}/>
    }

    return (
        <div className='feed'>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <PostForm/>
                        {postContent}
                    </div>
                </div>
            </div>
        </div>
    )
}

Posts.propTypes = {
    getPosts:PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    post:state.post
    
})



export default connect(mapStateToProps, {getPosts})(Posts)
