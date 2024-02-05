const User = require('../Models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const saltRounds = 10;
dotenv.config();

exports.signUp = async (req, res) => {
    try {
        const { email, password } = req.body;

        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ email, password : hashedPassword });
        res.json(user);
    } catch (error) {
        res.json({ error: error.message });
    }
};

exports.signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        
        const user = await User.findOne({ email: email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.json({
                error: 'Invalid credentials'
            });
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
            expiresIn: '1h'
        })

        const decodedNewToken = jwt.decode(token);
        console.log('Decoded new token:', decodedNewToken);

        res.json({ token });
    } catch (error) {
        res.json({ error: error.message });
    }
};
