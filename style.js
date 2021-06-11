
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
		document.getElementById("constants").value = "+−";
		document.getElementById("start").value = "F−G−G";
		document.getElementById("rules").value = "F->F-G+F+G-F,G->GG";
		document.getElementById("depth").value = "2";
		document.getElementById("start_rot").value = "180";
		document.getElementById("const_rot").value = "120";
	}
}
