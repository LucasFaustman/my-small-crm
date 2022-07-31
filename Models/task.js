const mongoose = require('mongoose');

const taskschema = new mongoose.Schema({
    taskId: String,
    project: {
        type: String,
        required: [true, 'please enter project name'],
    },
    task: {
        type: String,
        required: [true, 'please enter title'],
    },
    creater: {
        type: String,
        required: [true, 'please enter client name'],
    },
    subItem: [{
        id: String,
        img: String,
    }],
    dueDate: {
        type: Date,
        required: [true, 'please enter due date'],
    },
    status: {
        type: String,
        required: [true, 'please enter status'],
    },
    priority: {
        type: String,
        required: [true, 'please enter priority'],
    },
});

const task = mongoose.model('task', taskschema);
module.exports = task;

