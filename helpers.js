function clearcanvas() {
	let c = document.getElementById("cv");
	let ctx = c.getContext("2d");
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.beginPath();
	console.log("cleared");
}