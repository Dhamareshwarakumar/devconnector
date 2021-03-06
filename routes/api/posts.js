const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Models
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

// Load Validations
const validatePostInput = require('../../validation/post');


// @route   POST /api/posts
// @desc    Create Post
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body)

    // Check validatoin
    if (!isValid) {
        // if Any erros send 400 with erros obj
        return res.status(400).json(errors)
    }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    newPost.save().then(post => res.json(post));
});


// @route   GET /api/posts
// @desc    Get Posts
// @access  Private
router.get('/', (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ nopostsfound: "No Posts Found" }));
})

// @route   GET /api/posts/:id
// @desc    Get Post by ID
// @access  Private
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(404).json({ nopostfound: "Post not found" }));
})


// @route   DELETE /api/posts/:id
// @desc    Delete Post
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    // Check for Post Owner
                    if (post.user.toString() !== req.user.id) {
                        return res.status(401).json({ notauthorized: 'User not Authorized' });
                    }
                    // Delete
                    post.remove()
                        .then(() => res.json({ success: true }));
                })
                .catch(err => res.status(404).json({ postnotfound: "No Posts Found" }))
        })
})


// @route   POST /api/posts/like/:id
// @desc    Like Post
// @access  Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                        return res.status(400).json({ alreadyliked: "User Already Liked this post" })
                    } else {
                        // Add User id to likes array
                        post.likes.unshift({ user: req.user.id });

                        post.save().then(post => res.json(post))
                    }
                })
                .catch(err => res.status(404).json({ postnotfound: "No Posts Found" }))
        })
})

// @route   POST /api/posts/unlike/:id
// @desc    unlike Post
// @access  Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                        return res.status(400).json({ notliked: "You have not yet liked this post" })
                    } else {
                        // GEt Remove indesx
                        const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id)

                        // Splice out of array
                        post.likes.splice(removeIndex, 1);

                        // Save
                        post.save().then(post => res.json(post))
                    }
                })
                .catch(err => res.status(404).json({ postnotfound: "No Posts Found" }))
        })
})


// @route   POST /api/posts/comment/:id
// @desc    Comment on a post
// @access  Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body)

    // Check validatoin
    if (!isValid) {
        // if Any erros send 400 with erros obj
        return res.status(400).json(errors)
    }

    Post.findById(req.params.id)
        .then(post => {
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
            };

            // Add to comments
            post.comments.unshift(newComment)

            // Save
            post.save().then(post => res.json(post))
        })
        .catch(err => res.status(404).json({ postnotfound: "No Posts Found" }))
})


// @route   DELETE /api/posts/comment/:id/:comment_id
// @desc    DELETE Comment from a post
// @access  Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            // Check if comment exists
            if (post.comments.filter(comment => comment.id === req.params.comment_id).length === 0) {
                return res.status(404).json({ commentnotexist: "Comment Does not Exist" });
            }

            // get remove index
            const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id);

            // Splice out of the array
            post.comments.splice(removeIndex, 1);

            post.save().then(post => res.json(post))
        })
        .catch(err => res.status(404).json({ postnotfound: "No Posts Found" }))
})

module.exports = router;
