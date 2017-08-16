var socket = io();
var messages = document.querySelector('#messages');
var form = document.querySelector('form');
var input = document.querySelector('#input');
var button = document.querySelector('button');
var showWindow = document.querySelector('.showWindow');
var stage = document.querySelector('.stage');


//向服务器发送数据
function send() {

    if (input.value == '') {
        alert('输入内容不能为空')
    } else {
        socket.emit('chat message', input.value);


        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/', true);
        xhr.setRequestHeader('Contont-type', 'text/plain');
        xhr.send(input.value);

        input.value = '';
    }

}

button.addEventListener('click', send, false);
button.addEventListener('clik', function () {
    barrage.create(input.value);
}, false)

//接受服务器推送的消息并发出弹幕
socket.on('chat message', function(msg) {
    var newMessage = document.createElement('li');
    newMessage.innerHTML = msg;
    messages.appendChild(newMessage);
    barrage.create(msg);
});

//回车键发送
document.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        var txt = input.value;
        send();
    }
}, false);

//弹幕对象
var barrage = {
    className: 'box',
    color: ['red', 'blue', 'white', 'yellow', 'pink', 'lightblue', 'lightgreen', 'orange'],
    top: '',
    text: 'I have a candy',
    fontSize: '30px',
    create: function(txt) {
        this.text = txt;
        var newBox = document.createElement('div');
        newBox.className = this.className;
        newBox.style.top = Math.random() * 80 + 10 + '%';
        newBox.innerHTML = this.text;
        newBox.style.fontSize = this.fontSize;
        newBox.style.color = this.color[parseInt(Math.random() * 8)];
        stage.appendChild(newBox);
        setTimeout(function () {
            newBox.style.left = '-100%';
        }, 200);
    },

}

//清除已经移动到屏幕外的弹幕
function clear() {
    var boxes = document.querySelectorAll('.box');

    for (var i = 0; i < boxes.length; i++) {
        if (boxes[i].offsetLeft < -500) {
            stage.removeChild(boxes[i]);
        }
    }
}
setInterval(clear, 2000);


//barrage.create();