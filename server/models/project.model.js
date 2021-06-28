const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    timesheets: {
        type: Array,
        required: false
    }
})

module.exports = mongoose.model('Project', projectSchema);