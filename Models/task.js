const mongoose = require('mongoose');
const User = require('./user')


const taskschema = new mongoose.Schema({
    // taskId: String,
    // project: {
    //     type: String,
    //     required: [true, 'please enter project name'],
    // },
    tasksTitleFieldVal: {
        type: String,
        required: [true, 'Please enter task name.'],
    },
    clientNameFieldVal: {
        type: String,
        required: [true, 'Please enter client name.'],
    },
    // subItem: [{
    //     id: String,
    //     img: String,
    // }],
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
        ref: "User"
      }],
      owner: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }]

});

const task = mongoose.model('task', taskschema);
module.exports = task;

