const mongoose = require('mongoose');

const ticketschema = new mongoose.Schema({
    id: {
        type: String,
    },
    title: {
        type: String,
        required: [true, 'please enter title'],
    },
    client: {
        type: String,
        required: [true, 'please enter client name'],
    },
    assigned: {
        type: String,
        required: [true, 'please enter assigned client'],
    },
    create: {
        type: Date,
        required: [true, 'please enter created date'],
    },
    due: {
        type: String,
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

ticketschema.pre('save', () => {
    this.create = new Date(this.create);
    this.due = new Date(this.due);
})

const ticket = mongoose.model('ticket', ticketschema);
module.exports = ticket;

