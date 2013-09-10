var KM = 111.1951;
var MI = 69.09341;

// http://en.wikipedia.org/wiki/Centroid#Of_a_finite_set_of_points
// @param points {Array} - array of objects [ { latitude: 19.124, longitude: -91.123 } ]


// @param sw {Object} - coordinates
// @param sw.latitude {Number} - latitude
// @param sw.longitude {Number} - longitude
// @param ne {Object} - coordinates
// @param ne.latitude {Number} - latitude
// @param ne.longitude {Number} - longitude
// @param unit {String} [optional] - possible values - "degrees", miles", "kilometers".  default is degrees
// returns { width: , height: , diagonal: }
module.exports.size = function(sw, ne, unit) {
  unit = unit || 'degrees';

  var w = Math.abs(Math.abs(0 - sw.latitude) - Math.abs(0 - ne.latitude));
  var h = Math.abs(Math.abs(0 - sw.longitude) - Math.abs(0 - ne.longitude));

  // convert to km or miles
  // http://wiki.apache.org/solr/SolrAdaptersForLuceneSpatial4#Units.2C_Conversion
  // Degrees to kilometers: degrees * 111.1951
  // Degrees to miles: degrees * 69.09341
  if (unit === 'kilometers') {
    w = w * KM;
    h = h * KM;
  }
  else if (unit === 'miles') {
    w = w * MI;
    h = h * MI;
  }

  // diagonal using Pythagorean theorem
  var d = Math.sqrt(w * w + h * h);

  return {
    unit: unit,
    width: w,
    height: h,
    diagonal: d
  };

};

