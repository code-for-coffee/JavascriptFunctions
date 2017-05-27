function coordinate(lat, long) {
  let _lat = lat
  let _long = long
  return {
    latitude: {
      return _lat
    },
    longitude: {
      return _long
    },
    translate: function(dx, dy) { 
      return coordinate(_lat + dx, _long + dy)
    },
    toString: function () {
      return `${_lat_}, ${_long}`
    }
  };
}

// returns immutable data structure
const chicago = coordinate(41.8781, -87.6298)
chicago.toString();
// 42.3149° N, -83.0364
travelDestination = chicago.translate(0.4368, -4.5934);
