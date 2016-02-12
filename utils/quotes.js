var unirest = require('unirest');
var category_list = ['movies', 'famous'];

function checkCategory(category){
    if(category_list.indexOf(category) >= 0){
        return true;
    }
    return false
}

function getRandomQuote(category, callback){
    unirest.post("https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous")
    .header("X-Mashape-Key", config.mashape_key)
    .header("Content-Type", "application/x-www-form-urlencoded")
    .header("Accept", "application/json")
    .end(function (result) {
      // console.log(result.status);
      // console.log(result.headers);
      // console.log(result.body);
      console.log("Got quote...");
      var quote_data = JSON.parse(result.body);
      var message = "\"" + quote_data['quote'] + "\" - ";
      message += "*" + quote_data['author'] + "*";
      callback(message);
    });
}

function getQuotesErrorMessage(){
    var message = "available categories are:\n";
    for (var i = 0; i < category_list.length; i++) {
        message += "- `" + category_list[i] + "`\n";
    };
    message += "\nTry like this: `/quote movies`";
    return message;
}

// exports.category_list = category_list;
exports.checkCategory = checkCategory;
exports.getRandomQuote = getRandomQuote;
exports.getQuotesErrorMessage = getQuotesErrorMessage;