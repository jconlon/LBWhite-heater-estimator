/**
 * Main controller.  Utilizes the HeaterCalc class.
 */

const METRIC_UNITS = 8.454221213;
const FEET_UNITS = 0.133;// Changed back to original value from 0.266; see Issue 9 and 18

const Units = new Object();
Units[0] = FEET_UNITS;
Units[1] = METRIC_UNITS;

const BTUHREQWORDS = ["Btuh's", "Watts"];
var btuhReqWord = BTUHREQWORDS[0];

// Celsius to Fahrenheit
const DEGREE_ABR = ["F", "C"];

// Create the HeatCalc Feet and Fahrenheit
const calculator = new HeaterCalc(Units[0]);

window.onload = init;

/**
 * Initializes all document element listeners on page load
 */
function init() {
	console.log("INIT");
	// Add listeners to selection elements

	//Feet or Meter selection
	var unitSelect = document.getElementById("unitSelect");
	unitSelect.addEventListener("change", changeVolumeUnits, false);

	//Fahrenheit or Celsius selection
	var unitTempSelect = document.getElementById("unitTempSelect");
	unitTempSelect.addEventListener("change", changeTempUnits, false);

	var tempRiseSelect = document.getElementById("riseSelectUnits");
	tempRiseSelect.addEventListener("change", compute, false);

	var unitTempSelect = document.getElementById("unitTempSelect");
	unitTempSelect.addEventListener("change", compute, false);

	var productSelect = document.getElementById("productSelect");
	productSelect.options[0].selected = true;
	productSelect.addEventListener("change", changeProductSelected, false);

	// Add listeners to the spatial inputs
	var f = document.volumecalc_form; // This is the form we'll we working
	// with;
	f.height.addEventListener("change", compute, false);
	f.width.addEventListener("change", compute, false);
	f.length.addEventListener("change", compute, false);
	window.addEventListener("load", function () { hideAddressBar(); });
	window.addEventListener("orientationchange", function () { hideAddressBar(); });
}

/**
 * Called when products are selected.
 */
function changeProductSelected() {
	// get the product 
	var target = document.getElementById("productSelect");
	var vis = document.querySelector('.vis'), target = document.getElementById(this.value);
	if (vis !== null) {
		vis.className = 'inv';
	}
	if (target !== null) {
		target.className = 'vis';
	}
}

/**
 * Related to Issue #23 Btu’hs s are not the same when showing Fahrenheit and Celsius 
 * for same volume room. 
 */
function changeTempUnits() {
	// get the temp rise measurementUnit  f or c 
	const unitSelectObj = document.getElementById("unitTempSelect");
	const unitSelectObjIndex = unitSelectObj.selectedIndex;

	//Get the new tempRiseSelectUnits
	const tempRiseSelectUnitsObj = document.getElementById("riseSelectUnits");
	const tempRiseSelectUnitsValue = tempRiseSelectUnitsObj.value;
	// (f = 0 and c = 1)
	if(unitSelectObjIndex==0){
		//C to F
		// console.log("RiseSelectUnits in C: "+tempRiseSelectUnitsValue);
		const inF = calculator.convertCelsiusToFarienheit(tempRiseSelectUnitsValue);
		// console.log("RiseSelectUnits in F: "+inF);
		tempRiseSelectUnitsObj.value = inF;
	}else{
		//F to C
		// console.log("RiseSelectUnits in F: "+tempRiseSelectUnitsValue);
		const inC = calculator.convertFarienheitToCelsius(tempRiseSelectUnitsValue);
		// console.log("RiseSelectUnits in Celsius: "+inC);
		tempRiseSelectUnitsObj.value = inC;

	}

	// change temp measurement Units 
	changeMeasurementUnitNames(DEGREE_ABR[unitSelectObjIndex], "tempUnits");
	calculator.setTempUnits(DEGREE_ABR[unitSelectObjIndex]);
	compute();
}
//VolumeUnits has changed.  Convert the W,L,H from F to M or M to F
function changeVolumeUnits() {
	// get the spatial measurementUnit
	var unitSelectObj = document.getElementById("unitSelect");
	var unitSelectObjIndex = unitSelectObj.selectedIndex;
	var spaceUnitValue = unitSelectObj[unitSelectObjIndex].value;
	var spaceUnitText = unitSelectObj[unitSelectObjIndex].text;

	// get the three measurements
	var f = document.volumecalc_form; // This is the form we'll we working
	var height = parseFloat(f.height.value);
	var width = parseFloat(f.width.value);
	var length = parseFloat(f.length.value);
	if(spaceUnitText=="Feet"){
		//Change to Feet
		if (isNaN(height)) {
			height = 0;
			f.height.value = "";
		} else {
			f.height.value = calculator.convertMetricToFeet(height);
		}
		if (isNaN(width)) {
			width = 0;
			f.width.value = "";
		} else {
			f.width.value = calculator.convertMetricToFeet(width);
		}
		if (isNaN(length)) {
			length = 0;
			f.length.value = "";
		} else {
			f.length.value = calculator.convertMetricToFeet(length);
		}
	}else{
		//Change to Meters
		if (isNaN(height)) {
			height = 0;
			f.height.value = "";
		} else {
			f.height.value = calculator.convertFeetToMetric(height);
		}
		if (isNaN(width)) {
			width = 0;
			f.width.value = "";
		} else {
			f.width.value = calculator.convertFeetToMetric(width);
		}
		if (isNaN(length)) {
			length = 0;
			f.length.value = "";
		} else {
			f.length.value = calculator.convertFeetToMetric(length);
		}
	}

	btuhReqWord = BTUHREQWORDS[unitSelectObjIndex];
	var unitFactor = Units[unitSelectObjIndex];
	calculator.setVolumeUnits(unitFactor);
	// Change all space Units to Feet or Meters
	changeMeasurementUnitNames(spaceUnitValue, "spaceUnits");
	changeMeasurementUnitNames(spaceUnitText, "spaceUnitsName");

	compute();
}



// This function computes the suggested heater and updates all the elements in
// the form.
// It is triggered whenever anything changes, and makes sure that
// all elements of the form contains legal values and are consistent.
function compute() {

	var f = document.volumecalc_form; // This is the form we'll we working
	// with;

	// line 1, height
	var height = parseFloat(f.height.value);
	if (isNaN(height)) {
		height = 0;
		f.height.value = "";
	} else {
		f.height.value = height;
	}

	// line 2, width
	var width = parseFloat(f.width.value);
	if (isNaN(width)) {
		width = 0;
		f.width.value = "";
	} else {
		f.width.value = width;
	}

	// Line 3: length
	var length = parseFloat(f.length.value);
	if (isNaN(length)) {
		length = 0;
		f.length.value = "";
	} else {
		f.length.value = length;
	}

	// get the selected temp value
	var tempRiseSelectUnitsObj = document.getElementById("riseSelectUnits");
	var tempRise = tempRiseSelectUnitsObj.value;

	calculator.setDimensions(height, width, length);
	calculator.setTempRise(tempRise);

	// Volume
	var volumeElement = document.getElementById("volume");
	var volume = calculator.volume();
	if (volume == "" || volume == 0) {
		volumeElement.innerHTML = "";
	} else {
		volumeElement.innerHTML = addCommas(volume);
	}

	// heat Requirements BTUS
	var btusReqNumElement = document.getElementById("btusReqNumber");
	var btus = calculator.heatReqBtu();
	if (btus == "") {
		btusReqNumElement.innerHTML = "";

	} else {
		btusReqNumElement.innerHTML = addCommas(btus);

	}

	// heat Requirements Watts
	var wattsReqNumElement = document.getElementById("wattsReqNumber");
	var watts = calculator.heatReqWatts();
	if (watts == "") {
		wattsReqNumElement.innerHTML = "";

	} else {
		wattsReqNumElement.innerHTML = addCommas(Math.round(watts));
	}

	// Suggestions

	// Heaters
	var element = document.getElementById("p80");
	element.innerHTML = calculator.p80();

	element = document.getElementById("p170");
	element.innerHTML = calculator.p170();

	element = document.getElementById("p350");
	element.innerHTML = calculator.p350();

	element = document.getElementById("t125");
	element.innerHTML = calculator.t125();

	element = document.getElementById("t170");
	element.innerHTML = calculator.t170();

	element = document.getElementById("t400");
	element.innerHTML = calculator.t400();

	element = document.getElementById("tk75");
	element.innerHTML = calculator.tk75();

	element = document.getElementById("tk125");
	element.innerHTML = calculator.tk125();

	element = document.getElementById("tk175");
	element.innerHTML = calculator.tk175();

	element = document.getElementById("tk210");
	element.innerHTML = calculator.tk210();

	element = document.getElementById("tk400");
	element.innerHTML = calculator.tk400();

	element = document.getElementById("tk650");
	element.innerHTML = calculator.tk650();

	element = document.getElementById("b400");
	element.innerHTML = calculator.b400();

	element = document.getElementById("b1000");
	element.innerHTML = calculator.b1000();


	element = document.getElementById("n200");
	element.innerHTML = calculator.n200();

	element = document.getElementById("n250");
	element.innerHTML = calculator.n250();

	element = document.getElementById("w100");
	element.innerHTML = calculator.w100();

	element = document.getElementById("w225");
	element.innerHTML = calculator.w225();

	element = document.getElementById("s15");
	element.innerHTML = calculator.s15();

	element = document.getElementById("s30");
	element.innerHTML = calculator.s30();

	element = document.getElementById("s35");
	element.innerHTML = calculator.s35();

	element = document.getElementById("s125");
	element.innerHTML = calculator.s125();

	element = document.getElementById("f500");
	element.innerHTML = calculator.f500();

	element = document.getElementById("f750");
	element.innerHTML = calculator.f750();

}

/**
 * 
 * @param name
 *            of MeasurementUnit
 */
function changeMeasurementUnitNames(name, clz) {
	var x = document.getElementsByClassName(clz);

	var arrayLength = x.length;
	for (var i = 0; i < arrayLength; i++) {
		x[i].innerHTML = name;
	}
}

function addCommas(nStr) {
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function hideAddressBar() {
	if (document.documentElement.scrollHeight < window.outerHeight / window.devicePixelRatio)
		document.documentElement.style.height = (window.outerHeight / window.devicePixelRatio) + 'px';
	setTimeout(window.scrollTo(1, 1), 0);
}
