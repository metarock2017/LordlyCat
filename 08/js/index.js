var w = document.body.clientWidth,
    h = window.innerHeight,
    wrapper = document.querySelector('.wrapper'),
    canvas = document.querySelector('canvas');


wrapper.style.width = w + 'px';
wrapper.style.height = h + 'px';
canvas.width = w;
canvas.height = h;


//改变颜色
function changeColor(ball) {

    var r = parseInt(Math.random() * 255),
        g = parseInt(Math.random() * 255),
        b = parseInt(Math.random() * 255),
        color = "rgb(" + r + ", " + g + ", " + b + ")";
    return color;
}

//创建小球
function createBall() {

    var ball = {};

    var x = w / 2, //从中心散开
        y = h / 2,
        speedX = Math.random() * 30 - 15, //随机速度
        speedY = Math.random() * 30 - 15,
        color = changeColor(), //随机颜色
        radius = Math.random() * 25 + 15; //随机大小

    ball.x = x;
    ball.y = y;
    ball.speedX = speedX;
    ball.speedY = speedY;
    ball.radius = radius;
    ball.color = color;
    ball.draw = function() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        context.closePath();
        context.fillStyle = this.color;
        context.fill();
    }

    return ball;
}


var context = canvas.getContext('2d');

function moving(ball) {

    //长尾拖拽效果
    context.fillStyle = 'rgba(0, 0, 0, 0.0005)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    //context.clearRect(0, 0, canvas.width, canvas.height);

    ball.draw();
    ball.x += ball.speedX;
    ball.y += ball.speedY;
    console.log(ball.x);

    //边界碰撞检测
    if (ball.x >= canvas.width - ball.radius) {
        ball.speedX = -ball.speedX;
        ball.color = changeColor();
    }
    if (ball.x <= 0 + ball.radius) {
        ball.speedX = -ball.speedX;
        ball.color = changeColor();
    }
    if (ball.y >= canvas.height - ball.radius) {
        ball.speedY = -ball.speedY;
        ball.color = changeColor();
    }
    if (ball.y <= 0 + ball.radius) {
        ball.speedY = -ball.speedY;
        ball.color = changeColor();
    }
}

function go() {

    w = document.body.clientWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    for (var i = 0; i < ballArr.length; i++) {
        moving(ballArr[i]);
    }
    raf = window.requestAnimationFrame(go);
}

var ballArr = [];
function inputNum() {
    var num = 0,
        n = prompt("请输入你想要的小球数量（10～100 视觉效果最佳）:");

    if (n < 0) {
        alert('请输入大于0的数');
        n = prompt("请输入你想要的小球数量（10～100 视觉效果最佳）:");
        num =  parseInt(n);
    }else if (n > 0 && n < 800) {
        num =  parseInt(n);
    } 
    else if (n >= 800) {
        alert('卡死你！！！');
        num =  parseInt(n);
    }

    for (var i = 0; i < num; i++) {
        ballArr[i] = createBall();
    }

    go();
}

setTimeout(inputNum, 600);

//The end