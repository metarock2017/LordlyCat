var canvas = document.querySelector('#canvas');
var context = canvas.getContext('2d');

var me = {
    w: 80,
    h: 15,
    x: 500,
    y: 560,
    speed: 10,
    color: 'orange',
    draw: function() {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.w, this.h);
    }
}


function moving() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    me.draw();
    me.x += me.speed;
    if (me.x >= canvas.width - me.w) {
        me.x = canvas.width - me.w;
        //me.speed = ;
    }
    if (me.x <= 0) {
        //me.speed = -me.speed;
        me.x = 0;
    }
    raf = window.requestAnimationFrame(moving);
}

var sign = 1;

document.addEventListener('keydown', function(event) {
    if (event.keyCode === 39 && sign === 1) {
        sign = 0;
        me.speed = -me.speed;
        if (me.speed < 0) {
            me.speed = -me.speed;
        }
        raf = window.requestAnimationFrame(moving);
    }

}, false);

document.addEventListener('keyup', function() {
    if (event.keyCode === 39 && sign === 0) {
        sign = 1;
        window.cancelAnimationFrame(raf);
        //raf = window.requestAnimationFrame(moving);

    }
})

document.addEventListener('keydown', function(event) {
    if (event.keyCode === 37 && sign === 1) {
        sign = 0;
        if (me.speed > 0) {
            me.speed = -me.speed;
        }
        raf = window.requestAnimationFrame(moving);
    }

}, false);

document.addEventListener('keyup', function() {
    if (event.keyCode === 37 && sign === 0) {
        sign = 1;
        window.cancelAnimationFrame(raf);
        //raf = window.requestAnimationFrame(moving);

    }
})

me.draw();
//moving()
//setInterval(moving, 10);