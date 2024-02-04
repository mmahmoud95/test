const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');
// const bodyParser = require('body-parser')
const router = require('./router/router');
const path = require('path');

// connecet on express server and make him spurt Json
const app = express();

// see if data are safe to go in database or thre are dangers useing core modules
app.use(cors());

// to can use res as json
app.use(express.json({limit: '10mb'}));


//required the database from config to run moongoes
db()
// make the app read the image and open it in browser
app.use('/public/images', express.static(path.join(__dirname, 'public', 'images')));

// to see all status in tarmanl (console) useing morgan modules
app.use(morgan('dev'));

// use router but out sade this page in router folder
// and required the file here and use it
app.use('/', router);

// listen to env port to start the server
const port = process.env.PORT
app.listen(process.env.PORT || 4001,  () => {
    console.log(`App listening on port ${port}`)
});