const express = require('express');
const cors = require('cors');
const indexRoutes = require('./routes/routes.js');

const app = express();
const port = process.env.PORT || 3000;
let http = require('http').createServer(app);

// Middleware
app.use(express.static(__dirname + '/views/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use('/', indexRoutes);

// Start server
let io = require('socket.io')(http);
http.listen(3000,
    () => {
        console.log('express server started');
    });

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    setInterval(() => {
        socket.emit('number', parseInt(Math.random() * 10));
    }, 1000);
    socket.on('number', (msg) => {
        console.log('Random number: ' + msg);
    })
})

module.exports = app;