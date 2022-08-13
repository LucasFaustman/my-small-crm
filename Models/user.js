const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto')
const {crm_lead} = require('./crm')
const {crm_company} = require('./crm')
const task = require('./task')

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
    },
    allTasks: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "task"
  }],
  leads: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: '{crm_lead}'
}],
companies: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: '{crm_company}'
}]
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
    // changePasswordAt: {
    //     type: Date,
    //     default: Date.now()
    // },
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
    this.password = await bcrypt.hash(this.password, salt);
    next()
});

//static method to login user


userschema.statics.login = async function(email, password) { 

    //declare a variable called user. we want to look inside of our db for an email matching the email we passed in as a parameter
    const user = await this.findOne({ email });

    
    if (user) {
        //if there is a match, then use a bcrypt method to compare our passed in password with our password in the db
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
          //if the password matches, return the user
        return user
      }
      //if password doesn't match, return incorrect password
      throw new Error('Incorrect email and/or password.');
    }
    //if email doesnt exist, then return back incorrect email
    throw new Error('Incorrect email and/or password.');
  };

// userschema.methods.correctPassword = async function (userpassword, dbpassword) {
//     return await bcrypt.compare(userpassword, dbpassword)
// }

// userschema.methods.changepasswordafter = function (JWTtime) {
//     if (this.changePasswordAt) {
//         const timestamp = parseInt(this.changePasswordAt.getTime() / 1000, 10);
//         return JWTtime < timestamp;
//     }
//     return false;
// }

// userschema.methods.PassdResetToken = function () {
//     const resettoken = crypto.randomBytes(32).toString('hex');
//     this.passwordtoken = crypto.createHash('sha256').update(resettoken).digest('hex');
//     this.passwordtokenexp = Date.now() + 10 * 60 * 1000;
//     return resettoken;
// }

const user = mongoose.model('user', userschema);
module.exports = user;
