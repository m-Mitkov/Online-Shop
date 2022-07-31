const User = require('../models/user');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/config');

async function registerUser(data) {

    const { username, password, rePassword, permissions } = data || {};
    
    const user = await User.findOne({ username });

    if (password !== rePassword) throw JSON.stringify(({
        type: 'error',
        message: 'Password missmatch'
    }));
    
    if (user) throw JSON.stringify(({
        type: 'error',
        message: 'User with such username already exist!'
    }));

    const userObj = { username, password, permissions };
    const newUser = new User(userObj);

    return await newUser.save();
}

async function login(data) {
    let { username, password } = data || {};

    const user = await User.findOne({ username });
    if (!user) throw JSON.stringify(({
        type: 'error',
        message: 'Incorect username or password'
    }));

    const isCorrectPassword = bcrypt.compareSync(password, user.password);
    if (!isCorrectPassword) throw JSON.stringify(({
        type: 'error',
        message: 'Incorect username or password'
    }));

    const token = {
        _id: user._id,
        username: user.username,
        permissions: user.permissions
    };

    return {
        token: jwt.sign(token, SECRET),
        userCredentials: token
    }
}

module.exports = {
    registerUser,
    login
}