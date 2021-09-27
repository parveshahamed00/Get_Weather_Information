const express = require('express')
const bodyParser = require('body-parser')
const https = require("https")
const app = express()
const port = 3000
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/', (req, res) => res.sendFile(__dirname + "/index.html"))
app.post('/', function (req, res) {
    let city_name = req.body.city
    https.get("https://api.openweathermap.org/data/2.5/weather?q=" + city_name + "&appid=e254e72d1b2007525c7fc950da4ff4ad&units=metric", (respond) => {
        respond.on("data", (data) => {

            let weather = JSON.parse(data)
            const icon=weather.weather[0].icon
            const url = "http://openweathermap.org/img/wn/" +icon+"@2x.png"

            res.write("<h1>" + weather.main.temp + "</h1>")
            res.write("<img src=" + url + ">")

        })
    })
})

app.listen(process.env.PORT || port, () => console.log(`Example app listening on port port!`))