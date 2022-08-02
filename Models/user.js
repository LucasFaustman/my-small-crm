const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto')

const userschema =  new mongoose.Schema({
    // first_name: {
    //     type: String,
    // },
    // last_name: {
    //     type: String,
    // },
    email: {
        type: String,
        required: [true, 'Please Enter an email.'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email.']
    },
    // phone: {
    //     type: Number,
    // },
    // image: {
    //     type: String
    // },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [8, 'Minimum password length is 8 characters.'],
        select: false
    },
    // role: {
    //     type: String,
    // },
    // confirm_password: {
    //     type: String,
    //     required: [true, 'Please confirm password'],
    //     minlength: 6,
    //     validate: {
    //         validator: function (el) {
    //             return el === this.password;
    //         },
    //         message: 'Passwords do not match.'
    //     }
    // },
    changePasswordAt: {
        type: Date,
        default: Date.now()
    },
    // passwordtoken: String,
    // passwordtokenexp: Date,
    // joining_date: Date,
    // skills: [{ type: String }],
    // designation: String,
    // website: String,
    // city: String,
    // country: String,
    // zipcode: String,
    // Description: String
})


//fire function before doc saved to db
//pre is before. before we want to save to db, we want to hash password then save
userschema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    if (!this.isModified('password')) return next;
    this.password = await bcrypt.hash(this.password, salt);
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
