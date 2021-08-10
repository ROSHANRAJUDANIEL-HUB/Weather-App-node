const express = require("express");
const path = require("path");
const hbs = require("hbs");
const request = require("request");

const filepath = path.join(__dirname, "../public");
const viewpath = path.join(__dirname, "../templates/views");
const partialpath = path.join(__dirname, "../templates/partials");

const geocode = require("./geocode");
const forecast = require("./forecast");

const app = express();

// heroku port

const port = process.env.PORT || 3000;

app.use(express.static(filepath));

app.set("view engine", "hbs");
app.set("views", viewpath);

hbs.registerPartials(partialpath);

app.get("/", (req, res) => {
  res.render("index", {
    title: "WEATHER APP",
    name: "index page",
    names: "Roshan",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "ABOUT ME",
    name: "About Page",
    names: "Roshan",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "HELP",
    name: "Help Page",
    names: "Roshan",
  });
});

//weather Endpoint

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send("you have to provide the address");
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastdata) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          address: req.query.address,
          Forecast: forecastdata,
          place: location,
        });
      });
    }
  );
});

// two endpoints for unknown routes

app.get("/help/*", (req, res) => {
  res.render("404-page", {
    title: "cannot Find Help Page",
    name: "Help Article Not Found",
    names: "Roshan",
  });
});

app.get("*", (req, res) => {
  res.render("404-page", {
    title: "Page Not Found",
    name: "error page",
    names: "Roshan",
  });
});

// starting up our server
app.listen(port, () => {
  console.log("server is listening to port", port);
});
