'use strict';

const util = require('util');

const IdleRPG = require('idlerpg');
const Doorman = require('doorman');

/**
 * The IdleRPG bot.
 * @param       {Object} [config] Initialization vector.
 * @constructor
 */
function Bot (config) {
  this.config = Object.assign({}, config);
  this.doorman = new Doorman(this.config);
}

// TODO: inherit from Fabric.Vector
util.inherits(Bot, require('events').EventEmitter);

/**
 * Begin the bot's main loop.
 * @return {Doorman} Instance of the started bot.
 */
Bot.prototype.start = async function () {
  let bot = this;

  bot.log('[IDLERPGBOT]', 'starting...');
  bot.doorman.use(IdleRPG);

  if (this.config.debug) {
    bot.doorman.on('patches', patches => {
      bot.log('[IDLERPGBOT]', 'plugin patches:', patches);
      bot.emit('patches', patches);
    });
  }

  return bot.doorman.start();
};

/**
 * Stop the bot.
 * @return {Doorman} Instance of the stopped bot.
 */
Bot.prototype.stop = async function () {
  return this.doorman.stop();
};

// TODO: remove this class in favor of inheriting from Fabric.Vector
Bot.prototype.log = function report (...msg) {
  this.emit('info', {
    name: this.name,
    params: [...msg]
  });

  return this;
};

module.exports = Bot;
