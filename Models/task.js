const mongoose = require('mongoose');
const User = require('./user')


const taskschema = new mongoose.Schema({
    tasksTitleFieldVal: {
        type: String,
        required: [true, 'Please enter task name.'],
    },
    clientNameFieldVal: {
        type: String,
        required: [true, 'Please enter client name.'],
    },
    dateDueFieldVal: {
        type: Date,
        required: [true, 'please enter due date'],
    },
    statusFieldVal: {
        type: String,
        required: [true, 'please enter status'],
    },
    priorityFieldVal: {
        type: String,
        required: [true, 'please enter priority'],
    },
    leadOwner: [{
        type: mongoose.Schema.Types.ObjectId,
      }],
      owner: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }]

});

const task = mongoose.model('task', taskschema);
module.exports = task;

