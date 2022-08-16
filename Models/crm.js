const mongoose = require('mongoose');
const validator = require('validator');
const Task = require('./task')
const Deal = require('./deals')

const contactschema = new mongoose.Schema({
    image_src: String,
    name: {
        type: String,
        required: [true, 'please enter name'],
    },
    company: {
        type: String,
        required: [true, 'please enter company name'],
    },
    designation: {
        type: String,
        required: [true, 'please enter designation'],
    },
    email: {
        type: String,
        uniqued: true,
        validate: [validator.isEmail, 'please provide valid email']
    },
    phone: {
        type: String,
        min: 8,
        required: [true, 'please enter phone'],
    },
    tags: [{
        type: String
    }],
    lead_score: {
        type: Number,
        required: [true, 'please enter lead score'],
    },
    last_contacted: {
        type: Date,
        required: [true, 'please enter date of last contacted'],
    },

});

const companyschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please enter company_name'],
    },
    lead: {
        type: String,
        required: [true, 'please enter company owner'],
    },
    industry_type: {
        type: String,
        required: [true, 'please enter industry_type'],
    },
    star_value: {
        type: Number,
        required: [true, 'please enter rating'],
    },
    location: {
        type: String,
        required: [true, 'please enter location'],
    },
    employee: {
        type: String,
    },
    website: {
        type: String
    },
    contact_email: {
        type: String,
    },
     owner: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }]

});

const leadschema = new mongoose.Schema({
    leadsId: String,
    name: {
        type: String,
        required: [true, 'please enter name'],
    },
    company: {
        type: String,
        required: [true, 'please enter company'],
    },
    score: {
        type: Number,
        required: [true, 'please enter lead_score'],
    },
    phone: {
        type: String,
        min: 10,
        required: [true, 'please enter phone'],
    },
    tags: [{
        type: String,
    }],
    location: {
        type: String,
        required: [true, 'please enter location'],
    },
    date: {
        type: Date,
        required: [true, 'please enter created date'],
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
    }],
    deals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Deal"
    }],
    owner: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }]

});

leadschema.pre('save', () => [
    this.date = new Date(this.date)
])

const crm_contact = mongoose.model('crm_contact', contactschema);
const crm_company = mongoose.model('crm_company', companyschema);
const crm_lead = mongoose.model('crm_lead', leadschema);
module.exports = { crm_contact, crm_company, crm_lead };