const Task = require('../Models/taskModel');

exports.createTask = async (req, res) => {
    console.log('in create task user ', req.user);
    const { title, description, status } = req.body;
    const userId = req.user.userId;

    try {
        const newTask = await Task.create({ title, description, status, user: userId });
        res.json(newTask);
    } catch (error) {
        res.json({ error: error.message });
    }
};


exports.updateTask = async (req, res) => {
    const { title, description, status } = req.body;
    const taskId = req.params.id;
    const userId = req.user.userId;

    try {
        const updatedTask = await Task.findOneAndUpdate({ _id: taskId, user: userId }, { title, description, status }, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSingleTask = async (req, res) => {
    const taskId = req.params.id;
    const userId = req.user.userId;

    try {
        const task = await Task.findOne({ _id: taskId, user: userId });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



exports.deleteTask = async (req, res) => {
    const taskId = req.params.id;
    const userId = req.user.userId;

    try {
        const deletedTask = await Task.findOneAndDelete({ _id: taskId, user: userId });

        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json(deletedTask);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




exports.getAllTasks = async (req, res) => {
    const userId = req.user.userId;
    try {
        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 1;
        let skip = (page - 1) * limit;

        const userTasks = await Task.find({ user: userId }).skip(skip).limit(limit);

        res.json(userTasks);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

