
function update_form() {
	var idx = document.getElementsByName("rad");
	var type;
	for (var x = 0; x < idx.length; x++)
	{
		if (idx[x].checked)
		{
			type = idx[x].value;
			break;
		}
	}

	console.log("je moeder " + type);
	if (type == "kocchie")
	{
		document.getElementById("variables").value = "F";
		document.getElementById("constants").value = "+-";
		document.getElementById("start").value = "F";
		document.getElementById("rules").value = "F->F+F-F-F+F";
		document.getElementById("depth").value = "4";
		document.getElementById("start_rot").value = "90";
		document.getElementById("const_rot").value = "90";
	}
	else if (type == "dragon")
	{
		document.getElementById("variables").value = "FG";
		document.getElementById("constants").value = "+-";
		document.getElementById("start").value = "F";
		document.getElementById("rules").value = "F->F+G,G->F-G";
		document.getElementById("depth").value = "10";
		document.getElementById("start_rot").value = "180";
		document.getElementById("const_rot").value = "90";

	}
	else if (type == "sierpinski")
	{
		document.getElementById("variables").value = "FG";
		document.getElementById("constants").value = "+-";
		document.getElementById("start").value = "F-G-G";
		document.getElementById("rules").value = "F->F-G+F+G-F,G->GG";
		document.getElementById("depth").value = "4";
		document.getElementById("start_rot").value = "180";
		document.getElementById("const_rot").value = "120";
	}
	else if (type == "bintree")
	{
		document.getElementById("variables").value = "01";
		document.getElementById("constants").value = "[]";
		document.getElementById("start").value = "0";
		document.getElementById("rules").value = "1->11,0->1[0]0";
		document.getElementById("depth").value = "2";
		document.getElementById("start_rot").value = "0";
		document.getElementById("const_rot").value = "45";
	}
	else if (type == "import")
	{
		document.getElementById("importform").style.display = "block";
	}
}

function load_import() {
		
	var parsed_data = JSON.parse(document.getElementById("importformtext").value);
	document.getElementById("variables").value = parsed_data.variables;
	document.getElementById("constants").value = parsed_data.constants;
	document.getElementById("start").value = parsed_data.start;
	document.getElementById("depth").value = parsed_data.depth;
	document.getElementById("start_rot").value = parsed_data.angle_start;
	document.getElementById("const_rot").value = parsed_data.angle_const;
	document.getElementById("need_scale").checked = parsed_data.scale;

	let finalstring = "";
	for (let i = 0; i < parsed_data.rules.length; i++)
	{
		finalstring += parsed_data.rules[i].tofind + "->" + parsed_data.rules[i].toreplace;
		if (i + 1 != parsed_data.rules.length)
			finalstring += ",";
	}
	document.getElementById("rules").value = finalstring;

	document.getElementById("importform").style.display = "none";
}
