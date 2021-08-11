const request = require("request");

const forecast = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=299d5c0579093dd6b221ecf13e598d45&query=" +
    lat +
    "," +
    long;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("cannot get weather data", undefined);
    } else if (body.error) {
      callback("no match found", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ".currently it is: " +
          body.current.temperature +
          "  degrees" +
          ".it feels like " +
          body.current.feelslike +
          "  degrees out." +
          "The humidity is:" +
          body.current.humidity
      );
    }
  });
};

module.exports = forecast;
