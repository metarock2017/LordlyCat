var express = require('express'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    crypto = require('crypto'),
    app = express(),
    http = require('http').Server(app),
    path = require('path'),
    io = require('socket.io')(http),
    mysql = require('mysql'),
    port = 9090,

    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '88068806',
        database: 'barrage'
    });

//连接数据库
connection.connect();

//********************************************************************
app.use(express.static(path.join(__dirname, 'public/')));
app.use(cookieParser());


app.post('/', function(req, res) {

    res.send('9900');
})

var server = require('./server/loginServer.js')(app);


io.on('connection', function(socket) {
    console.log('a user has connected');
});

http.listen(port, function() {
    console.log('listening on ' + port);
});

io.on('connection', function(socket) {
    socket.on('chat message', function(data) {
        console.log('data: { ' + data.user + ': ' + data.message + ' }');
        var username = data.user,
            time = new Date().toLocaleString();
        //把弹幕信息存进数据库    
        connection.query('INSERT INTO message SET user=?, time=?, message=?', [username, time, data.message]);
    });
});

io.on('connection', function(socket) {
    socket.on('chat message', function(data) {
        //向客户端推送消息
        io.emit('chat message', data.message);
    });
});



// app.get('/app.js', function(req, res) {
//     console.log('123456789');
//     res.send('233');
// })




//The end