let c = document.getElementById("cv");
let ctx = c.getContext("2d");
let width = c.getAttribute("width");
let height = c.getAttribute("height");

let g_variables;
let g_constants;
let g_start;
let g_rules = [];
let g_depth;
let g_angle_const;
let g_start_angle;

var pos = [];

class Rule {
	constructor (text)
	{
		let tmp = text.split("->");
		this.tofind = tmp[0];
		this.toreplace = tmp[1];
	}
}

class Vector {
	constructor (x, y)
	{
		this.x = x;
		this.y = y;
	}
}

class LinePath {
	constructor (x1, x2, y1, y2)
	{
		this.x1 = x1;
		this.x2 = x2;
		this.y1 = y1;
		this.y2 = y2;
	}
}

function calculate(depth, data)
{
	if(depth == 0)
		return (data);
	let newstr = "";
	for (let i = 0; i < data.length; i++)
	{
		let x = 0;
		for (;x < g_rules.length; x++)
		{
			if (data[i] == g_rules[x].tofind)
			{
				newstr += g_rules[x].toreplace;
				break;
			}
		}
		if (x == g_rules.length)
			newstr += data[i];
	}

	return (calculate(depth - 1, newstr));
}

function start() {
	update_data();

	console.log(g_variables + "\n" + g_rules + "\n" +  g_start + "\n" +  g_constants + "\n" + g_depth);
	let data = calculate(g_depth, g_start);
	console.log(data);
	render_recurse(data, 0, 0, g_start_angle);

	ctx.resetTransform();
	ctx.imageSmoothingEnabled= true;
	if (g_engine_type == "render_canvas")
		draw(ctx, width, height);
	else if (g_engine_type == "render_svg")
		draw_svg(width, height);
}

function update_data() {
	g_variables = document.getElementById("variables").value;
	g_constants = document.getElementById("constants").value;
	g_start = document.getElementById("start").value;
	g_angle_const = parseInt(document.getElementById("const_rot").value);
	g_start_angle = parseInt(document.getElementById("start_rot").value);
	let tmp = document.getElementById("rules").value;
	tmp = tmp.split(',');
	g_rules = [];
	for (let i = 0; i < tmp.length; i++)
	{
		g_rules.push(new Rule(tmp[i]));
	}
	g_depth = document.getElementById("depth").value;

	document.getElementById("exporttext").innerHTML = "";
}
function ft_find(data){

	for(let i = 0; i < g_variables.length; i++){
		if (data == g_variables[i])
			return (true);
	}
	return (false);
}

function ft_find_depth(data, i = 0){

	let depth = 0;
	for(; i < data.length; i++){
		if (depth == 0 && data[i] == ']')
			return (i);
		else if (data[i] == ']')
			depth--;
		else if (data[i] == '[')
			depth++;
	}
	return (-1);
}

async function render_recurse(data, currentX, currentY, angle)
{
	let drawlen = 10;
	let dirX;
	let dirY;
	let nextX = 0;
	let nextY = 0;
	console.log(data);

	for(let i = 0; i < data.length; i++){
		if (ft_find(data[i]) == true)
		{
			dirX = Math.sin(angle * 0.0174532925);
			dirY = Math.cos(angle * 0.0174532925);
			console.log("R | new direction:" + dirX + ", " + dirY + "[" + angle + "]");

			nextX = currentX + dirX * drawlen;
			nextY = currentY + dirY * drawlen;

			console.log("R | New Line!:" + currentX + ", " + currentY + " to " + nextX + ", " + nextY);
			pos.push(new LinePath(currentX, nextX, currentY, nextY));
			currentX = nextX;
			currentY = nextY;
		}
		else if (data[i] == "-")
		{
			angle += g_angle_const;
			console.log("new angle: " + angle);
		}
		else if (data[i] == "+")
		{
			angle -= g_angle_const;
			console.log("new angle: " + angle);
		}
		else if (data[i] == '[')
		{
			render_recurse(data.substring(i + 1, ft_find_depth(data, i + 1)), currentX, currentY, angle - g_angle_const);
			console.log("remainder: " + data.substring(ft_find_depth(data, i + 1) - 2));
			i = ft_find_depth(data, i + 1) - 1;
		}
		else if (data[i] == ']')
		{
			angle += g_angle_const;
			console.log("R | new angle: " + angle);
		}
		else
		{
			console.log("error" + data[i]);
		}
	}
}

async function draw(context, w, h) {
	var upperbound = new Vector(0,0);
	var lowerbound = new Vector(0,0);

	console.log("lines = ", pos.length);

	for (let i = 0; i < pos.length; i++)
	{
		if (pos[i].x2 < upperbound.x)
		upperbound.x = pos[i].x2;
		else if (pos[i].x2 > lowerbound.x)
		lowerbound.x = pos[i].x2;
		else if (pos[i].y2 < upperbound.y)
		upperbound.y = pos[i].y2;
		else if (pos[i].y2 > lowerbound.y)
		lowerbound.y = pos[i].y2;
	}
	console.log("Upperbound = ", upperbound.x, upperbound.y);
	console.log("Lowerbound = ", lowerbound.x, lowerbound.y);
	let rescale = 1;
	if (document.getElementById("need_scale").checked)
	{
		if (lowerbound.x - upperbound.x > lowerbound.y - upperbound.y)
			rescale = (lowerbound.x - upperbound.x) / w / 0.9;
		else
			rescale = (lowerbound.y - upperbound.y) / h / 0.9;
	}

	let startX = w / 2 + (upperbound.x + lowerbound.x) / 2 / rescale;
	let startY = h / 2 + (upperbound.y + lowerbound.y) / 2 / rescale;
	console.log("startXY = ", startX, startY);
	console.log("rescale = ", rescale);

	ctx.lineWidth = 2;
	for(let i = 0; i < pos.length; i++)
	{
		setColor();
		ctx.beginPath();
		ctx.moveTo(startX - (pos[i].x1 / rescale), startY - (pos[i].y1 / rescale));
		ctx.lineTo(startX - (pos[i].x2 / rescale), startY - (pos[i].y2 / rescale));
		ctx.stroke();
		ctx.closePath();
	}
}
