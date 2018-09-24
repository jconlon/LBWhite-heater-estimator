/**
 * 
 */

var PREMIER_80 = 80000;
var PREMIER_170 = 170000;
var PREMIER_350 = 350000;

var TRADESMAN_125 = 125000;
var TRADESMAN_170 = 170000;
var TRADESMAN_400 = 400000;

var TRADESMAN_K75  =  75000;
var TRADESMAN_K125 = 125000;
var TRADESMAN_K175 = 175000;
var TRADESMAN_K210 = 210000;
var TRADESMAN_K400 = 400000;
var TRADESMAN_K650 = 650000;

var FOREMAN_500 = 500000;
var FOREMAN_750 = 750000;

var BOSS_400 =   400000;
var BOSS_1000 = 1000000;

var NORSEMAN_200 = 200000;
var NORSEMAN_250 = 250000;

var WORKMAN_100 = 100000;
var WORKMAN_225 = 225000;

var SUNBLAST_15 =   15000;
var SUNBLAST_30 =   30000;
var SUNBLAST_35 =   35000;
var SUNBLAST_125 = 125000;

function HeaterCalc(unitFactor){
	
	this.unitFactor =unitFactor;
	this.height = 0;
	this.width = 0;
	this.lenght = 0;
	this.tempRise = 0;
	
	this.setDimensions = function(height,width,length){
		this.height = height;
		this.width = width;
		this.lenght = length;
	};

	this.setUnitFactor = function(unitFactor){
		this.unitFactor =unitFactor;
	};
	
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
	
	this.heatReq = function(){
		if(this.volume()==""){
			return "";
		}
		if(this.unitFactor > 1){
//			alert("Metric Calculation: ");
			//Issue 10 The formula needs to be:"([total cubic meters of tent/marquee]*2.6)*([Desired Rise in room temp]*1.8)
			return Math.round((2.6 * this.volume()) * (this.tempRise * 1.8));
		}
//		alert("Feet Calculation:");
		return Math.round((this.unitFactor * this.volume()) * this.tempRise);
		
		
	};
	
	this.myRound = function(value, places) {
	    var multiplier = Math.pow(10, places);

	    return (Math.round(value * multiplier) / multiplier);
	};
	
	this.heatReqBtu = function(){
		if(this.heatReq()==""){
			return "";
		}
		if(this.unitFactor > 1){
//			alert("Metric Calculation: ");
			//For btus to watts 
			return (this.heatReq()*3.4121414799);
		}else{
			return this.heatReq();
		}
	}
	
	this.heatReqWatts = function(){
		if(this.heatReq()==""){
			return "";
		}
		if(this.unitFactor > 1){
//			alert("Metric Calculation: ");
			return this.heatReq();
		}else{
			//Imperial watts to btus ([calculated Watts required]*3.4121414799)/[btuh output available]
			return this.heatReq()/3.4121414799;
		}
	}
	
	this.suggest = function(heater){
		if(this.heatReq()==""){
			return "";
		}
		var realBtuhReq;
		if(this.unitFactor > 1){
//			alert("Metric Calculation: ");
			//Issue 12: For metric ([calculated Watts required]*3.4121414799)/[btuh output available]
			realBtuhReq = (this.heatReq()*3.4121414799);
		}else{
			realBtuhReq = this.heatReq();
		}
		
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



