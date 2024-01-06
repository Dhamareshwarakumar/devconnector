const express = require('express');
const app = express();
const dotenv = require('dotenv');
const db = require('./config/db');


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Configuration
dotenv.config();
db.config();


// Constants
const PORT = process.env.PORT || 3333;


// Routes
app.get('/api', (req, res) => {
    return res.json({ msg: "Welcome to DevConnector" });
});
app.get('*', express.static('public/dist'));


// Server
app.listen(PORT, () => console.log(`⚡[server] Server running @${PORT}`));