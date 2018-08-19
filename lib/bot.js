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
  this.config = config;
  this.doorman = new Doorman(config);
}

util.inherits(Bot, require('events').EventEmitter);

/**
 * Begin the bot's main loop.
 * @return {Doorman} Instance of the started bot.
 */
Bot.prototype.start = function () {
  console.log('[IDLERPGBOT]', 'starting...');
  this.doorman.use(IdleRPG);

  if (this.config.debug) {
    this.doorman.plugins.idlerpg.on('patches', patches => {
      console.log('[IDLERPGBOT]', 'plugin patches:', patches);
    });
  }

  return this.doorman.start();
};

module.exports = Bot;
