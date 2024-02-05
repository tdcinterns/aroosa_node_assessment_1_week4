const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: { 
    type: String, 
    required: true 
    },
    description: { 
    type: String, 
    maxlength: 255 
    },
    status : String,
    user: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User', 
        required: true 
    },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
