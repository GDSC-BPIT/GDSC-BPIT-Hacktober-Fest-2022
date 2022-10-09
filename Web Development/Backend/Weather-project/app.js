const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
})
app.post("/", function(req, res) {
console.log(req.body.cityName);
  const query = req.body.cityName;
  const apiKey = "f2dac360441714d87b368631ea0b939b";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&q=" + query + "&units=" + unit;
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp;
      const name= weatherData.name;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<p>Weather description : " + description + "<p>");
      res.write("<h1>Temperature in "+name +" is " + temp + "</h1>");
      res.write("<img src=" + imgUrl + ">");

      res.send();

    })
  })
})
app.listen(3100, function() {
  console.log("server working");
})
