var TelegramBot = require('node-telegram-bot-api');
var config = require('./config');
var commands = require(config.commands_path);
var kittens = require(config.kittens_path);

// Setup polling way
var bot = new TelegramBot(config.token, {polling: true});

bot.getMe().then(function (me) {
    console.log('%s has started', me.username);
});

// Matches /help
bot.onText(/\/help/, function (msg, match) {
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
    var fromId = msg.from.id; // get the id, of who is sending the message
    var message = "Welcome! I am PatillaBot\n";
    bot.sendMessage(fromId, message);
});

// Matches /start
bot.onText(/\/kitten/, function (msg) {
    var chatId = msg.chat.id;
    // photo can be: a file path, a stream or a Telegram file_id
    var photo = kittens.getKittenImagePath();
    bot.sendPhoto(chatId, photo, {caption: 'A cute kitten.'});
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
