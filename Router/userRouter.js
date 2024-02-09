const express = require('express');
const userController = require('../Controllers/userController');
const validationMiddleware = require('../Middleware/validation');

const router = express.Router();

router.post('/signIn',validationMiddleware.validateUserSignIn,userController.signIn);
router.post('/signUp',validationMiddleware.validateUserSignUp,userController.signUp);

module.exports = router;
