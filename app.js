const express = require("express");

const https = require ("https");    

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function(req, res){

res.sendFile(__dirname + "/index.html");

        });
        app.post("/", function(req,res){
const query = req.body.cityName;  
           const url = "https://pro.openweathermap.org/data/2.5/forecast/hourly?q=noida&appid=ab992ae63a9d2a794fb8e278e3d9bae4&units = metric"
    https.get(url, function(response){

        response.on("data", function(data){
           const weatherData = JSON.parse(data);

           const temperature = weatherData.main.temp


           const weatherDescription = weatherData.weather[0].description
    const icon = weatherData.weather[0].icon
    const imageUrl =" https://openweathermap.org/img/wn/ " + icon + "10d@2x.png" 

          res.write("<p> The current weather is " + weatherDescription + "</p>")
          res.write("<h1> The temperature of city is" + temperature + "degree celcius</h1>");

        res.write("<img src = " + imageUrl + ">");
         res.send();
        })  
    })
})
app.listen(7000, function(){
    console.log("server is running on port 7000");
})