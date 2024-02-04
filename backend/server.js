const express = require('express');
const app = express();
const dotenv = require('dotenv');
const db = require('./config/db');
const { globalErrorHandler } = require('./middlewares/error.middleware');
const ApiError = require('./utils/ApiError');

// Import Routers
const {
    userRouter
} = require('./routes');


// Pre Request Middlewares
app.use(express.json());


// Configuration
dotenv.config();
db.config();


// Constants
const PORT = process.env.PORT || 3333;


// Routes
app.get('/api', (req, res) => res.json({ msg: 'Welcome to DevConnector' }));
app.use('/api/users', userRouter);

// Serve frontend
app.get('*', express.static('public/dist'));

// Error Handling
app.all('*', (req, res, next) => next(new ApiError(404, "Oops! Looks like you're lost.")));
app.use(globalErrorHandler);

// Server
app.listen(PORT, () => console.log(`⚡[server] Server running @${PORT}`));