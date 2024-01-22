const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const { validateUrl } = require('../utils/validator');
const { EMAIL_REGEX } = require('../utils/constants');

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name is required'],
        minlength: [3, 'Name cannot be less than 3 characters'],
        maxlength: [255, 'Name cannot be more than 255 characters']
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: [true, 'Email is required'],
        unique: [true, 'Email already exists'],
        minlength: [3, 'Email cannot be less than 3 characters'],
        maxlength: [255, 'Email cannot be more than 255 characters'],
        match: [EMAIL_REGEX, 'Please provide a valid email']
    },
    avatar: {
        type: String,
        trim: true,
        validate: {
            validator: validateUrl,
            message: 'Please provide a valid URL'
        }
    },
    hashed_password: {
        type: String,
        required: [true, 'Password is required'],
    },
    salt: {
        type: String,
        default: uuidv4()
    }
}, { timestamps: true });

// Virtuals
userSchema.virtual('password')
    .set(function (plainPassword) {
        this.hashed_password = this.hashPassword(plainPassword);
    });

// Methods  (DO NOT USE ARROW FUNCTIONS TO CREATE MONGOOSE METHODS)
userSchema.methods.hashPassword = function (plainPassword) {
    if (!plainPassword) return "";
    try {
        return crypto.createHmac('sha256', this.salt)
            .update(plainPassword)
            .digest('hex');
    } catch (err) {
        throw new mongoose.Error(`[UserModel][hashPassword]: ${err}`);
    }

}

module.exports = userSchema;