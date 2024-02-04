const mongoose = require('mongoose');
// to make the page can use .env if delte it the connection will not run
require('dotenv').config();

// connect in mongoose datapase but useing .env
async function db() {
    mongoose.set({strictQuery: false})
    try {
        await mongoose.connect(process.env.DB_URL).then(console.log('Connected on mongoose database'))
    } catch (e) {
        console.log(e)
    }
};

module.exports = db;