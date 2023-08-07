require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const userService = require('./userService');

function hashPassword(plainTextPassword) {
    return bcrypt.hash(plainTextPassword, parseInt(process.env.SALT_ROUNDS));
}

function comparePasswords(plainTextPassword, hash) {
    return bcrypt.compare(plainTextPassword, hash);
}

function createToken(data) {
    return jwt.sign({ data }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

exports.signIn = async (req, res) => {
    const { username, password } = req.body;
    const user = await userService.getUserByUsername(username);
    if (!user) throw new Error('User not found');
    const match = await comparePasswords(password, user.password);
    if (!match) throw new Error('Wrong password');
    const token = createToken({ id: user._id });
    res.json({ token });
}

exports.signUp = async (username, password) => {
    if (!username || !password) {
        throw new Error('Missing username or password');
    }
    const user = await userService.getUserByUsername(username);
    if (user) throw new Error('User already exists');
}

exports.hashPassword = hashPassword;
exports.comparePasswords = comparePasswords;
exports.createToken = createToken;