//引入模块
const express = require('express');
const path = require('path');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
const port = 8806;

// var Client = mysql.Client,
//     client = new Client();

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '88068806',
    database: 'upload'
});

//连接数据库
connection.connect();
var sql = 'INSERT INTO text (img) VALUES (data)';


app.use(express.static(path.join(__dirname, 'public/')));

//解析数据
app.use(bodyParser.json());
/*app.use(bodyParser.text({
  type: 'text/plain'
}));*/
app.use(bodyParser.urlencoded({
    extended: false
}));
//var data = '';
//var index = 0;


//处理请求
app.post('/', function(req, res) {
    //拼接数据
    var data = req.body;
    var name = data[0];
    var id;
    console.log(data);
    //存入数据库
    if (parseInt(data[2]) === 0) {
        connection.query("INSERT INTO files SET name=?, data=?", [data[0], data[1]]);

    } else {
        connection.query("SELECT max(id) FROM files", function(err, result, fields) {
            id = result[0]['max(id)'];
            //console.log(id);
            connection.query("UPDATE files SET data = CONCAT(data, ?) WHERE id=?", [data[1], id]);

        });

    }
    //console.log(req.body[2]);
    res.send('1');
});


app.listen(port, () => {
    console.log('App is listening at ' + port);
});