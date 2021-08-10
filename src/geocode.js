const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoicm9zaGFucmRhbmllbCIsImEiOiJja3J4Mjl0dXkwNHZwMnFtcm11eTB0aGF1In0.0fya83oh-txVjbH-cWmcGw";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to api", undefined);
    } else if (body.features.length === 0) {
      callback("cannot match your entry", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
