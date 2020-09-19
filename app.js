
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
// let ejs = require('ejs');

const app = express();


app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

var loc;
var des;
var status;
var tem;
var ab;
var bc;
var cd;
var de;
var ef;
var fg;


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");

});

app.get("/weather",function(req,res){
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+loc+"&appid=9e1e6fc49349113053ec31cf6dc217ae&units=metric";
    https.get(url,function(response){
       
        status=response.statusCode;
        console.log(status);
        response.on("data",function(data){
            // console.log(data);
        const weatherData = JSON.parse(data);
        console.log(weatherData);

        if(status === 200)
        {
            des=weatherData.weather[0].description;
            tem=weatherData.main.temp;
            ab=weatherData.main.feels_like
            bc=weatherData.main.temp_min;
            cd=weatherData.main.temp_max;
            de=weatherData.main.pressure;
            ef=weatherData.main.humidity;
            fg=weatherData.wind.speed;

        }
        
        

        
        });
    });
    
    if(status===200)
    {
        res.render("weather",{sta:des ,abc:status , temp:tem , na:loc , feel:ab,min:bc,max:cd,press:de,humid:ef,spe:fg});
    }

    if(status === 404)
    {
        res.render("weather1",{na:loc })
    }
    

});

app.post("/",function(req,res){
    loc = req.body.loc;
    console.log(loc);
    res.redirect("/weather");
})

app.use(express.static("public"));





app.listen(3000);

