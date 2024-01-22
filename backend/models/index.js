const mongooseModel = require('mongoose').model;
const userSchema = require('./user.models');

module.exports = {
    User: mongooseModel('user', userSchema)
};