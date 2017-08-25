var canvas = document.querySelector('#canvas'),
    ctx = canvas.getContext("2d"),
    audio = document.querySelectorAll('audio'),
    backgroundColor = "#002b36",
    lose,
    difficultyTimer,
    createTimer,
    shootAudioTimer,
    createTime,
    difficulty,
    score,
    bulletNUm = 0,
    gameOver,
    toDraw = [], //储存要被渲染的对象
    toRemove = [], //储存要被删除的对象
    full = [],
    me,
    ready = true,
    fire = false,
    click = true,
    through = false;


//新游戏开始前重置参数
function reset() {

    ready = true;
    lose = 0;
    difficulty = 1;
    score = 0;
    bulletNUm = 0;
    createTime = 1500;
    gameOver = false;
    through = false;
    toDraw = []; //储存要被渲染的对象
    toRemove = []; //储存要被删除的对象
    me = null;
    clearTimer();
}
reset();

//清除定时器
function clearTimer() {
    clearInterval(difficultyTimer);
    clearInterval(createTimer);
}


//界面初始化
function init() {

    ready = false;
    fire = true;
    energy = 0;

    initTimer();
    drawScoreBoard();
    redraw();
    audio[3].play();

    for (var i = 0; i < 40; i++) {
        full[i] = new Bullet();
        full[i].y = canvas.height - 60;
        full[i].x = (canvas.width / 39) * i;
        full[i].speedY = -500;
    }

    me = new Me();
    me.x = canvas.width / 2;
    me.y = canvas.height - me.Ysize * 2;
    me.draw();
    toDraw.push(me);
}

//更新每个对象状态
function redrawEverything() {
    toDraw.forEach(function(e) {

        //记录通过封锁的敌方
        if (e.y > canvas.height) {
            if (e.name === "Enemy") {
                lose += 1;

                //有五个敌军通过火力封锁时，游戏结束
                if (lose >= 5) {
                    gameOver = true;
                    click = false;
                    fire = false;
                    audio[3].pause();
                    setTimeout(function() {
                        click = true;
                    }, 2500);
                }
            }
            remove(e);
        }

        //更新重绘
        e.redraw(1 / 30);
    })
}

//绘制背景
// function drawBG() {
//     ctx.fillStyle = bgColor;
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
// }

//准备界面
function drawReady() {

    ctx.textAlign = 'center';

    ctx.fillStyle = 'rgba(200,200,200,0.6)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'white';
    ctx.font = '70px serif';
    ctx.strokeText('Are You Ready ?', 500, 320);

    ctx.font = '40px serif';
    ctx.strokeText('Please click anywhere to begin', 500, 400);

}

drawReady();

//游戏结束
function drawGameOver() {
    ctx.textAlign = "center";

    ctx.fillStyle = 'rgba(200,200,200,0.6)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'red';
    ctx.font = '70px serif';
    ctx.fillText('Game Over !', 500, 220);

    ctx.fillStyle = 'pink';
    ctx.fillText('Final Score :', 500, 310);

    ctx.fillText(score, 500, 400);

    ctx.strokeStyle = 'white';
    ctx.font = '40px serif';
    ctx.strokeText('Please click anywhere to back to ready', 500, 460);
    ctx.strokeText('after three seconds', 500, 500);
}


//蓄能
var energy = 0;
setInterval(function() {
        if (energy <= 200) {
            energy += (1 + score / 1000);
        }
        if (energy > 200) {
            energy = 200;
        }
    }, 1000)
    //能量条
function drawEnergy() {
    ctx.strokeStyle = 'pink';
    ctx.strokeRect(60, 200, 15, 200);

    ctx.fillStyle = 'green';
    ctx.fillRect(61, 401 - energy, 14, energy);
}

//记分板
function drawScoreBoard() {
    //得分
    ctx.strokeStyle = 'pink';
    ctx.font = '40px serif';
    ctx.strokeText('Score : ' + score, 140, 60);

    //失分
    ctx.strokeStyle = 'red';
    ctx.font = '40px serif';
    ctx.strokeText('Lose : ' + lose + '/5', 850, 60);
}

//绘制各个对象
function drawEverything() {
    toDraw.forEach(function(e) {
        e.draw();
    });
}

//重绘
function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawEverything();
    redrawEverything();
    drawScoreBoard();
    drawEnergy();

    toRemove.forEach(function(e) {
        var idx = toDraw.indexOf(e);
        if (idx > -1) toDraw.splice(idx, 1);
    });

    redrawTimer = window.requestAnimationFrame(redraw);

    if (gameOver === true) {

        window.cancelAnimationFrame(redrawTimer);
        audio[0].pause();
        audio[1].pause();
        clearInterval(shootAudioTimer);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGameOver();
    }
}


//开火
function fireBullet() {

    //达到一定的得分就加强火力
    if (score < 3500) {
        bulletNUm = 1;
    }
    if (score >= 3500) {
        bulletNUm = 2;
    }
    if (score >= 6500) {
        bulletNUm = 3;
    }
    if (score >= 9000) {
        bulletNUm = 3;

        //子弹可穿透
        through = true;
    }

    bullets = [];

    for (var i = 0; i < bulletNUm; i++) {
        bullets[i] = new Bullet();
    }

    if (bullets.length === 1) {
        bullets[0].x = me.x + me.Xsize / 2 - bullets[0].Xsize / 2;
        bullets[0].y = me.y + me.Ysize / 2 - bullets[0].Ysize / 2 - me.Ysize * 2;
        bullets[0].speedY = -200;

    } else if (bullets.length === 2) {
        bullets[0].x = me.x + me.Xsize / 2 - bullets[0].Xsize / 2 - 10;
        bullets[1].x = bullets[0].x + 20;
        bullets[1].y = bullets[0].y = me.y + me.Ysize / 2 - bullets[0].Ysize / 2 - me.Ysize * 2;
        bullets[1].speedY = bullets[0].speedY = -260;

    } else if (bullets.length === 3) {

        bullets[0].x = me.x + me.Xsize / 2 - bullets[0].Xsize / 2;
        bullets[1].x = bullets[0].x - 20;
        bullets[2].x = bullets[0].x + 20;

        bullets[0].y = me.y + me.Ysize / 2 - bullets[0].Ysize / 2 - me.Ysize * 3;
        bullets[2].y = bullets[1].y = me.y + me.Ysize / 2 - bullets[0].Ysize / 2 - me.Ysize * 2;
        bullets[2].speedY = bullets[1].speedY = bullets[0].speedY = -360;
    }

    for (var i = 0; i < bullets.length; i++) {
        toDraw.push(bullets[i]);
    }
}

//火力全开技能
function fullFire() {

    if (energy >= 200) {
        for (var i = 0; i < full.length; i++) {
            toDraw.push(full[i]);
        }
        audio[2].play();
        energy = 0;
    }
}
document.addEventListener('keydown', function(event) {
    event = event || window.event;
    if (event.keyCode === 32) {
        fullFire();
        for (var i = 0; i < 40; i++) {
            full[i] = new Bullet();
            full[i].y = canvas.height - 60;
            full[i].x = (canvas.width / 39) * i;
            full[i].speedY = -500;
        }
    }
}, false);

function canvasClick() {
    if (click) {

        //鼠标点击开火
        // if (fire) {
        //     fireBullet();
        // }

        if (gameOver) {

            gameOver = false;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            reset();
            drawReady();
            return false;
        }

        if (ready) {
            init();
            audio[0].play();
            shootAudioTimer = setInterval(function() {
                audio[0].currentTime = 1.0;
                audio[0].play();
            }, 1000);
        }
    }
}

//自动开火
setInterval(function() {
    if (fire) {
        fireBullet();
    }
}, 200);

//移除下次不需要渲染的对象
function remove(obj) {
    toRemove.push(obj);
}

//随机颜色变化
function changeColor(min, max) {
    var r = Math.floor((Math.random() * max) + min);
    var g = Math.floor((Math.random() * max) + min);
    var b = Math.floor((Math.random() * max) + min);
    var color = "rgb(" + r + "," + g + "," + b + ")";
    return color;
}

//创建敌方
function createEnemy() {
    var newEnemy = new Enemy();
    var x = Math.floor((Math.random() * canvas.width));
    var y = -newEnemy.Ysize;
    var v = (Math.random() * difficulty) + difficulty / 2;
    var a = Math.floor((Math.random() * (v + 25)) + v);
    var f = Math.floor((Math.random() * (v + 25)) + v);
    newEnemy.x = x;
    newEnemy.y = y;

    if (Math.random() > 0.4) {
        lineMotion(newEnemy, v);
    } else {
        curveMotion(newEnemy, a, f, v);
    }

    toDraw.push(newEnemy);
}


//随时间增加难度
function increaseDifficulty() {
    difficulty += 1;
    if (createTime > 50) {
        createTime -= 15;
    }
    clearInterval(createTimer);
    createTimer = setInterval(createEnemy, createTime);
}

function initTimer() {
    difficultyTimer = setInterval(increaseDifficulty, 3000);
    createTimer = setInterval(createEnemy, 2000);
}


//敌方直下运动
function lineMotion(obj, speed) {
    obj.redraw = function(sign) {
        this.speedX = 0;
        this.speedY = speed;
        Ancestor.prototype.redraw.call(this, sign);
    }
}

//敌方曲线运动
var f = 1;
setInterval(function() {
    f = -f;
}, 2000);

function curveMotion(obj, amplitude, freq, speed) {
    obj.redraw = function(sign) {
        this.speedX = amplitude * Math.cos(this.y / freq) * f;
        this.speedY = speed;
        Ancestor.prototype.redraw.call(this, sign);
    }
}

//检查是否击中
function checkShoot(bullet, enemy) {
    return (bullet.x < enemy.x + enemy.Ysize &&
        bullet.x + bullet.Ysize > enemy.x &&
        bullet.y < enemy.y + enemy.Ysize &&
        bullet.y + bullet.Ysize > enemy.y);
}



//敌方被击毙死亡
function death(obj) {

    score += 25;
    remove(obj);
}

function setAlpha(color, alpha) {
    if (color.indexOf('a') == -1) {
        return color.replace(")", "," + alpha + ")").replace("rgb", "rgba");
    }
}

//祖先构造函数 其它函数都会继承它的属性与方法
var Ancestor = function() {
    this.name = "Ancestor";
    this.Xsize = this.Ysize = 25;
    this.x = 0;
    this.y = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.color = "#FFFFFF";
}

Ancestor.prototype.redraw = function(sign) {
    this.x += this.speedX * sign;
    this.y += this.speedY * sign;

    if (this.x < 0) {
        this.x = 0;
    }
    if (this.x + this.Xsize > canvas.width) {
        this.x = canvas.width - this.Xsize;
    }
}
Ancestor.prototype.draw = function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.Xsize, this.Ysize);
}

//己方
var Me = function() {
    Ancestor.call(this);
    this.name = "Me";
    this.color = "orange";
    this.Xsize = 50;
    this.Ysize = 10;
    this.x = canvas.width / 2 - this.Xsize / 2;
    this.y = canvas.height - this.Ysize;
}
Me.prototype = Object.create(Ancestor.prototype);
Me.prototype.constructor = Ancestor;

//子弹
var Bullet = function() {
    Ancestor.call(this);
    this.name = "Bullet";
    this.Xsize = 8;
    this.Ysize = 12;
    this.speed = 260;
    this.time = 0;
    this.color = "rgba(255,255,255,1)";
}
Bullet.prototype = Object.create(Ancestor.prototype);
Bullet.prototype.constructor = Ancestor;

Bullet.prototype.redraw = function(sign) {

    Ancestor.prototype.redraw.call(this, sign);

    //检查子弹是否射中敌方
    var myself = this;
    toDraw.forEach(function(e) {
        if (e !== myself) {
            if (checkShoot(myself, e)) {
                death(e);
                audio[1].currentTime = 0.0;
                audio[1].play();
                if (!through) {
                    remove(myself);
                }
            }
        }
    })

    //移除出去界面外的子弹
    if (this.y < 0) {
        remove(this);
    }

}


//敌方
var Enemy = function() {
    Ancestor.call(this);
    this.name = "Enemy";
    this.Xsize = this.Ysize = Math.floor((Math.random() * 50) + 20);
    this.color = changeColor(90, 150);
}
Enemy.prototype = Object.create(Ancestor.prototype);
Enemy.prototype.constructor = Ancestor;


canvas.addEventListener("click", canvasClick);

//移动己方
canvas.addEventListener('mousemove', function(evt) {

    //获取鼠标相对canvas的位置
    var canvasRect = canvas.getBoundingClientRect();
    var mousePosX = evt.clientX - canvasRect.left;

    if (me) {
        if (mousePosX - me.Xsize / 2 <= 0) {
            me.x = 0;
        } else if (mousePosX - me.Xsize / 2 >= canvas.width) {
            me.x = canvas.width - me.Xsize;
        } else {
            me.x = mousePosX - me.Xsize / 2;
        }

    }
}, false);


//The end