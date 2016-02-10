var commands = {};
commands["/help"] = "Returns the list of available commands.";
commands["/start"] = "Returns a welcome message.";
commands["/kitten"] = "Returns a random kitten picture.";

function getHelpMessage(){
    var message = "This is the list of available commands:\n\n";
    for(var key in commands){
        message += key+": "+commands[key]+"\n";
    }

    message += "\nIf you want more features, have suggestions or whatever,\n";
    message += "please create an issue in the [official github repo](https://github.com/patillacode/patilla-bot)\n\n";

    return message;
}

exports.getHelpMessage = getHelpMessage;

// weather
// timezones
// latest news (filtered?)
// random quote
// random gif -> giphy?
// random pic
// twitter - last 5 tweets of a user
// youtube - latest videos of a user - search - ?
