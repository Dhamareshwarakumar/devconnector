const router = require('express').Router();

const { User } = require('../models');


/**
 * @route   POST api/users
 * @access  Public
 * @desc    Register user
 */
router.post(
    '/',
    // validate
    async (req, res) => { }
);

module.exports = router;