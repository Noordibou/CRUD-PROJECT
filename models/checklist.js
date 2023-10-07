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
        get: (date) => date.toLocaleDateString(),
        set: (dateString) => new Date(dateString)
    },
    tasksCompletionStatus: {
        type: [Boolean],
        default: []
    },
    completed: {
        type: Boolean,
        default: false
    }
});

// checklistSchema.pre('save', function (next) {
//     if (this.tasksCompletionStatus.every((status) => status === true)) {
//         this.completed = true;
//     } else {
//         this.completed = false;
//     }
//     next();
// });

module.exports = mongoose.model('Checklist', checklistSchema);
