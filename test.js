new Promise(function(resolve, reject) {
	resolve(1)
})
.then((res) => {
	console.log(res)
	return new Promise(function(resolve, reject) {
		resolve(res+1);
	});
})
.then((res) => {
	console.log(res);
})