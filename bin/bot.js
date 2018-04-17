'use strict';

const config = require('../config');
const Bot = require('../lib/bot');

function main () {
  let bot = new Bot(config);
  bot.on('error', x => console.error(x));
  bot.start();
}

main();
