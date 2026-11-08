'use strict';

const fs = require('fs');
const path = require('path');
const Bot = require('../services/bot');

function loadSettings () {
  const local = path.resolve(__dirname, '../settings/local.js');
  if (fs.existsSync(local)) return require(local);
  const legacy = path.resolve(__dirname, '../config.json');
  if (fs.existsSync(legacy)) return require(legacy);
  console.warn('[IDLERPGBOT]', 'no settings/local.js found; copy settings/example.js to get started');
  return {};
}

async function main (settings) {
  const bot = new Bot(settings);
  bot.on('error', (error) => console.error('[IDLERPGBOT]', error));
  bot.on('log', (message) => console.log(message));
  await bot.start();
  console.log('[IDLERPGBOT]', 'started with services:', Object.keys(bot.doorman.services));
  return bot;
}

main(loadSettings()).catch((error) => {
  console.error('[IDLERPGBOT]', 'fatal:', error);
  process.exit(1);
});
