var express = require('express'),
    //cookieParser = require('cookie-parser'),
    //session = require('express-session'),
    //crypto = require('crypto'),
    app = express(),
    http = require('http').Server(app),
    path = require('path'),
    //io = require('socket.io')(http),
    //mysql = require('mysql'),
    port = 9090;

    // connection = mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     password: '88068806',
    //     database: 'barrage'
    // });

//连接数据库
//connection.connect();

//********************************************************************
app.use(express.static(path.join(__dirname, 'public/')));
//app.use(cookieParser());


app.post('/', function(req, res) {

})

http.listen(port, function() {
    console.log('listening on ' + port);
});



//The end