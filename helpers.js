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