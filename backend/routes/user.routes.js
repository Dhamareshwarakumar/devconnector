const router = require('express').Router();
const { User } = require('../models');
const { registerUser } = require('../controllers/user.controller');
const { validateUserRegistration } = require('../validators/user.validators');
const ApiResponse = require('../utils/ApiResponse');


/**
 * @route   POST api/users
 * @access  Public
 * @desc    User registration
 */
router.post(
    '/',
    validateUserRegistration,
    async (req, res, next) => {
        try {
            const data = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar || '',
            };
            await registerUser(data);

            return new ApiResponse(res, 201, 'User registered successfully');
        } catch (err) {
            next(err);
        }
    }
);

module.exports = router;