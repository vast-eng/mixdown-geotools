var KM = 111.1951;
var MI = 69.09341;

// @param sw {Object} - coordinates
// @param sw.latitude {Number} - latitude
// @param sw.longitude {Number} - longitude
// @param ne {Object} - coordinates
// @param ne.latitude {Number} - latitude
// @param ne.longitude {Number} - longitude
// @param unit {String} [optional] - possible values - "degrees", miles", "kilometers".  default is degrees
// returns { width: , height: , diagonal: }
var size = function(sw, ne, unit) {
  unit = unit || 'degrees';

  var h = Math.abs(Math.abs(0 - sw.latitude) - Math.abs(0 - ne.latitude));
  var w = Math.abs(Math.abs(0 - sw.longitude) - Math.abs(0 - ne.longitude));

  // diagonal using Pythagorean theorem
  var d = Math.sqrt(w * w + h * h);

  // convert to km or miles
  // http://wiki.apache.org/solr/SolrAdaptersForLuceneSpatial4#Units.2C_Conversion
  // Degrees to kilometers: degrees * 111.1951
  // Degrees to miles: degrees * 69.09341
  if (unit === 'kilometers') {
    w = w * KM;
    h = h * KM;
    d = d * KM;
  }
  else if (unit === 'miles') {
    w = w * MI;
    h = h * MI;
    d = d * MI;
  }

  return {
    unit: unit,
    width: w,
    height: h,
    diagonal: d
  };

};

// http://en.wikipedia.org/wiki/Centroid#Of_a_finite_set_of_points
// @param points {Array} - array of objects [ { latitude: 19.124, longitude: -91.123 } ]
var midpoint = function(points) {
  var x = 0;
  var y = 0;

  // sum the point vectors.
  points.forEach(function(pt) {
    x += Number(pt.latitude);
    y += Number(pt.longitude);
  });

  // calculate lat/lon and convert back to degrees
  return {
    latitude: x/points.length,
    longitude: y/points.length
  };
};

// Plugin for mixdown exposing the interfaces.
var GeoToolsPlugin = function(namespace) {

  if (!this instanceof GeoToolsPlugin) {
    throw new Error('Please instantiate using keyword "new."  Broadway expects this.');
  }

  namespace = namespace || 'geoTools';

  this.attach = function(options) {
    this[namespace] = {
      midpoint: midpoint,
      size: size
    };
  };
};

module.exports = {
  GeoToolsPlugin: GeoToolsPlugin,
  midpoint: midpoint,
  size: size  
};

