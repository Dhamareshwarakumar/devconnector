const validator = require('validator');
const isEmpty = require('./is_empty');
const is_empty = require('./is_empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.name = !is_empty(data.name) ? data.name : '';
    data.email = !is_empty(data.email) ? data.email : '';
    data.password = !is_empty(data.password) ? data.password : '';
    data.password2 = !is_empty(data.password2) ? data.password2 : '';


    if (!validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 Characters';
    }

    if (validator.isEmpty(data.name)) {
        errors.name = 'Name Field is required'
    }

    if (validator.isEmpty(data.email)) {
        errors.email = 'Email Field is required'
    }

    if (!validator.isEmail(data.email)) {
        errors.email = 'Email is Invalid'
    }

    if (validator.isEmpty(data.password)) {
        errors.password = 'Password Field is required'
    }

    if (!validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be atleast 6 characters'
    }

    if (validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm Password Field is required'
    }

    if (!validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords Must Match'
    }

    return {
        errors,
        isValid: is_empty(errors)
    }
}