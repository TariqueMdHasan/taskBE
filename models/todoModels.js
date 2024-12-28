const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['done', 'todo', 'inProgress', 'backlog'],
        default: 'todo'
    },
    subTodo: {
        type: [String],
        default: [],
        completed: {
            type: Boolean,
            default: false
        }
    },
    dueDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Todo', todoSchema);