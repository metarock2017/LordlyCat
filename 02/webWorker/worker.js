//插入排序
function insertSort(arr) {

	var len = arr.length
	var pick;
	var index;

	for (var i = 1; i < len; i++) {

		pick = arr[i];
		index = i - 1;

		while (index >= 0 && arr[index] > pick) {
			arr[index + 1] = arr[index];
			index--;
		}
		arr[index + 1] = pick;
	}
	return arr;
}

//生成随机数数组
function getArr(n) {
	var l = n;
	var arr = [];
	var num;
	for (var i = 0; i < l; i++) {
		num = Math.random() * 1000;
		num = parseInt(num, 10);
		arr[i] = num;
		console.log(num);
	}
	return arr;

}

var arr_1 = getArr(60000);
var sort_1 = insertSort(arr_1);

postMessage(sort_1);