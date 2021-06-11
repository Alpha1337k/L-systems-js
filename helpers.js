function clearcanvas() {
	let c = document.getElementById("cv");
	let ctx = c.getContext("2d");
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.beginPath();
	console.log("cleared");
}

function save_as_json() {
	update_data();
	var savedata = {
		"variables" 	: g_variables,
		"constants" 	: g_constants,
		"start"			: g_start,
		"angle_const"	: g_angle_const,
		"angle_start"	: g_start_angle,
		"rules"			: g_rules,
		"depth"			: g_depth,
		"scale"			: document.getElementById("need_scale").checked
	};
	document.getElementById("exporttext").innerHTML = JSON.stringify(savedata);
}

function downloadImage(data, filename = 'untitled.jpeg') {
    var a = document.createElement('a');
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
}

function download_image() {
	var canvas = document.createElement('canvas');
	var context = canvas.getContext("2d");
	canvas.style.display='block';
	var height=document.getElementById('save_size').value;
	var width=height;

	canvas.height=height;
	canvas.width=width;

	console.log(canvas);
	draw(context, width, height);
	var img = canvas.toDataURL("image/png", 1).replace("image/png", "image/octet-stream");
	downloadImage(img, "download.png");
}