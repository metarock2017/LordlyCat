var txt = '';
var dataArr = [];
var size = 0;
var index = 0;
var sign = false;
var num = 0;
var done = document.querySelector('.done');

function ProcessFile(e) {
    var file = document.getElementById('file').files[0];
    if (file) {

        var reader = new FileReader();

        reader.onloadend = function(event) {
            num = 0;
            txt = event.target.result;
            size = parseInt(txt.length / 1024);

            console.log(txt.length / 1024);
            document.getElementById("result").innerHTML = txt;

            //截取字符串，把文件分段
            for (var i = 0; i < size + 1; i++) {
                dataArr[i] = txt.substr(index, 1024);
                index += 1024;
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
    document.getElementById('file').addEventListener('change',
        ProcessFile, false);
}
window.addEventListener("DOMContentLoaded", contentLoaded, false);


//上传
var btn = document.querySelector('button');

btn.addEventListener('click', function() {
    if (sign) {
        function send() {
            if (num <= size + 1) {
                ajax({
                    url: 'http://127.0.0.1:8806/',
                    method: 'POST',
                    contentType: 'text/plain',
                    data: dataArr[size + 1],
                    success: function(data) {
                        num += 1;
                        console.log(num);
                        done.innerHTML = 100*(num - 2)/size + '%';
                        send();
                    },
                    error: function(data) {
                        console.log(data);
                    }
                });
            }
        }
        send();
    } else {
        alert('文件尚未加载完毕，请稍后');

    }
}, false);

