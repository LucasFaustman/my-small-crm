const mongoose = require('mongoose');
const User = require('./user')
const {crm_lead} = require('./crm')


const dealschema = new mongoose.Schema({

    dealTitle: {
        type: String,
        required: [true, 'Please enter deal title.'],
    },
    leadOwner: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "crm_lead"
      }],
      companyName: {
        type: String,
        required: [true, 'Please enter a company name'],
    },
    stage: {
        type: String,
        required: [true, 'Please enter a stage.'],
    },
    value: {
        type: String,
        required: [true, 'Please enter value.'],
    },
    dueDate: {
        type: String,
        required: [true, 'please enter due date'],
    },
    description: {
        type: String,
        required: [true, 'please enter contact number'],
    },
      owner: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }]

});

const deal = mongoose.model('deal', dealschema);
module.exports = deal;