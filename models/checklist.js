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
    dueDate: {
        type: Date,
        
    
    },
    

});


module.exports = mongoose.model('Checklist', checklistSchema);