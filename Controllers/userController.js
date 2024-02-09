const User = require('../Models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const saltRounds = 10;
dotenv.config();

exports.signUp = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }else{

        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ email, password : hashedPassword });
        res.status(201).json(user);
        }
    } catch (error) {
        res.json({ error: error.message });
    }
};

exports.signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        
        const user = await User.findOne({ email: email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                error: 'Invalid credentials'
            });
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
            expiresIn: '1h'
        })

        const decodedNewToken = jwt.decode(token);
        console.log('Decoded new token:', decodedNewToken);

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
