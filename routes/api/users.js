const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// load inpu validation
const validateRegisterInput = require('../../validation/registration');
const validateLoginInput = require('../../validation/login');

const User = require('../../models/User');
const keys = require('../../config/keys');


// @route   POST /api/users/register
// @desc    Register the user
// @access  public
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body)

    console.log(errors);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors)
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                errors.email = 'Email Already Exists';
                return res.status(400).json({ errors })
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200',   // Size
                    r: 'pg',     // rating
                    d: 'mm'     // Default
                });

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.error('Internal Database Error'));
                    })
                })
            };
        })
        .catch(err => console.error('Internal Database Error'));
});

// @route   POST /api/users/login
// @desc    Login User / Return JWT Token
// @access  public
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body)

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors)
    }

    // Check whether user exists or not
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                // Check password
                bcrypt.compare(req.body.password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            // User Matched
                            const payload = {
                                id: user.id,
                                name: user.name,
                                avatar: user.avatar
                            };
                            // Sign Token
                            jwt.sign(
                                payload,
                                keys.secretOrKey,
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if (err) throw err;
                                    res.json({
                                        success: true,
                                        token: "Bearer " + token
                                    })
                                }
                            );
                        } else {
                            errors.password = "Password Incorrect";
                            return res.status(400).json({ errors })
                        }
                    })
            } else {
                errors.email = "User Not Found"
                return res.status(400).json({ errors })
            }
        })
})


// @route   GET /api/users/current
// @desc    return current user
// @access  Private
router.get('/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        });
    }
);


module.exports = router;