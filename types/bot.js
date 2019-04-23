'use strict';

// Reliable libraries
const Event = require('events');

// Fabric Core
const Fabric = require('@fabric/core');

// custom types
const IdleRPG = require('idlerpg');
const Doorman = require('doorman');

/**
 * The process which will manage our {@link Bot}.
 * @type {Object}
 */
class Bot extends Event.EventEmitter {
  /**
   * The IdleRPG bot.
   * @param       {Object} [config] Initialization vector.
   * @constructor
   */
  constructor (config = {}) {
    super(config);
    this.config = Object.assign({}, config);
    this.doorman = new Doorman(this.config);
    this.fabric = new Fabric();
  }

  /**
   * Handle a {@link Log} event.
   * @return {Bot}     Instance of {@link Bot} after event.
   */
  log (...msg) {
    this.emit('info', {
      name: this.name,
      params: [...msg]
    });
    return this;
  }

  /**
   * Stop the bot.
   * @return {Doorman} Instance of the stopped bot.
   */
  async stop () {
    return this.doorman.stop();
  }

  /**
   * Begin the bot's main loop.
   * @return {Doorman} Instance of the started bot.
   */
  async start () {
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
  }
}

module.exports = Bot;
