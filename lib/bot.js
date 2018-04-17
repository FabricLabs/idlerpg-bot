'use strict';

const util = require('util');

const IdleRPG = require('idlerpg');
const Doorman = require('doorman');

function Bot (config) {
  this.config = config;
  this.doorman = new Doorman(config);
}

util.inherits(Bot, require('events').EventEmitter);

Bot.prototype.start = function () {
  console.log('[IDLERPGBOT]', 'starting...');
  this.doorman.use(IdleRPG);
  this.doorman.start();
};

module.exports = Bot;
