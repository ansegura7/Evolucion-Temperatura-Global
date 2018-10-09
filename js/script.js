// Init parameters
var ast = [];
ast.yearlyData = new Array();
ast.monthlyData = new Array();
ast.width = 900;
ast.height = 500;
ast.maxYear = 2018;
ast.minYear = 1880;
ast.maxItems;

// Init dynamic components
ast.init = () => {

	// Load main ComboBox
	let varList = [{text:"LSA Temperature", value:"ZonAnn.Ts.csv"}
				  ,{text:"LSA and SSW Temperature", value:"ZonAnn.Ts+dSST.csv"}];
	ast.addComboDataType(varList, "");
	
	// Fire main event
	ast.refreshData();
}

// Main event - Refresh all data
ast.refreshData = () => {
	let filepath = "https://raw.githubusercontent.com/ansegura7/Evolucion-Temperatura-Global/master/Data/";
	let lastYears = d3.select("#cmdLastYears").node().value.trim();
	let datatype = d3.select("#cmdDataType").node().value.trim();
	let yearFilename = "";
	let monthFilename = "";
	
	// Max Items
	if (lastYears == "Todo")
		ast.maxItems = ast.minYear;
	else
		ast.maxItems = lastYears;
	ast.addComboCurrYear(ast.maxYear);
	
	// Set Data Type
	if (datatype.indexOf("dSST") >= 0) {
		yearFilename = filepath + "ZonAnn.Ts+dSST.csv";
		monthFilename = filepath + "GLB.Ts+dSST.csv";
	}
	else {
		yearFilename = filepath + "ZonAnn.Ts.csv";
		monthFilename = filepath + "GLB.Ts.csv";
	}

	ast.loadYearlyData(yearFilename, ast.createYearlyData);
	ast.loadMonthlyData(monthFilename, ast.createMonthlyCharts);
}

// Load yearly data and charts
ast.loadYearlyData = (filename, callback) => {
	ast.yearlyData = [];
	
	d3.csv(filename).then(
		function(data) {

			// Load and parse data
			data.forEach(function(d, i) {
				let nd = {};
				nd.Year = +d.Year;
				nd.Glob = ast.toFixedNumber(d.Glob, 100, 2);
				nd.NHem = ast.toFixedNumber(d.NHem, 100, 2);
				nd.SHem = ast.toFixedNumber(d.SHem, 100, 2);
				nd.NorthNPolo = ast.toFixedNumber(d["64N-90N"], 100, 2);
				nd.NorthNorth = ast.toFixedNumber(d["44N-64N"], 100, 2);
				nd.NCenterNorth = ast.toFixedNumber(d["24N-44N"], 100, 2);
				nd.EquNCenter = ast.toFixedNumber(d["EQU-24N"], 100, 2);
				nd.EquSCenter = ast.toFixedNumber(d["24S-EQU"], 100, 2);
				nd.SCenterSouth = ast.toFixedNumber(d["44S-24S"], 100, 2);
				nd.SouthSouth = ast.toFixedNumber(d["64S-44S"], 100, 2);
				nd.SouthSPolo = ast.toFixedNumber(d["90S-64S"], 100, 2);
				ast.yearlyData.push(nd);
			});

			callback();
		},
		function(error) {
			// Error log message
			console.log(error);
		}
	);
}

// Load monthly data and charts
ast.loadMonthlyData = (filename, callback) => {
	ast.monthlyData = [];
	
	d3.csv(filename).then(
		function(data) {

			// Load and parse data
			data.forEach(function(d, i) {
				let nd = {};
				nd.Year = +d.Year;
				nd.Jan = ast.toFixedNumber(d.Jan, 100, 2);
				nd.Feb = ast.toFixedNumber(d.Feb, 100, 2);
				nd.Mar = ast.toFixedNumber(d.Mar, 100, 2);
				nd.Apr = ast.toFixedNumber(d.Apr, 100, 2);
				nd.May = ast.toFixedNumber(d.May, 100, 2);
				nd.Jun = ast.toFixedNumber(d.Jun, 100, 2);
				nd.Jul = ast.toFixedNumber(d.Jul, 100, 2);
				nd.Aug = ast.toFixedNumber(d.Aug, 100, 2);
				nd.Sep = ast.toFixedNumber(d.Sep, 100, 2);
				nd.Oct = ast.toFixedNumber(d.Oct, 100, 2);
				nd.Nov = ast.toFixedNumber(d.Nov, 100, 2);
				nd.Dec = ast.toFixedNumber(d.Dec, 100, 2);
				ast.monthlyData.push(nd);
			});

			callback();
		},
		function(error) {
			// Error log message
			console.log(error);
		}
	);
}

// Add data types to ComboBox
ast.addComboDataType = (varList, defValue) => {
	var options = d3.select("#cmdDataType");

	const addItem = (d, i) => options
		.append("option")
		.text(d.text)
		.attr("value", d.value)
		.property("selected", (d.text == defValue));

	// Calls addLi for each item on the array
  	varList.forEach(addItem)
}

// Add year list to ComboBox
ast.addComboCurrYear = (defValue) => {
	var options = d3.select("#cmdCurrYear");
	options.html("");
	
	var varList = [];
	for (var i=0; i < ast.maxItems; i++)
		varList.push((ast.maxYear - i));
	
	var addItem = (d, i) => options
		.append("option")
		.text(d)
		.attr("value", d.value)
		.property("selected", (d == defValue));
	
	// Calls addLi for each item on the array
  	varList.forEach(addItem)
}

// Create all of yearly charts
ast.createYearlyData = () => {
	
	// Data params
	let xVar = "Year";
	let yVar = "GLob";
	let xTitle = "Date";
	let yTitle = "Avg Temp (°C)";
	let cTitle = "";
	let cutValue = 0;
	
	// Chart 1 - Line chart
	let svgLineChart1 = d3.select("#svgLineChart1");
	cTitle = "Hemisphere Annual Means Temperature";
	varList = ["Glob", "NHem", "SHem"];
	ast.doMSLineChart(ast.yearlyData, svgLineChart1, ast.maxItems, xVar, yVar, xTitle, yTitle, cTitle, varList);
	ast.addLineToChart(ast.yearlyData, svgLineChart1, ast.maxItems, xVar, yVar, cutValue, "series");

	// Chart 2 - Line chart
	let svgLineChart2 = d3.select("#svgLineChart2");
	cTitle = "Zonal Annual Means Temperature";
	varList = ["NorthNPolo", "NorthNorth", "NCenterNorth", "EquNCenter", "EquSCenter", "SCenterSouth", "SouthSouth", "SouthSPolo"];
	ast.doMSLineChart(ast.yearlyData, svgLineChart2, ast.maxItems, xVar, yVar, xTitle, yTitle, cTitle, varList);
	ast.addLineToChart(ast.yearlyData, svgLineChart2, ast.maxItems, xVar, yVar, cutValue, "series");
}

// Create all of monthly charts
ast.createMonthlyCharts = () => {
	
	// Data params
	let currYear = d3.select("#cmdCurrYear").node().value.trim();
	let chartType = d3.select("#cmdChartType").node().value.trim();
	let cutValue = 0;
	let rawdata = [];
	let filterdata = ast.monthlyData[currYear - ast.minYear];
	let monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	monthList.forEach(function(d) {
		rawdata.push({ 'month': d, 'value': +ast.toFixedNumber(filterdata[d], 1, 2) });
	});
	
	// Chart 1 - Bar chart
	let svgBarChart1 = d3.select("#svgBarChart1");
	let xVar = "month";
	let yVar = "value";
	let xTitle = "Month";
	let yTitle = "Avg Temp (°C)";
	let cTitle = "Global Mean Monthly Temperature";
	let sColor = "salmon";
	
	// Create Chart
	if (chartType.indexOf("line") >= 0)
		ast.doLinearChart(rawdata, svgBarChart1, xVar, yVar, xTitle, yTitle, cTitle, sColor)
	else
		ast.doVertBarChart(rawdata, svgBarChart1, xVar, yVar, xTitle, yTitle, cTitle, sColor);
	ast.addLineToChart(rawdata, svgBarChart1, ast.maxItems, xVar, yVar, cutValue, "single");
}

// Create Multi-Series chart
ast.doMSLineChart = (rawdata, svg, maxItems, xVar, yVar, xTitle, yTitle, cTitle, varList) => {
	svg.html("");

	const margin = {top: 50, right: 20, bottom: 50, left: 50},
		iwidth = ast.width - margin.left - margin.right,
		pwidth = 30,
		iheight = ast.height - margin.top - margin.bottom;

	// Manipulate data
	const nMax = rawdata.length;
	const nMin = (nMax - maxItems >= 0? (nMax - maxItems) : 0);
	const lineData = rawdata.slice(nMin, nMax);
	const varData = varList.map(function(id) {
		return {
			id: id,
			values: lineData.map(function(d) {
				return {year: d.Year, temp: +d[id]};
			})
		};
	});

	const x = d3.scaleBand()
		.domain(lineData.map( d => d[xVar]))
		.range([0, iwidth]);

	const y = d3.scaleLinear()
		.domain([
			d3.min(varData, (c) => { return d3.min(c.values, (d) => { return d.temp; }); }),
			d3.max(varData, (c) => { return d3.max(c.values, (d) => { return d.temp; }); })
		])
		.range([iheight, 0]);

	const z = d3.scaleOrdinal(d3.schemeCategory10)
		.domain(varData.map(function(c) { return c.id; }))

	var line = d3.line()
	    .curve(d3.curveBasis)
		.x(function(d) { return x(d.year); })
		.y(function(d) { return y(+d.temp); });

	const g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	g.append("g")
		.attr("class", "axis axis--x")
		.attr("transform", "translate(0," + iheight + ")")
		.call(d3.axisBottom(x));
	
	// text label for the y axis
	g.append("g")
    	.attr("class", "axis axis--y")
		.call(d3.axisLeft(y))
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("x", -(iheight / 2))
		.attr("y", -margin.left)
		.attr("dy", "1em")
		.attr("fill", "#000")
		.style("text-anchor", "middle")
		.style("font-family", "sans-serif")
		.style("font-size", "11pt")
		.text(yTitle);
	
	// text label for the x axis
	g.append("text")
		.attr("x", (iwidth / 2))
		.attr("y", iheight + (margin.bottom / 2))
		.attr("dy", "1em")
		.style("text-anchor", "middle")
		.style("font-family", "sans-serif")
		.style("font-size", "11pt")
		.text(xTitle); 
	
	// add title
	g.append("text")
		.attr("x", (iwidth / 2))
		.attr("y", (10 - margin.top))
		.attr("dy", "1em")
		.style("text-anchor", "middle")
		.style("font-family", "sans-serif")
		.style("font-size", "16pt")
		.text(cTitle)
		.style("color", "steelblue");
	
	var vars = g.selectAll(".vars")
		.data(varData)
		.enter().append("g")
		.attr("class", "vars");
	
	vars.append("path")
		.attr("class", "line")
		.attr("d", function(d) { return line(d.values); })
		.style("stroke", function(d) { return z(d.id); })
		.style("fill", "none");
	
	vars.append("text")
		.datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
		.attr("transform", function(d) { return "translate(" + x(d.value.year) + "," + y(d.value.temp) + ")"; })
		.attr("x", 2)
		.attr("dy", "0.35em")
		.style("font-family", "sans-serif")
		.style("font-size", "10pt")
		.text(function(d) { return d.id; });
}

// Create a Linear chart into a SVG tag
ast.doLinearChart = (rawdata, svg, xVar, yVar, xTitle, yTitle, cTitle, sColor) => {
	svg.html("");

	const margin = {top: 50, right: 20, bottom: 50, left: 50},
		iwidth = ast.width - margin.left - margin.right,
		pwidth = 30,
		iheight = ast.height - margin.top - margin.bottom;

	// Manipulate data
	const lineData = rawdata;
	
  	const x = d3.scaleBand()
		.domain(lineData.map( d => d[xVar]))
		.range([0, iwidth]);
	
	let yMin = d3.min(lineData, d => d[yVar]);
	const y = d3.scaleLinear()
		.domain( [(yMin > 0? 0 : yMin), d3.max(lineData, d => d[yVar])] )
		.range([iheight, 0]);

	const g = svg.append("g")
		.attr("transform", `translate(${margin.left}, ${margin.top})`)
		.style("text-anchor", "middle")
		.style("color", "black")
   
	g.append("g")
		.call(d3.axisBottom(x))
		.attr("transform", `translate(0, ${iheight})`);
  
	g.append("g")
		.call(d3.axisLeft(y));

	// text label for the x axis
	g.append("text")
		.attr("x", (iwidth / 2))
		.attr("y", iheight + (margin.bottom / 2))
		.attr("dy", "1em")
		.style("text-anchor", "middle")
		.style("font-family", "sans-serif")
		.style("font-size", "11pt")
		.text(xTitle); 

	// text label for the y axis
	g.append("text")
		.attr("transform", "rotate(-90)")
		.attr("x", -(iheight / 2))
		.attr("y", -margin.left)
		.attr("dy", "1em")
		.style("text-anchor", "middle")
		.style("font-family", "sans-serif")
		.style("font-size", "11pt")
		.text(yTitle); 

	// add title
	g.append("text")
		.attr("x", (iwidth / 2))
		.attr("y", (10 - margin.top))
		.attr("dy", "1em")
		.style("text-anchor", "middle")
		.style("font-family", "sans-serif")
		.style("font-size", "16pt")
		.text(cTitle)
		.style("color", "steelblue");

	// add points
	const line = d3.line()
		.x( d=> x(d[xVar]))
		.y( d=> y(d[yVar]));

	// add line between points
	g.append("path")
		.style("stroke", sColor)
		.style("fill", "none")
		.attr("d", line(lineData))
		.attr("transform", `translate(${pwidth})`);
  
	let tooltip, yValue;
	g.selectAll("circle")
		.data(lineData).enter()
		.append("circle")
		.attr("cx", d => x(d[xVar]))
		.attr("cy", d => y(d[yVar])) 
		.attr("r", 4)
		.style("fill", sColor)
		.attr("transform", `translate(${pwidth})`)
		.on("mouseover", function (d) {
     		yValue = d3.format(".2f")(d[yVar]);
        	tooltip.attr("x", (30 + x(d[xVar])))
				.attr("y", (15 + y(d[yVar])))
				.text(`[${d[xVar]}, ${yValue}]`);
    
			d3.select(this)
				.transition()
				.duration(500);
		});  
  
	tooltip = g.append("text")
		.style("font-family", "sans-serif")
		.style("font-size", "10pt")
		.style("color", "steelblue")
		.attr("x", -100);
  
	return svg.node();
}

// Create a Bar chart into a SVG tag
ast.doVertBarChart = (rawdata, svg, xVar, yVar, xTitle, yTitle, cTitle, sColor) => {
	svg.html("");

	const margin = {top: 50, right: 20, bottom: 50, left: 60},
		iwidth = ast.width - margin.left - margin.right,
		pwidth = 30,
		iheight = ast.height - margin.top - margin.bottom;
	
	// Manipulate data
	const barData = rawdata;
  	
  	const x = d3.scaleBand()
		.domain(barData.map( d => d[xVar]))
		.range([0, iwidth]);
	
	let yMin = d3.min(barData, d => d[yVar]);
	const y = d3.scaleLinear()
		.domain( [(yMin > 0? 0 : yMin), d3.max(barData, d => d[yVar])] )
		.range([iheight, 0]);

	const g = svg.append("g")
		.attr("transform", `translate(${margin.left}, ${margin.top})`)
		.style("text-anchor", "middle")
		.style("color", "black")

	g.append("g")
		.call(d3.axisBottom(x))
		.attr("transform", `translate(0, ${iheight})`);
  
	g.append("g")
		.call(d3.axisLeft(y));

	// text label for the x axis
	g.append("text")
		.attr("x", (iwidth / 2))
		.attr("y", iheight + (margin.bottom / 2))
		.attr("dy", "1em")
		.style("text-anchor", "middle")
		.style("font-family", "sans-serif")
		.style("font-size", "11pt")
		.text(xTitle); 

	// text label for the y axis
	g.append("text")
		.attr("transform", "rotate(-90)")
		.attr("x", -(iheight / 2))
		.attr("y", -margin.left)
		.attr("dy", "1em")
		.style("text-anchor", "middle")
		.style("font-family", "sans-serif")
		.style("font-size", "11pt")
		.text(yTitle); 

	// add title
	g.append("text")
		.attr("x", (iwidth / 2))
		.attr("y", (10 - margin.top))
		.attr("dy", "1em")
		.style("text-anchor", "middle")
		.style("font-family", "sans-serif")
		.style("font-size", "16pt")
		.text(cTitle)
		.style("color", "steelblue");

	// add points
	const rects = svg.selectAll(".bar")
		.data(barData);
  
	rects.enter()
    	.append("rect")
		.attr("class", "bar")
		.attr("x", (d) => (x(d[xVar]) + margin.left + 20))
		.attr("y", (d) => (y(d[yVar]) + margin.top))
		.attr("width", 20)
		.attr("height", (d) => (iheight - y(d[yVar])))
		.style("fill", sColor);

	return svg.node();	
}

// Adding a line to chart
ast.addLineToChart = (rawdata, svg, maxItems, xVar, yVar, cutValue, chartType) => {
	const margin = {top: 50, right: 20, bottom: 50, left: 50},
		iwidth = ast.width - margin.left - margin.right,
		pwidth = 30,
		iheight = ast.height - margin.top - margin.bottom;

	// Manipulate data
	const n = rawdata.length;
	const lineData = rawdata.slice((n - maxItems), n);
	const varList = ["Glob", "NHem", "SHem"];
	const x = d3.scaleBand();
	const y = d3.scaleLinear();
	var warnLine;
	var varData = [];
	
	if (chartType.indexOf("series") >= 0) {
		
		varData = varList.map(function(id) {
			return {
				id: id,
				values: lineData.map(function(d) {
					return {year: d.Year, temp: +d[id]};
				})
			};
		});
		
		x.domain(lineData.map( d => d[xVar]))
		 .range([0, iwidth]);
		
		y.domain([
			d3.min(varData, (c) => { return d3.min(c.values, (d) => { return d.temp; }); }),
			d3.max(varData, (c) => { return d3.max(c.values, (d) => { return d.temp; }); })
		])
		.range([iheight, 0]);
		
		warnLine = {
			label: 'Punto de corte',
			x1: x(d3.min(lineData, (d) => d[xVar])),
			x2: x(d3.max(lineData, (d) => d[xVar])) * 1.01,
			y1: (y(cutValue)),
			y2: (y(cutValue))
		};
	}
	else if (chartType.indexOf("single") >= 0) {
		
		varData = rawdata;
		
		x.domain(varData.map( d => d[xVar]))
		 .range([0, iwidth]);
		
		let yMin = d3.min(varData, d => d[yVar]);
		y.domain([
			(yMin > 0? 0 : yMin),
			d3.max(varData, d => d[yVar])
		])
		.range([iheight, 0]);
		
		warnLine = {
			label: 'Punto de corte',
			x1: x(varData[0][xVar]) + 10,
			x2: x(varData[11][xVar]) + margin.left,
			y1: (y(cutValue)),
			y2: (y(cutValue))
		};
	}
	
	const g = svg.append('g')
		.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
	
	g.append('line')
		.attr('x1', warnLine.x1)
		.attr('y1', warnLine.y1)
		.attr('x2', warnLine.x2)
		.attr('y2', warnLine.y2)
		.attr('class', 'zeroline');
}

/********* Start Utility Functions *********/

// Get Fixed Number
ast.toFixedNumber = (value, mult, dec) => {
	if(isNumeric(value))
		return (mult * value).toFixed(dec);
	return 0;
}

// IsNumeric function in Javascript
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

/********** End Utility Functions **********/