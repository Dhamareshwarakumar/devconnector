const validator = require('validator');
const is_empty = require('./is_empty');

module.exports = function validateProfileInput(data) {
    let errors = {};


    data.handle = !is_empty(data.handle) ? data.handle : '';
    data.status = !is_empty(data.status) ? data.status : '';
    data.skills = !is_empty(data.skills) ? data.skills : '';

    if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = "Handle needs to be between 2 and 4 Characters"
    }

    if (validator.isEmpty(data.handle)) {
        errors.handle = "Profile Handle is Required"
    }

    if (validator.isEmpty(data.status)) {
        errors.status = "Status field is Required"
    }

    if (validator.isEmpty(data.skills)) {
        errors.skills = "Skills field is Required"
    }

    if (!is_empty(data.website)) {
        if (!validator.isURL(data.website)) {
            errors.website = 'Not a Valid URL'
        }
    }

    if (!is_empty(data.youtube)) {
        if (!validator.isURL(data.youtube)) {
            errors.youtube = 'Not a Valid URL'
        }
    }
    if (!is_empty(data.twitter)) {
        if (!validator.isURL(data.twitter)) {
            errors.twitter = 'Not a Valid URL'
        }
    }
    if (!is_empty(data.facebook)) {
        if (!validator.isURL(data.facebook)) {
            errors.facebook = 'Not a Valid URL'
        }
    }
    if (!is_empty(data.linkedin)) {
        if (!validator.isURL(data.linkedin)) {
            errors.linkedin = 'Not a Valid URL'
        }
    }
    if (!is_empty(data.instagram)) {
        if (!validator.isURL(data.instagram)) {
            errors.instagram = 'Not a Valid URL'
        }
    }

    return {
        errors,
        isValid: is_empty(errors)
    }
}