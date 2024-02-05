const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

const authenticatation = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.json({ error: 'Unauthorized -> Token is missing' });
    }

    if (typeof token !== 'undefined') {
        const bearer = token.split(" ");
        const tokenValue = bearer[1];
        
        jwt.verify(tokenValue, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                return res.json({ error: 'Invalid token' });
            }
            console.log('User:', user); 
            req.user = user; 
            next();
        });
    } else {
        return res.json({ error: 'Unauthorized -> Token is missing' });
    }
};

module.exports = { authenticatation };
