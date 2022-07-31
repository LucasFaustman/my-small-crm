const mongoose = require('mongoose');

const roleschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please enter name'],
    }
});

const role = mongoose.model('role', roleschema);
module.exports = role;

