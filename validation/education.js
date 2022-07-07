const validator = require('validator');
const is_empty = require('./is_empty');
module.exports = function validateExperienceInput(data) {
    let errors = {};


    data.school = !is_empty(data.school) ? data.school : '';
    data.degree = !is_empty(data.degree) ? data.degree : '';
    data.fieldofstudy = !is_empty(data.fieldofstudy) ? data.fieldofstudy : '';
    data.from = !is_empty(data.from) ? data.from : '';


    if (validator.isEmpty(data.school)) {
        errors.school = 'School field is required';
    }
    if (validator.isEmpty(data.degree)) {
        errors.degree = 'Degree field is required';
    }
    if (validator.isEmpty(data.fieldofstudy)) {
        errors.fieldofstudy = 'Field of Study Date field is required';
    }
    if (validator.isEmpty(data.from)) {
        errors.from = 'From Date field is required';
    }

    return {
        errors,
        isValid: is_empty(errors)
    }
}