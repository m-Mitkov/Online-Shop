const jwt = require('jsonwebtoken');
const { SECRET, AUTH_COOKIE_JWT } = require('../config/config');

module.exports = (req, res, next) => {
    const JWTtoken = req.headers[AUTH_COOKIE_JWT];
    const token = jwt.verify(JWTtoken, SECRET)
    console.log(token, 'token');

    if (token) {
        res.locals.user = {
            id: token._id,
            permissions: token.permissions
        };
        return next();
    }
    else {
        res.locals.user = {
            id: null,
            permissions: null
        };
        return next();
    }
};