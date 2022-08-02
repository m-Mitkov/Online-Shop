const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser');

module.exports = app => {

    app.use(express.json());

    app.use(cors({
        credentials: true,
        origin: 'http://localhost:3000'
}));

    app.use(cookieParser())
};