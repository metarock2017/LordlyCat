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
  host     : 'localhost',
  user     : 'root',
  password : '88068806',
  database : 'upload'
});
 
//连接数据库
connection.connect();
var sql = 'INSERT INTO text (img) VALUES (data)';


app.use(express.static(path.join(__dirname, 'public/')));

//解析数据
app.use(bodyParser.text({type: 'text/plain'}));
var data = '';
var index = 0;
//var test = '9900';
//处理请求
app.post('/', function(req, res) {
    //拼接数据
    data += req.body;

    //传输完毕，存入数据库
    if (req.body === '') {
        connection.query("INSERT INTO text (img) VALUES (data)");
        //console.log(typeof(data));
    }
    
    res.send('1');
});

app.listen(port, () => {
    console.log('App is listening at ' + port);
});