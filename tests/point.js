var broadway = require('broadway');
var geoTools = require('../index.js');
var assert = require('assert');

suite('Midpoint function test', function () {
  var app = {
    plugins: new broadway.App()
  };

  var pointString = "29.123,-90.456";
  var goldPoint = {
    latitude: 29.123,
    longitude: -90.456
  };

  test('Attach Plugin and test Midpoint', function (done) {
    app.plugins.use(new geoTools.GeoToolsPlugin(), {});
    var point = app.plugins.geoTools.parsePoint(pointString);
    assert.deepEqual(point, goldPoint, 'Should match correct midpoint');
    done();
  });

  test('Library test Midpoint', function (done) {
    var point = geoTools.parsePoint(pointString);
    assert.deepEqual(point, goldPoint, 'Should match correct midpoint');
    done();
  });

});