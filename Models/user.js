const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto')

const userschema = mongoose.Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        uniqued: true,
        validate: [validator.isEmail, 'please provide valid email']
    },
    phone: {
        type: Number,
    },
    image: {
        type: String
    },
    password: {
        type: String,
        required: [true, 'please Enter password'],
        minlength: 6,
        select: false
    },
    role: {
        type: String,
    },
    confirm_password: {
        type: String,
        required: [true, 'please Enter confirm password'],
        minlength: 6,
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: 'password not match'
        }
    },
    changePasswordAt: {
        type: Date,
        default: Date.now()
    },
    passwordtoken: String,
    passwordtokenexp: Date,
    joining_date: Date,
    skills: [{ type: String }],
    designation: String,
    website: String,
    city: String,
    country: String,
    zipcode: String,
    Description: String
})

userschema.pre('save', async function (next) {
    if (!this.isModified('password')) return next;
    this.password = await bcrypt.hash(this.password, 12);
    next()
})

userschema.methods.correctPassword = async function (userpassword, dbpassword) {
    return await bcrypt.compare(userpassword, dbpassword)
}

userschema.methods.changepasswordafter = function (JWTtime) {
    if (this.changePasswordAt) {
        const timestamp = parseInt(this.changePasswordAt.getTime() / 1000, 10);
        return JWTtime < timestamp;
    }
    return false;
}

userschema.methods.PassdResetToken = function () {
    const resettoken = crypto.randomBytes(32).toString('hex');
    this.passwordtoken = crypto.createHash('sha256').update(resettoken).digest('hex');
    this.passwordtokenexp = Date.now() + 10 * 60 * 1000;
    return resettoken;
}

const user = mongoose.model('user', userschema);
module.exports = user;
