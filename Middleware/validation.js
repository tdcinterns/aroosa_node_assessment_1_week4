const validateTask = (req, res, next) => {
    const { title, description } = req.body;
  
 
    if (!title || title.trim() === '') {
      return res.json({ error: 'Title is Required' });
    }

    if (!description ) {
        return res.json({ error: 'Description is Required' });
    }
  
    if (description && description.length > 255) {
      return res.status(400).json({ error: 'Description must be less than 255 characters' });
    }
  
    next();
  };
  
  module.exports = { validateTask };
  