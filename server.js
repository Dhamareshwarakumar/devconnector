// module imports
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const dotenv = require('dotenv');


// Constants
const PORT = process.env.PORT || 3333;
const MONGODBCONNECTIONPARAMS = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}

// Database Connection
const db = require('./config/keys').mongoURI;
mongoose.connect(db, MONGODBCONNECTIONPARAMS)
    .then(() => console.log('MongoDb Connected'))
    .catch(err => console.error('Failed MongoDB Connection'));

// Middleware
// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// passport
app.use(passport.initialize());


// Configs
// passport
require('./config/passport.js')(passport);
dotenv.config();

// main

// Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));

// Server Static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set Static folder
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


app.listen(PORT, () => console.log(`Server is up and running @${PORT}`));
