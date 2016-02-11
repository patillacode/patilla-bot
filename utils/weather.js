var weather = require('weather-js');

function getWeatherData(location, callback) {
    weather.find({
        search: location,
        degreeType: 'C'
    }, function(err, result) {
        if (err) {
            console.log("Error finding the weather: ", err);
        }
        else {
            var current = result[0]['current'];
            console.log("current: ", current);
            var weatherData = {
                'temperature': current['temperature'],
                'skytext': current['skytext'],
                'feelslike': current['feelslike'],
                'humidity': current['humidity']
            };
            callback(weatherData);
            // console.log("result", result);
            // console.log("weatherData", weatherData);
            // return {'status': true, 'data': weatherData};

            // var weatherMessages = [];
            // weatherMessages.push('It is fucking ' + weatherData['temperature'] + ' degrees, aight?');
            // if (weatherData['temperature'] !== weatherData['feelslike']) {
            //     weatherMessages.push('But it feels like ' + weatherData['feelslike'] + 'º god dammit!');
            // }
            // weatherMessages.push(weatherData['skytext'] + ' / ' + weatherData['humidity'] + '% humidity');
            // printWeather(result, bot, message, weatherMessages);
        }


    });
}

function getWeatherMessage(location, callback){
    console.log("location", location);
    getWeatherData(location, function(weatherData){
        console.log("weatherData: ", weatherData);
        var message = "";

        if(weatherData['status']){
            message = "Current weather in " + location + ":";
            message += weatherData['temperature'] + "º C";
            return message;
        }
        else{
            console.log("Error:", weatherData['data']);
            message = "There was a problem gathering weather data."
            callback(message);
        }
    });
}

exports.getWeatherMessage = getWeatherMessage;