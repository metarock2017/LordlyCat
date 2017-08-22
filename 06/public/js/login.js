var register = document.querySelector('.register'),
    login = document.querySelector('.login'),
    input = document.querySelectorAll('input'),
    login_input = document.querySelector('.login_input'),
    register_input = document.querySelector('.register_input'),
    register_btn = document.querySelector('.register_btn'),
    login_btn = document.querySelector('.login_btn');


function changeFunction(event) {
    event = event || window.event;
    var e = event.target || event.srcElememt;

    if (e.className === 'login off') {

        e.className = 'login on';
        register.className = 'register off';

        login_input.style.display = 'block';
        register_input.style.display = 'none';

    } else if (e.className === 'register off') {

        e.className = 'register on';
        login.className = 'login off';
        
        login_input.style.display = 'none';
        register_input.style.display = 'block';

    }
}
register.addEventListener('click', changeFunction, false);
login.addEventListener('click', changeFunction, false);

var welcome = '';
function sendRequest(event) {
    event = event || window.event;
    var e = event.target || event.srcElememt;

    var username,
        password,
        doing;

    if (e.className === 'register_btn') {
        doing = 'register';

        if (input[0].value.trim().length === 0 || input[1].value.trim().length === 0) {
            alert('用户名和密码不能为空');
            return false;
        }else {
            username = input[0].value;
            password = hex_md5(input[1].value); //用户密码md5加密发送
            welcome = '注册成功！';
        }
        
    } else if (e.className === 'login_btn') {
        doing = 'login';
        username = input[2].value;
        password = hex_md5(input[3].value); //用户密码md5加密发送

        welcome = '登陆成功！';
    }


    //发送请求
    ajax({
        method: 'POST',
        url: '/server/loginServer.js',
        data: {
            do: doing,
            username: username,
            password: password
        },
        success: sendSuccessfully,
        error: function(res) {
            alert(res);
        }
    });
}

//请求发送成功的回调
function sendSuccessfully(res) {

    if (res === 'rigister failed') {
        alert('用户名已存在');
    } else if (res === 'rigister successfully') {
        alert(welcome);
        window.location.href = '/html/index.html';
    } else if (res === 'login successfully') {
        alert(welcome);
        window.location.href = '/html/index.html';
    } else if (res === 'login failed') {
        alert('登录失败，请重试');
    }

}

register_btn.addEventListener('click', sendRequest, false);
login_btn.addEventListener('click', sendRequest, false);


//缓存
function setCookie(name, value, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = name + "=" + value + "; " + "path=/" + "; " + expires;
}

function getCookie(name) {
    var name = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        window.location.href = '/html/index.html';
    }
}

checkCookie();


//The end