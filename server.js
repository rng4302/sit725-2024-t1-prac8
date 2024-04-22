const express = require('express');
const cors = require('cors');
const indexRoutes = require('./routes/routes.js');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static(__dirname + '/views/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use('/', indexRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;