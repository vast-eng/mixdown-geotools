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

  sw.latitude = Number(sw.latitude);
  sw.longitude = Number(sw.longitude);
  ne.latitude = Number(ne.latitude);
  ne.longitude = Number(ne.longitude);
  
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

// @param point {Object} - coordinates
// @param point.latitude {Number} - latitude
// @param point.longitude {Number} - longitude
// @param distance {Number} - distance from center to calculate rect
// @param unit {String} [optional] - possible values - "degrees", miles", "kilometers".  default is degrees
// returns { width: , height: , diagonal: }
var rect = function(point, distance, unit) {
  unit = unit || 'degrees';
  distance = Number(distance);
  point.latitude = Number(point.latitude);
  point.longitude = Number(point.longitude);

  // convert to km or miles
  // http://wiki.apache.org/solr/SolrAdaptersForLuceneSpatial4#Units.2C_Conversion
  // Degrees to kilometers: degrees * 111.1951
  // Degrees to miles: degrees * 69.09341
  if (unit === 'kilometers') {
    distance = distance/KM;
  }
  else if (unit === 'miles') {
    distance = distance/MI;
  }

  return {
    sw: {
      latitude: point.latitude - distance,
      longitude: point.longitude - distance
    },
    ne: {
      latitude: point.latitude + distance,
      longitude: point.longitude + distance
    },
    center: point
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

// Parses a lat/lon string
// @param pt {String} - lat,lon string ex: "29.01,-90.21"
var parsePoint = function(pt) {
  var ar = (pt || "").split(',');

  if (ar.length !== 2) {
    throw new Error('Invalid point string input. Must be in format "lat,lon"');
  }

  return {
    latitude: Number(ar[0]),
    longitude: Number(ar[1])
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
      size: size,
      rect: rect,
      parsePoint: parsePoint
    };
  };
};

module.exports = {
  GeoToolsPlugin: GeoToolsPlugin,
  midpoint: midpoint,
  size: size,
  rect: rect,
  parsePoint: parsePoint
};

