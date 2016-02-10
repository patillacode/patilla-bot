var TelegramBot = require('node-telegram-bot-api');

var config = require('./config');

// Setup polling way
var bot = new TelegramBot(config.token, {polling: true});
bot.getMe().then(function (me) {
  console.log('Hi my name is %s!', me.username);
});

// Matches /start
bot.onText(/\/start/, function (msg, match) {
  var fromId = msg.from.id; // get the id, of who is sending the message
  var message = "Welcome! I am PatillaBot\n";
  bot.sendMessage(fromId, message);
});

// Matches /echo [whatever]
bot.onText(/\/echo (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  var resp = match[1];
  bot.sendMessage(fromId, resp);
});

// Matches /start
bot.onText(/\/kitten/, function (msg) {
  var chatId = msg.chat.id;
  // photo can be: a file path, a stream or a Telegram file_id
  var photo = 'img/kitty.jpg';
  bot.sendPhoto(chatId, photo, {caption: 'A cute kitten.'});
});

// Any kind of message
bot.on('message', function (msg, match) {
  var fromId = msg.from.id;
  var message = "I can't do much yet, here is a list of commands.\n"
  message += "/start\n"
  message += "/echo\n"
  message += "/kitten\n"
  bot.sendMessage(fromId, message);
});
