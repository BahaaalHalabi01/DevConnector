const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')
//Load validation
const validatePostInput = require('../../validation/post')
//Load Models
const Post = require('../../models/Post')
const Profile = require('../../models/Profile')

// @route GET api/posts/test
// @desc Tests post route
// @access Public
router.get('/test', (req, res) => {
  res.json({ msg: 'Post Works' })
})

// @route  Get api/posts
// @desc   Get posts
// @access Public
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json(err.message))
})

// @route  Get api/posts/:id
// @desc   Get post by id
// @access Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (!post) return res.status(404).json({ error: 'post does not exist' })
      res.json(post)
    })
    .catch(err => res.status(404).json(err))
})

// @route  Post api/posts
// @desc   Create a post
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  //Validation
  const { errors, isValid } = validatePostInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const { text, name, avatar } = req.body
  const user = req.user.id

  const newPost = new Post({
    text,
    name,
    avatar,
    user,
  })

  newPost
    .save()
    .then(post => res.json(post))
    .catch(err => res.json(err.message))
})
// @route  Delete api/posts/:id
// @desc   Delete a certain post
// @access Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id).then(post => {
        //check if the post is found
        if (!post) return res.status(404).json({ error: 'post not found' })
        //check for the post owner
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({ auth: 'not authorized' })
        }
        //delete the post
        post.remove().then(() => res.json({ success: true }))
      })
    })
    .catch(err => res.status(404).json(err))
})
// @route  Post api/posts/like/:id (post id)
// @desc   Like a post
// @access Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id).then(post => {
        //check if the post is found
        if (!post) return res.status(404).json({ error: 'post not found' })
        //check if user already liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
          return res.status(400).json({ like: 'user already liked this post' })
        }
        //add user id to likes array
        post.likes.unshift({ user: req.user.id })
        post.save().then(post => res.json(post))
      })
    })
    .catch(err => res.status(404).json(err))
})
// @route  Post api/posts/unlike/:id (post id)
// @desc   Unlike a post
// @access Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id).then(post => {
        //check if the post is found
        if (!post) return res.status(404).json({ error: 'post not found' })
        //check if user didn't like
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
          return res.status(400).json({ like: 'user did not like this post' })
        }
        //remove like - get index
        const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id)
        //splice it
        post.likes.splice(removeIndex, 1)
        //save
        post.save().then(post => res.json({ like: 'removed like from this post' }))
      })
    })
    .catch(err => res.status(404).json(err))
})
// @route  Post api/posts/comment/:id (post id)
// @desc   Comment on a post
// @access Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  //check validation
  const { errors, isValid } = validatePostInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  const { text, name, avatar } = req.body
  const user = req.user.id

  Post.findById(req.params.id)
    .then(post => {
      //check if the post is found
      if (!post) return res.status(404).json({ error: 'post not found' })
      const newComment = {
        text,
        name,
        avatar,
        user,
      }
      //add to comments array
      post.comments.unshift(newComment)
      //save
      post.save().then(post => res.json(post))
    })
    .catch(err => res.status(404).json(err))
})
// @route  Delete api/posts/comment/:id/:comment_id
// @desc   Delete a comment from a post
// @access Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id).then(post => {
        //check if the post is found
        if (!post) return res.status(404).json({ error: 'post not found' })
        //check if the comment exists
        if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
          return res.status(404).json({comment:'Comment does not exist'})
        }

        //get remove index
        const removeIndex = post.comments.map(comment=>comment._id.toString()).indexOf(req.params.comment_id)
        //splice it out of the array
        post.comments.splice(removeIndex,1)
        //save
        post.save().then(post=>res.json(post))
      })
    })
    .catch(err => res.status(404).json(err))
})

module.exports = router
