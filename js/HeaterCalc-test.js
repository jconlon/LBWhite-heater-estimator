var test = require('tape');
var fs = require('fs');

// file is included here:
eval(fs.readFileSync('js/HeaterCalc.js') + '');

//These vars are copied from the controller
var METRIC_UNITS = 8.454221213;
var FEET_UNITS = 0.133;




test('Instantiate HeaterCalc with Feet', (assert) => {
  const c = new HeaterCalc(FEET_UNITS);
  var actual = JSON.stringify(c);
  var expected = '{"volumeUnits":0.133,"height":0,"width":0,"lenght":0,"tempRise":0,"tempUnits":"F"}';
  assert.equal(actual, expected);
  c.setTempUnits('C');
  actual = JSON.stringify(c);
  expected = '{"volumeUnits":0.133,"height":0,"width":0,"lenght":0,"tempRise":0,"tempUnits":"C"}';
  assert.equal(actual, expected);
  c.setDimensions(10,11,12);
  c.setTempRise(9);
  actual = JSON.stringify(c);
  expected = '{"volumeUnits":0.133,"height":10,"width":11,"lenght":12,"tempRise":9,"tempUnits":"C"}';
  assert.end();
});

test('Instantiate HeaterCalc with Meters', (assert) => {
  var c = new HeaterCalc(METRIC_UNITS);
  var actual = JSON.stringify(c);
  var expected = '{"volumeUnits":8.454221213,"height":0,"width":0,"lenght":0,"tempRise":0,"tempUnits":"C"}';
  assert.equal(actual, expected);
  assert.end();
});


test('Convert degrees Celsius (°C)	to degrees Fahrenheit (°F)', (assert) => {
  var c = new HeaterCalc(FEET_UNITS);
  const actual = c.convertCelsiusToFarienheit(1);
  const expected = 1.8;
  assert.equal(actual, expected,
    '1 degree c should be 1.8 f');
  console.log(JSON.stringify(c))
  assert.end();
});

test('Convert volume square meters to square feet', (assert) => {
  var c = new HeaterCalc(FEET_UNITS);
  const actual = c.convertMetricToFeetVolume(1);
  const expected = 10.76;
  assert.equal(actual, expected,
    'Should be 10.76');
  assert.end();
});

test('Convert volume square feet to square meters', (assert) => {
  var c = new HeaterCalc(FEET_UNITS);
  const actual = c.convertFeetToMetricVolume(100);
  const expected = 9.29;
  assert.equal(actual, expected,
    'Should be 9.29');
  assert.end();
});

test('Calculate Volume in Feet', (assert) => {
  var c = new HeaterCalc(FEET_UNITS);
  c.setDimensions(10, 10, 10);
  const actual = c.volume();
  const expected = 1000;
  assert.equal(actual, expected,
    'With Feet Units Should be 1000 cubic feet.');
  assert.end();
});

test('Calculate Volume in Meters', (assert) => {
  var c = new HeaterCalc(METRIC_UNITS);
  c.setDimensions(10, 10, 10);
  const actual = c.volume();
  const expected = 1000;
  assert.equal(actual, expected,
    'With Metric Units volume should be 1000 cubic meters.');
  assert.end();
});

test('BTUs for volume in Feet for same temperature rise of °F and °C', (assert) => {
  var c = new HeaterCalc(FEET_UNITS);
  c.setDimensions(10, 10, 10);
  c.setTempRise(10);
  // c.setUnitFactor(FEET_UNITS)
  var actual = c.volume();
  var expected = 1000;
  assert.equal(actual, expected,
    'With Feet Units Volume Should be 1000 cubic feet.');
  
  //Farenheit is the default tempUnit
  actual = c.heatReqBtu();
  expected = 1330;
  assert.equal(actual, expected,
    'With Feet Units volume 1000 and 10 degrees F, the BTUS Should be 1330 Btus.');

  //Change tempUnits to celsius and TempRise to the corresponding converted
  //value of 10F to 5.556 C
  c.setTempUnits('C');
  c.setTempRise(5.556);

  actual = c.heatReqBtu();
  expected = 1330;
  assert.equal(actual, expected,
    'With Feet Units volume 1000 and 5.556 degrees C, the BTUS Should be 1330 Btus.');
  assert.end();
});

test('BTUs for volume in Meters for same temperature rise of °C and °F', (assert) => {
  var c = new HeaterCalc(METRIC_UNITS);
  c.setDimensions(10, 10, 10);
  c.setTempRise(10);
  var actual = c.volume();
  var expected = 1000;
  assert.equal(actual, expected,
    'With Metric Units volume should be 1000 cubic meters.');

  actual = c.heatReqBtu();
  expected = 159688.22125931998;
  assert.equal(actual, expected,
    'With Metric Units volume and Celsius BTUs should be 159688.22125931998');

  //Change tempUnits to F and TempRise to the corresponding converted
  //value of 10C to 18 F
  c.setTempUnits('F');
  c.setTempRise(18);

  actual = c.heatReqBtu();

  expected = 159688.22125931998;
  assert.equal(actual, expected,
    'With Metric Units volume 1000 and 18 degrees F, the BTUS Should be 159688.22125931998 Btus.');

  assert.end();
});

test('BTUs for constant feet volume equivilant temperature rise of °F and °C', (assert) => {
  var c = new HeaterCalc(FEET_UNITS);
  c.setDimensions(10, 10, 40);
  c.setTempRise(50);
  //Farenheit is the default tempUnit
  actual = c.heatReqBtu();
  const expected =  26600;
  assert.equal(actual, expected,
    'With Feet Units volume 4000 and 50 degrees F, the BTUS Should be 26600 Btus.');

  //Change tempUnits to celsius and TempRise to the corresponding converted
  //value of 27.7777778 C
  c.setTempUnits('C');
  c.setTempRise(27.7777778);

  actual = c.heatReqBtu();
  assert.equal(actual, expected,
    'With Feet Units volume 4000 and 27.78 degrees C, the BTUS Should be 1330 Btus.');
  assert.end();
});