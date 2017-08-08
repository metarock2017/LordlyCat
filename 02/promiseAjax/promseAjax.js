let promiseAjax = ({//设置默认参数
    method: 'GET', //请求方式
    url: '', //发送请求的地址
    data: '', //发送的数据
    async: true, //是否异步
    cache: true, //是否缓存
    contentType: 'application/x-www-form-urlencoded' //请求头信息
} = {}) => {
    let promise = new Promise((resolve, reject) => {

        //数据处理
        if (typeof data !== 'string') {
            var str = '';
            for (var key in data) {
                str += key + '=' + data[key] + '&'
            }
            data = str.substring(0, str.length - 1);
        };

        method = method.toUpperCase(); //请求方式字符转换成大写

        //创建ajax
        let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXobject('Microsoft.XMLHTTP');

        xhr.open(method, url, data);

        if (method === 'GET') {
            xhr.send();
        }
        if (method === 'POST') {
            xhr.setRequestHeader("Content-type", contentType);
            xhr.send(data);
        }

        //服务器响应
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    let res = xhr.responseText;
                    resolve(res);
                } else {
                    let err = xhr.status;
                    reject(err);
                };
            };
        };

    });

    return promise;
}

//添加get方法
promiseAjax.get = function(url) {
    return promiseAjax({
        mathod: 'get';
        url: url
    })
}

//添加post方法
promiseAjax.post = function(url, data) {
    return promiseAjax({
        method: 'post',
        url: url,
        data: data
    })
}