const { NAME_REGEX, EMAIL_REGEX, PASSWORD_REGEX } = require('../utils/constants');
const { isEmpty, validateUrl } = require('../utils/validator');
const ApiError = require('../utils/ApiError');

// FIXME: Except password validation all the checks are redundant compared to mongoose validation
const validateUserRegistration = (req, res, next) => {
    let errors = {};

    try {
        // Name validation
        if (isEmpty(req.body.name)) {
            errors.name = 'Name is required';
        } else if (typeof req.body.name !== 'string') {
            errors.name = 'Please provide a valid name';
        } else {
            req.body.name = req.body.name.trim();
            if (!NAME_REGEX.test(req.body.name)) {
                errors.name = 'Please provide a valid name';
            } else if (req.body.name.length < 3 || req.body.name.length > 255) {
                errors.name = 'Name cannot be less than 3 characters and more than 255 characters';
            }
        }

        // Email validation
        if (isEmpty(req.body.name)) {
            errors.email = 'Email is required';
        } else if (typeof req.body.email !== 'string') {
            errors.email = 'Please provide a valid email';
        } else {
            req.body.email = req.body.email.trim().toLowerCase();
            if (!EMAIL_REGEX.test(req.body.email)) {
                errors.email = 'Please provide a valid email';
            } else if (req.body.email.length < 3 || req.body.email.length > 255) {
                errors.email = 'Email cannot be less than 3 characters and more than 255 characters';
            }
        }

        // Password validation
        if (isEmpty(req.body.password)) {
            errors.password = 'Password is required';
        } else if (typeof req.body.password !== 'string') {
            errors.password = 'Please provide a valid password';
        } else {
            if (!PASSWORD_REGEX.test(req.body.password)) {
                errors.password = 'Password must contain at least two uppercase letters, two lowercase letters, two numbers, and two special characters';
            }
        }

        // Avatar validation
        if (!isEmpty(req.body.avatar)) {
            if (typeof req.body.avatar !== 'string') {
                errors.avatar = 'Please provide a valid URL';
            } else {
                req.body.avatar = req.body.avatar.trim();
                if (!validateUrl(req.body.avatar)) {
                    errors.avatar = 'Please provide a valid URL';
                }
            }
        }

        // check if there are any errors
        if (!isEmpty(errors)) {
            throw new ApiError(422, 'Validation error', errors);
        }

        next();
    } catch (err) {
        next(err);
    }
}

module.exports = {
    validateUserRegistration
}