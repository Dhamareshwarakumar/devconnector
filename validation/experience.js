const validator = require('validator');
const is_empty = require('./is_empty');
module.exports = function validateExperienceInput(data) {
    let errors = {};


    data.title = !is_empty(data.title) ? data.title : '';
    data.company = !is_empty(data.company) ? data.company : '';
    data.from = !is_empty(data.from) ? data.from : '';


    if (validator.isEmpty(data.title)) {
        errors.title = 'Job Title is required';
    }
    if (validator.isEmpty(data.company)) {
        errors.company = 'Company field is required';
    }
    if (validator.isEmpty(data.from)) {
        errors.from = 'From Date field is required';
    }

    return {
        errors,
        isValid: is_empty(errors)
    }
}