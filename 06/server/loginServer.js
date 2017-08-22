module.exports = function(app) {
    var body_parser = require('body-parser'),
        mysql = require('mysql'),
        cookieParser = require('cookie-parser'),
        //数据库
        userConnection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '88068806',
            database: 'barrage'
        });

    app.use(cookieParser());
    app.use(body_parser.json());
    app.use(body_parser.urlencoded({
        extended: false
    }));

    app.post('/server/loginServer.js', function(req, res) {

        var data = req.body;

        if (data.do === 'register') { //注册验证

            userConnection.query('SELECT username FROM userinformation', function(err, result) {
                for (var i = 0; i < result.length; i++) {
                    if (result[i]['username'] === data.username) {
                        console.log('rigister');
                        res.send('rigister failed');
                        return false;
                    }
                }

                var sql = 'INSERT INTO userinformation SET username=?, password=?, registerTime=?',
                    registerTime = new Date().toLocaleString();

                userConnection.query(sql, [data.username, data.password, registerTime]);
                res.send('rigister successfully');
            })


        } else { //登陆验证
            console.log('login');
            userConnection.query('SELECT username FROM userinformation', function(err, result) {
                for (var i = 0; i < result.length; i++) {
                    if (result[i]['username'] === data.username) {

                        userConnection.query('SELECT password FROM userinformation WHERE username=?', data.username, function(err, result) {
                            if (result[0]['password'] === data.password) {

                                res.cookie('username', data.username, { maxAge: 7 * 24 * 60 * 60 * 1000, path: '/' });

                                res.send('login successfully');

                                return;
                            } else {
                                res.send('login failed');
                            }

                        });

                        return false;
                    }
                }
            });
        }

        //设置缓存

        res.cookie('username', data.username, { maxAge: 7 * 24 * 60 * 60 * 1000, path: '/' });



    });


    // app.get('/server/loginServer.js', function(req, res) {
    //     console.log(req.cookies.username);
    //     if (!req.cookies.username) {
    //         res.cookie('username', data.username, { maxAge: 100000});
    //     }
    //     //res.send('1234567');
    // })


}


//The end