var weather = require('weather-js');
var emoji = require('node-emoji').emoji;

var icons = {
             "Clear": emoji.sunny,
             "Mostly Clear": emoji.sunny,
             "Sunny": emoji.sunny,
             "Mostly Sunny": emoji.partly_sunny,
             "Partly Sunny": emoji.partly_sunny,
             "Partly Cloudy": emoji.partly_sunny,
             "Mostly Cloudy": emoji.cloud,
             "Cloudy": emoji.cloud,
             "Light Rain": emoji.umbrella,
             "Rain Showers": emoji.umbrella,
             "Rain": emoji.umbrella,
             "Storm": emoji.thunder_cloud_rain,
             "Snow": emoji.snowflake
            }

function getWeatherData(location, callback) {
    weather.find({
        search: location,
        degreeType: 'C'
    }, function(err, result) {

        var weatherData;

        if (err) {
            callback(err, false);
        }
        else {
            var current = result[0]['current'];
            weatherData = {
                'temperature': current['temperature'],
                'skytext': current['skytext'],
                'feelslike': current['feelslike'],
                'humidity': current['humidity']
            };
            console.log("Got weather data...");
            callback(weatherData, true);
        }
    });
}

function getWeatherMessage(location, callback){
    getWeatherData(location, function(weatherData, status){
        var message = "";

        if(status == true){
            message = "Current weather in " + location + ": \n\n";
            message += "Temperature is * " + weatherData['temperature'] + "ºC *";
            if (weatherData['temperature'] !== weatherData['feelslike']) {
                message += ', but it feels like *' + weatherData['feelslike'] + 'ºC *';
            }
            message += "\n*" + weatherData['skytext'] + "* " + icons[weatherData['skytext']] + ' with *' + weatherData['humidity'] + '%* humidity.\n';
        }
        else{
            console.log("Error:", weatherData);
            message = "There was a problem accessing weather data. Please try again later."
        }
        callback(message);
    });
}

exports.getWeatherMessage = getWeatherMessage;