var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);
var port = 9090;


//******************************************
app.use(express.static(path.join(__dirname, 'public/')));


app.post('/', function (req, res) {
    res.send('9900');
})


io.on('connection', function(socket) {
    console.log('a user has connected');
});

http.listen(port, function() {
    console.log('listening on ' + port);
});

io.on('connection', function(socket) {
    socket.on('chat message', function(msg) {
        console.log('message: ' + msg);
    });
});

io.on('connection', function(socket) {
    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
    });
});


