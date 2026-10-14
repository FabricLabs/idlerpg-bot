'use strict';

const Service = require('@fabric/core/types/service');
const Doorman = require('@fabric/doorman');
const IdleRPG = require('idlerpg/services/idlerpg');

/**
 * The IdleRPG bot: a Doorman host with the IdleRPG service plugged in.
 * Chat platforms come from Doorman's adapters (`settings.services`); the game
 * engine persists under `settings.idlerpg.path`.
 */
class Bot extends Service {
  /**
   * @param {Object} [settings]
   * @param {Array<string>} [settings.services=[]] Doorman adapters to enable (`matrix`, `discord`, `slack`, `fabric`).
   * @param {Object|boolean} [settings.http=false] Doorman HTTP server settings, or `false`.
   * @param {Object} [settings.idlerpg] IdleRPG engine settings (`path`, `interval`, `luck`, `channels`).
   */
  constructor (settings = {}) {
    super(Object.assign({ networking: false, persistent: false }, settings));

    this.settings = Object.assign({
      name: 'idlerpg-bot',
      services: [],
      http: false,
      idlerpg: {}
    }, this.settings, settings);

    this.settings.idlerpg = Object.assign({
      path: 'stores/idlerpg'
    }, this.settings.idlerpg);

    this.doorman = new Doorman(Object.assign({}, this.settings, { name: '@fabric/doorman' }));
    this.doorman.on('error', (error) => this.emit('error', error));
    this.doorman.on('patch', (patch) => this.emit('patch', patch));

    return this;
  }

  get game () {
    return this.doorman.plugins.idlerpg || null;
  }

  async report () {
    return this.doorman.report();
  }

  async start () {
    this.emit('log', '[IDLERPGBOT] starting...');
    this.doorman.use(IdleRPG, this.settings.idlerpg);
    await this.doorman.start();
    this.emit('ready');
    return this;
  }

  async stop () {
    await this.doorman.stop();
    return this;
  }
}

module.exports = Bot;
