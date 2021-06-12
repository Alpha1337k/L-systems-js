function clearcanvas() {
	let c = document.getElementById("cv");
	let ctx = c.getContext("2d");
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.beginPath();
	document.getElementById("mySVG").innerHTML = "";
	pos = [];
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
		"scale"			: document.getElementById("need_scale").checked,
		"bracket_change": document.getElementById("bracket_angle_change").checked
	};
	document.getElementById("exporttext").innerHTML = JSON.stringify(savedata);
}

function setColor() {
		switch (document.getElementById("colors").value) {
			case 'random':
				rgb_set((Math.random() * 255) + 1, (Math.random() * 255) + 1, (Math.random() * 255) + 1);
				break;
			case 'red':
				rgb_set(255,0,0);
				break;
			case 'green':
				rgb_set(0,255,0);
				break;
			case 'blue':
				rgb_set(0,0,255);
				break;
			default:
				rgb_set(255,255,255);
				break;
		}
}

function rgb_set(red, green, blue) {
	ctx.strokeStyle = 'rgb(' + red + ',' + green + ', ' + blue + ')';
}

function downloadImage(data, filename = 'untitled.jpeg') {
    var a = document.createElement('a');
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
}

function download_image() {
	if (g_engine_type == "render_canvas")
	{
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
	else if (g_engine_type == "render_svg")
	{
		var svgBlob = new Blob([document.getElementById("mySVG").outerHTML], {type:"image/svg+xml;charset=utf-8"});
		var svgUrl = URL.createObjectURL(svgBlob);
		var downloadLink = document.createElement("a");
		downloadLink.href = svgUrl;
		downloadLink.download = "lsystem.svg";
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	}
}

var g_engine_type = "render_canvas";


function update_renderer() {
	var idx = document.getElementsByName("engine_choose");
	for (var x = 0; x < idx.length; x++)
	{
		if (idx[x].checked)
		{
			g_engine_type = idx[x].value;
			break;
		}
	}
	if (g_engine_type == "render_canvas")
	{
		document.getElementById("svg_div").style.display='none';
		document.getElementById("canvas_div").style.display='block';
	}
	else if (g_engine_type =="render_svg")
	{
		document.getElementById("svg_div").style.display='block';
		document.getElementById("canvas_div").style.display='none';
	}
}