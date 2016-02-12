var TelegramBot = require('node-telegram-bot-api');
var config = require('./config');
var commands = require(config.commands_path);
var kittens = require(config.kittens_path);
var weather = require(config.weather_path);
var quotes = require(config.quotes_path);

// Setup polling way
var bot = new TelegramBot(config.telegram_token, {polling: true});

bot.getMe().then(function (me) {
    console.log('%s has started', me.username);
});

// Matches /help
bot.onText(/\/help/, function (msg, match) {
    console.log(new Date() + " - /help command executed");
    var fromId = msg.from.id; // get the id, of who is sending the message
    var message = commands.getHelpMessage();
    bot.sendMessage(fromId,
                    message,
                    {
                        parse_mode: "Markdown",
                        disable_web_page_preview: true
                    });
});

// Matches /start
bot.onText(/\/start/, function (msg, match) {
    console.log(new Date() + " - /start command executed");
    var fromId = msg.from.id; // get the id, of who is sending the message
    var message = commands.getStartMessage();
    bot.sendMessage(fromId,
                    message,
                    {
                        parse_mode: "Markdown",
                        disable_web_page_preview: true
                    });
});

// Matches /kitten
bot.onText(/\/kitten/, function (msg) {
    console.log(new Date() + " - /kitten command executed");
    var chatId = msg.chat.id;
    // photo can be: a file path, a stream or a Telegram file_id
    var photo = kittens.getKittenImagePath();
    bot.sendPhoto(chatId, photo, {caption: 'A cute kitten.'});
});

// Matches /weather city
bot.onText(/\/weather (.+)/, function (msg, match) {
    var fromId = msg.from.id; // get the id, of who is sending the message
    weather.getWeatherMessage(match[1], function(message){
        bot.sendMessage(fromId,
                        message,
                        {
                            parse_mode: "Markdown",
                            disable_web_page_preview: true
                        });
    });
});

// Matches /weather ($ simbolizes end of line)
bot.onText(/\/weather$/, function (msg, match) {
    console.log(new Date() + " - /weather command executed");
    var fromId = msg.from.id; // get the id, of who is sending the message
    var message = "Please write the city you want to get the weather info for:\n";
    message += "Like this `/weather city`";
    bot.sendMessage(fromId,
                    message,
                    {
                        parse_mode: "Markdown",
                        disable_web_page_preview: true
                    });
});

// Matches /quote category
bot.onText(/\/quote (.+)/, function (msg, match) {
    console.log(new Date() + " - /quote command executed");
    var fromId = msg.from.id; // get the id, of who is sending the message
    var category = match[1];
    quotes.getRandomQuote(category, function(message){
        bot.sendMessage(fromId,
                        message,
                        {
                            parse_mode: "Markdown",
                            disable_web_page_preview: true
                        });
    });
});

// Matches /quote ($ simbolizes end of line)
bot.onText(/\/quote$/, function (msg, match) {
    console.log(new Date() + " - /quote command executed");
    var fromId = msg.from.id; // get the id, of who is sending the message
    var message = "Please write the category, " + quotes.getQuotesErrorMessage();
    bot.sendMessage(fromId,
                    message,
                    {
                        parse_mode: "Markdown",
                        disable_web_page_preview: true
                    });
});

// // Matches /echo [whatever]
// bot.onText(/\/echo (.+)/, function (msg, match) {
//     var fromId = msg.from.id;
//     var resp = match[1];
//     bot.sendMessage(fromId, resp);
// });

// Any kind of message
// bot.on('message', function (msg, match) {
//     var fromId = msg.from.id;
//     var message = "I can't do much yet, here is a list of commands.\n"
//     message += "/start\n"
//     message += "/echo\n"
//     message += "/kitten\n"
//     bot.sendMessage(fromId, message);
// });
