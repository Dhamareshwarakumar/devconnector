const express = require('express');
const app = express();
const dotenv = require('dotenv');
const db = require('./config/db');

// Import Routers
const {
    userRouter
} = require('./routes');


// Middlewares
app.use(express.json());


// Configuration
dotenv.config();
db.config();


// Constants
const PORT = process.env.PORT || 3333;


// Routes
app.get('/api', (req, res) => {
    return res.json({ msg: "Welcome to DevConnector" });
});
app.use('/api/user', userRouter);
app.get('*', express.static('public/dist'));


// Server
app.listen(PORT, () => console.log(`⚡[server] Server running @${PORT}`));