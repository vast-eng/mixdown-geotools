var broadway = require('broadway');
var geoTools = require('../index.js');
var assert = require('assert');

suite('Midpoint function test', function () {
  var app = {
    plugins: new broadway.App()
  };

  var points = [ 
    { latitude: 19.160, longitude: -91.120 },
    { latitude: 19.080, longitude: -91.030 }
  ];
  var gold = { latitude: 19.119999999999997, longitude: -91.075 };

  test('Attach Plugin and test Midpoint', function (done) {
    app.plugins.use(new geoTools.GeoToolsPlugin(), {});
    var mid = app.plugins.geoTools.midpoint(points);
    assert.deepEqual(mid, gold, 'Should match correct midpoint');
    done();
  });

  test('Library test Midpoint', function (done) {
    var mid = geoTools.midpoint(points);
    assert.deepEqual(mid, gold, 'Should match correct midpoint');
    done();
  });

});