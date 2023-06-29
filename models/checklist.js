const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checklistSchema = new Schema({
    projectName: {
        type: String,
        required: true
    },
    tasks: {
        type: [String],
        required: true
    },
    timeExpected: {
        type: Number,
        min: 1,
        max: 100
    },
    startDate: {
        type: Date,
        // default: function () {
        //     return new Date(new Date().setFullYear(new Date().getFullYear() + 1));
        // },
    },
    completed:{
        type: Boolean,
        default: false,
    }


});


module.exports = mongoose.model('Checklist', checklistSchema);