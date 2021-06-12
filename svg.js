function getColor() {
	switch (document.getElementById("colors").value) {
		case 'random':
			return ("rgb(" + ((Math.random() * 255) + 1) + "," + ((Math.random() * 255) + 1) + "," + ((Math.random() * 255) + 1) + ")");
		case 'red':
			return ("rgb(" + 255 + "," + 0 + "," + 0 + ")");
		case 'green':
			return ("rgb(" + 0 + "," + 255 + "," + 0 + ")");
		case 'blue':
			return ("rgb(" + 0 + "," + 0 + "," + 255 + ")");
		default:
			return ("rgb(" + 255 + "," + 255 + "," + 255 + ")");
	}
}


function create_element(x1, x2, y1, y2) 
{
	var svg_element = document.createElementNS("http://www.w3.org/2000/svg","line"); //to create a circle. for rectangle use "rectangle"
	
	svg_element.setAttributeNS(null, "x1", x1);
	svg_element.setAttributeNS(null, "x2", x2);
	svg_element.setAttributeNS(null, "y1", y1);
	svg_element.setAttributeNS(null, "y2", y2);
	svg_element.setAttributeNS(null, "style", "stroke:"+ getColor()+";stroke-width:2");
	
	document.getElementById("mySVG").appendChild(svg_element);
}

function draw_svg(w, h) {
	var upperbound = new Vector(0,0);
	var lowerbound = new Vector(0,0);

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

	for(let i = 0; i < pos.length; i++)
	{
		create_element(startX - (pos[i].x1 / rescale), startX - (pos[i].x2 / rescale),
		startY - (pos[i].y1 / rescale), startY - (pos[i].y2 / rescale));
	}
}