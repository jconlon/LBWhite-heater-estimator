/**
 * HeaterCalc class with variables for the products and calculation functions.
 */

const PREMIER_80 = 80000;
const PREMIER_170 = 170000;
const PREMIER_350 = 350000;

const TRADESMAN_125 = 125000;
const TRADESMAN_170 = 170000;
const TRADESMAN_400 = 400000;

const TRADESMAN_K75  =  75000;
const TRADESMAN_K125 = 125000;
const TRADESMAN_K175 = 175000;
const TRADESMAN_K210 = 210000;
const TRADESMAN_K400 = 400000;
const TRADESMAN_K650 = 650000;

const FOREMAN_500 = 500000;
const FOREMAN_750 = 750000;

const BOSS_400 =   400000;
const BOSS_1000 = 1000000;

const NORSEMAN_200 = 200000;
const NORSEMAN_250 = 250000;

const WORKMAN_100 = 100000;
const WORKMAN_225 = 225000;

const SUNBLAST_15 =   15000;
const SUNBLAST_30 =   30000;
const SUNBLAST_35 =   35000;
const SUNBLAST_125 = 125000;

// const METRIC_UNITS = 8.454221213;
const FEETUNITS = 0.133;// Changed back to original value from 0.266; see Issue 9 and 18

function HeaterCalc(volumeUnits){
	
	this.volumeUnits =volumeUnits;
	this.height = 0;
	this.width = 0;
	this.lenght = 0;
	this.tempRise = 0;
	if(volumeUnits == 0.133){
		//volumeUnits is Feet set default temp Fahrenheit
		this.tempUnits = 'F';
	}else{
		//volumeUnits is Meters set default temp Celsius
		this.tempUnits = 'C';
	}
	
	this.setDimensions = function(height,width,length){
		this.height = height;
		this.width = width;
		this.lenght = length;
	};

	this.setVolumeUnits = function(volumeUnits){
		this.volumeUnits =volumeUnits;
	};

	this.setTempUnits = function(tempUnits){
		this.tempUnits = tempUnits;
	}
	
	this.setTempRise = function(tempRise){
		this.tempRise =tempRise;
	};
	
	this.volume = function(){
		var volume = this.height * this.width * this.lenght;
		if (isNaN(volume)) { 
			volume = ""; 
	    }
		return volume;
	};

	this.isVolumeUnitMeters = function(){
		return this.volumeUnits > 1;
	}

	this.c

	// For Metric height, width, and length always calculate back
	// to feet "in the background"
	// This feature obsoletes - Issue 10 The formula needs to be:"
	// ([total cubic meters of tent/marquee]*2.6)*([Desired Rise in room temp]*1.8)
	this.heatReq = function(){
		var roomVolume = this.volume();
		if(roomVolume==""){
			return "";
		}
		if(this.isVolumeUnitMeters()){
			// console.log("Metric Volume converting to Feet Volume");
			roomVolume = this.convertMetricToFeetVolume(this.volume());
		}
		//tempRise are now all calculated in Fahrenheit
		var tempRiseInF = this.tempRise;
		if(this.tempUnits == 'C'){
			// console.log("Feet volume and Celsius calculation "+this.tempRise);
			// console.log("Celsius to Farenheit "+this.convertCelsiusToFarienheit(this.tempRise));
			tempRiseInF= this.convertCelsiusToFarienheit(this.tempRise);
		}
		// console.log("Feet volume and Farenheit calculation");
		return Math.round((FEETUNITS * roomVolume) * tempRiseInF);
		
			
	};

	this.convertCelsiusToFarienheit = function(tempRiseCelsius) {
		return tempRiseCelsius * 1.8;
	}

	this.convertFarienheitToCelsius = function(tempRiseFarienheit) {
		return tempRiseFarienheit / 1.8;
	}

	this.convertMetricToFeet = function(meters) {
		return meters * 3.2808;
	}

	this.convertFeetToMetric = function(feet) {
		return feet / 3.2808;
	}

	this.convertMetricToFeetVolume = function(squareMeters) {
		return squareMeters * 35.315;
	}

	this.convertFeetToMetricVolume = function(squareFeet) {
		return squareFeet / 35.315;
	}
	
	this.myRound = function(value, places) {
	    var multiplier = Math.pow(10, places);

	    return (Math.round(value * multiplier) / multiplier);
	};
	
	this.heatReqBtu = function(){
		if(this.heatReq()==""){
			return "";
		}

		return this.heatReq();
	}
	
	this.heatReqWatts = function(){
		if(this.heatReq()==""){
			return "";
		}

		//Imperial watts to btus ([calculated Watts required]*3.4121414799)/[btuh output available]
		return this.heatReq()/3.4121414799;
	}
	
	this.suggest = function(heater){
		if(this.heatReq()==""){
			return "";
		}
		var realBtuhReq = this.heatReq();
		
		var raw = realBtuhReq/heater;
		return raw.toFixed(1);
	};

	this.p80 = function(){
		return this.suggest(PREMIER_80);
	};
	
	this.p170 = function(){
		return this.suggest(PREMIER_170);
	};
	
	this.p350 = function(){
		return this.suggest(PREMIER_350);
	};
	
	this.t125 = function(){
		return this.suggest(TRADESMAN_125);
	};
	
	this.t170 = function(){
		return this.suggest(TRADESMAN_170);
	};
	
	this.t400 = function(){
		return this.suggest(TRADESMAN_400);
	};
	
	this.tk75 = function(){
		return this.suggest(TRADESMAN_K75);
	};
	
	this.tk125 = function(){
		return this.suggest(TRADESMAN_K125);
	};
	
	this.tk175 = function(){
		return this.suggest(TRADESMAN_K175);
	};
	
	this.tk210 = function(){
		return this.suggest(TRADESMAN_K210);
	};
	
	this.tk400 = function(){
		return this.suggest(TRADESMAN_K400);
	};
	
	this.tk650 = function(){
		return this.suggest(TRADESMAN_K650);
	};
	
	this.f500 = function(){
		return this.suggest(FOREMAN_500);
	};
	this.f750 = function(){
		return this.suggest(FOREMAN_750);
	};
	
	this.b400 = function(){
		return this.suggest(BOSS_400);
	};
	this.b1000 = function(){
		return this.suggest(BOSS_1000);
	};
	
	this.n200 = function(){
		return this.suggest(NORSEMAN_200);
	};
	this.n250 = function(){
		return this.suggest(NORSEMAN_250);
	};
	
	this.w100 = function(){
		return this.suggest(WORKMAN_100);
	};
	this.w225 = function(){
		return this.suggest(WORKMAN_225);
	};
	
	this.s15 = function(){
		return this.suggest(SUNBLAST_15);
	};
	this.s30 = function(){
		return this.suggest(SUNBLAST_30);
	};
	
	this.s35 = function(){
		return this.suggest(SUNBLAST_35);
	};
	this.s125 = function(){
		return this.suggest(SUNBLAST_125);
	};

}



