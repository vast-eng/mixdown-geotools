var broadway = require('broadway');
var geoTools = require('../index.js');
var assert = require('assert');

var KM = 111.1951;
var MI = 69.09341;

suite('Midpoint function test', function () {
  var app = {
    plugins: new broadway.App()
  };

  var ne = { latitude: 19.160, longitude: -91.120 };
  var sw = { latitude: 19.080, longitude: -91.030 };
  var goldDegrees = { 
    unit: 'degrees',
    width: 0.09000000000000341,
    height: 0.08000000000000185,
    diagonal: 0.12041594578792672
  };
  var goldKilometers = { 
    unit: 'kilometers',
    width: 10.007559000000379,
    height: 8.895608000000205,
    diagonal: 13.38966313348309
  };
  var goldMiles = { 
    unit: 'miles',
    width: 6.218406900000236,
    height: 5.527472800000128,
    diagonal: 8.319948312862994
  };

  app.plugins.use(new geoTools.GeoToolsPlugin(), {});

  test('Attach Plugin and test size degrees', function (done) {
    var size = app.plugins.geoTools.size(sw, ne);
    assert.deepEqual(size, goldDegrees, 'Should match correct size');
    done();
  });

  test('Library test size degrees', function (done) {
    var size = geoTools.size(sw, ne);
    assert.deepEqual(size, goldDegrees, 'Should match correct size');
    done();
  });

  test('Attach Plugin and test size kilometers', function (done) {
    var size = app.plugins.geoTools.size(sw, ne, 'kilometers');
    assert.deepEqual(size, goldKilometers, 'Should match correct size');
    done();
  });

  test('Library test size kilometers', function (done) {
    var size = geoTools.size(sw, ne, 'kilometers');
    assert.deepEqual(size, goldKilometers, 'Should match correct size');
    done();
  });

  test('Attach Plugin and test size miles', function (done) {
    var size = app.plugins.geoTools.size(sw, ne, 'miles');
    assert.deepEqual(size, goldMiles, 'Should match correct size');
    done();
  });

  test('Library test size miles', function (done) {
    var size = geoTools.size(sw, ne, 'miles');
    assert.deepEqual(size, goldMiles, 'Should match correct size');
    done();
  });
});