const mongoose = require('mongoose');

const { DB_CONNECTION } = require('./config');

module.exports = app => {

    mongoose.connect(DB_CONNECTION);

    const db = mongoose.connection;
    db.on('open', () => console.log('DB successfully conected!'));
}