const { body, validationResult } = require('express-validator');

const validateTask = (req, res, next) => {
  const { title, description } = req.body;


  if (!title || title.trim() === '') {
    return res.json({ error: 'Title is Required' });
  }

  if (!description) {
    return res.json({ error: 'Description is Required' });
  }

  if (description && description.length > 255) {
    return res.status(400).json({ error: 'Description must be less than 255 characters' });
  }

  next();
};


const validateUserSignIn = [
  body('email').isEmail().notEmpty(),
  body('password').notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors });
    }
    next();
  }
];

const validateUserSignUp = [
  body('email').isEmail().notEmpty(),
  body('password').notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);  //validationResult(req) returns array of error objects
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors });
    }
    next();
  }
];


module.exports = { validateTask ,validateUserSignIn , validateUserSignUp};
