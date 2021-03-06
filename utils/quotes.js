var unirest = require('unirest');
var category_list = ['movies', 'famous'];

function checkCategory(category){
    if(category_list.indexOf(category) >= 0){
        return true;
    }
    return false
}

function getQuotesErrorMessage(){
    var message = "available categories are:\n";
    for (var i = 0; i < category_list.length; i++) {
        message += "- `" + category_list[i] + "`\n";
    };
    message += "\nTry like this: `/quote movies`";
    return message;
}

function getRandomQuote(category, callback){

    if(checkCategory(category) == true){
        unirest.post("https://andruxnet-random-famous-quotes.p.mashape.com/?cat="+category)
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
    else{
        var message = "Category `" + category + "` is not supported, " + quotes.getQuotesErrorMessage();
        callback(message);
    }

}


exports.getRandomQuote = getRandomQuote;
exports.getQuotesErrorMessage = getQuotesErrorMessage;