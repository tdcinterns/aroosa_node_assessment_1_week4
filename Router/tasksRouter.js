const express = require('express');
const taskController = require('../Controllers/taskController');
const validationMiddleware = require('../Middleware/validation');
const authMiddleware = require('../Middleware/authentication');

const router = express.Router();

router.post('/task/create',authMiddleware.authenticatation,validationMiddleware.validateTask,taskController.createTask);
router.put('/task/update/:id', authMiddleware.authenticatation, validationMiddleware.validateTask, taskController.updateTask);
router.get('/task/get/:id', authMiddleware.authenticatation, taskController.getSingleTask);
router.delete('/task/del/:id', authMiddleware.authenticatation, taskController.deleteTask);
router.get('/task/getAll', authMiddleware.authenticatation, taskController.getAllTasks);

module.exports = router;
