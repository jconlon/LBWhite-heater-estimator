/**
 * 
 */

var PREMIER_80 = 80000;
var PREMIER_170 = 170000;
var PREMIER_350 = 350000;
var DIRECTOR_300 = 258700;
var FOREMAN_500 = 500000;

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
	
	this.f500 = function(){
		return this.suggest(FOREMAN_500);
	};
	
}



