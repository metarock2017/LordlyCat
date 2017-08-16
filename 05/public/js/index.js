var txt = '';
var dataArr = [];
var size = 0;
var index = 0;
var sign = false;
var num = 0;
var name = '';
var done = document.querySelector('.done');
var compeleted = document.querySelector('.compeleted');
var img = document.querySelector('img');

function ProcessFile(e) {
    done.innerHTML = '0%';
    compeleted.style.width = '0px';
    localStorage.setItem('num', 0);
    var file = document.querySelector('#file').files[0];
    if (file) {
        name = file.name;
        var reader = new FileReader();

        reader.onloadend = function(event) {
            num = 0;
            txt = event.target.result;
            size = parseInt(txt.length / (1024 * 2));
            img.src = txt;
            console.log(txt.length / 1024);
            //document.getElementById("result").innerHTML = txt;

            //截取字符串，把文件分段
            for (var i = 0; i < size + 1; i++) {
                dataArr[i] = txt.substr(index, 1024 * 2);
                index += 1024 * 2;
            }
            sign = true;
        };

        reader.onerror = function() {
            alert('读取错误，请重试');
        }
    }

    reader.readAsDataURL(file);
}

function contentLoaded() {
    document.querySelector('#file').addEventListener('change',
        ProcessFile, false);
}
window.addEventListener("DOMContentLoaded", contentLoaded, false);


//上传
var uploadBtn = document.querySelector('.upload');
var pauseBtn = document.querySelector('.pause');
var continueBtn = document.querySelector('.continue');

uploadBtn.addEventListener('click', function() {
    if (sign) {
        send();
        sign = false;
    } else {
        alert('文件尚未加载完毕，请稍后');

    }
}, false);

var continueLoad = true;
//发送数据
function send() {
    num = parseInt(localStorage.getItem('num'));
    if (num <= size + 1) {
        ajax({
            url: 'http://127.0.0.1:8806/',
            method: 'POST',
            //contentType: 'text/plain',
            data: {
                0: name,
                1: dataArr[num],
                2: num
            },
            success: function(data) {
                num += 1;
                //记录下次要上传的地方
                localStorage.setItem('num', num);
                console.log(num);
                done.innerHTML = (100 * (num - 1) / (size + 1)).toFixed(2) + '%';
                compeleted.style.width = ((num - 1) / (size + 1)) * 500 + 'px';
                if (continueLoad) {
                    send();
                }
            },
            error: function(data) {
                console.log(data);
            }
        });
    }
}

//暂停上传
pauseBtn.addEventListener('click', function() {
    continueLoad = false;
}, false);

//继续上传
continueBtn.addEventListener('click', function() {
    continueLoad = true;
    send();
}, false);