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

class Rule {
	constructor (text)
	{
		let tmp = text.split("->");
		this.tofind = tmp[0];
		this.toreplace = tmp[1];
	}
}

rgb_set(00,99,00);

function rgb_set(red, green, blue) {
	ctx.strokeStyle = 'rgb(' + red + ',' + green + ', ' + blue + ')';
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
	render(data);

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
}
function ft_find(data){

	for(let i = 0; i < g_variables.length; i++){
		if (data == g_variables[i])
			return (true);
	}
	return (false);
}

function render(data) {
	ctx.resetTransform();
	ctx.transform(1, 0, 0, 1, width/ 2, height / 2);
	let drawlen = 8;
	
	let currentX = 0;
	let currentY = 0;
	let nextX = 0;
	let nextY = 0;

	let dirX;
	let dirY;
	let angle = g_start_angle;
	
	for(let i = 0; i < data.length; i++){
		if (ft_find(data[i]) == true)
		{
			dirX = Math.sin(angle * 0.0174532925);
			dirY = Math.cos(angle * 0.0174532925);
			console.log("new direction:" + dirX + ", " + dirY);
			console.log("Current position:" + currentX + ", " + currentY);

			nextX = currentX + dirX * drawlen;
			nextY = currentY + dirY * drawlen;

			ctx.beginPath();
			ctx.moveTo(currentX,currentY);
			ctx.lineTo(nextX, nextY);
			ctx.stroke();
			//rgb_set((i % 200) + 55, (currentX % 200) + 55, (currentY % 200) + 55);
			rgb_set(width % i, height / i, (i % 200) + 55);
			currentX = nextX;
			currentY = nextY;
		}
		else if (data[i] == "−")
		{
			angle += g_angle_const;
			console.log("new angle: " + angle);
		}
		else if (data[i] == "+")
		{
			angle -= g_angle_const;
			console.log("new angle: " + angle);
		}
		else 
		{
			console.log("error" + data[i]);
		}
	}
}

