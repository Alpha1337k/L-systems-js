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
