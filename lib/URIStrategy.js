/**
 * Pieter Colpaert © Ghent University - iMinds 
 * Combines connection rules, trips and services to an unsorted stream of connections
 */
var moment = require('moment-timezone');

var URIStrategy = function (baseUris) {
  var defaultBaseUris = {
    stops : 'http://lod.opentransportdata.swiss/lc/stops/',
    connections : 'http://lod.opentransportdata.swiss/lc/connections/',
    trips : 'http://lod.opentransportdata.swiss/lc/trips/',
    routes : 'http://lod.opentransportdata.swiss/lc/routes/'
  };
  if (!baseUris) {
    baseUris = defaultBaseUris;
  } else {
    if (typeof baseUris.stops !== 'string') {
      baseUris.stops = defaultBaseUris.stops;
    }
    if (typeof baseUris.trips !== 'string') {
      baseUris.trips = defaultBaseUris.trips;
    }
    if (typeof baseUris.routes !== 'string') {
      baseUris.routes = defaultBaseUris.routes;
    }
    if (typeof baseUris.connections !== 'string') {
      baseUris.connections = defaultBaseUris.connections;
    }
  }
  this._baseUris = baseUris;
  
};

/**
 * Returns a persistent identifier for a connection
 */
URIStrategy.prototype.getId = function (connection) {
  return this._baseUris.connections + encodeURIComponent(connection.departureTime + connection.departureStop + connection.trip);
};

URIStrategy.prototype.getStopId = function (id) {
  return this._baseUris.stops + encodeURIComponent(id);
};

URIStrategy.prototype.getTripId = function (connection) {
  return this._baseUris.trips + encodeURIComponent(connection.trip);
}

URIStrategy.prototype.getRouteId = function (connection) {
  return this._baseUris.routes + encodeURIComponent(connection.route);
}

module.exports = URIStrategy;
