var div = document.querySelector('.worker');

function getWorker() {

	var worker = new Worker('./worker.js');
	worker.onmessage = function(event) {
		div.innerHTML = event.data;
	}
}

function say() {
	div.innerHTML = 233;
}

getWorker();

say();