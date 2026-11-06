'use strict';

const assert = require('assert');
const EventEmitter = require('events').EventEmitter;

const Bot = require('../services/bot');

describe('Bot', function () {
  it('should expose a constructor', function () {
    assert(Bot instanceof Function);
  });

  describe('start', function () {
    it('should start and stop smoothly', async function () {
      const bot = new Bot({ services: [], http: false, local: false, idlerpg: { persistent: false, autostart: false } });
      await bot.start();
      assert.ok(bot.doorman);
      assert.ok(bot.doorman.plugins.idlerpg);
      assert.ok(bot.game);
      assert.ok(bot.doorman.triggers.online);
      await bot.stop();
    });

    it('should emit a "ready" event', function (done) {
      const bot = new Bot({ services: [], http: false, local: false, idlerpg: { persistent: false, autostart: false } });
      bot.on('ready', async function () {
        await bot.stop();
        done();
      });
      bot.start();
    });

    it('feeds adapter presence into the game and reports it', async function () {
      const bot = new Bot({ services: [], http: false, local: false, idlerpg: { persistent: false, autostart: false, luck: 0 } });
      await bot.start();
      const adapter = new EventEmitter();
      adapter.connect = () => adapter.emit('ready');
      bot.doorman.enable('fake', adapter);
      adapter.emit('join', { user: 'alice', channel: 'idlerpg' });
      await new Promise((resolve) => setImmediate(resolve));
      await bot.game.tick();
      const report = await bot.report();
      assert.strictEqual(report.plugins.idlerpg.presentNow, 1);
      assert.strictEqual(report.plugins.idlerpg.totalTicks, 1);
      await bot.stop();
    });
  });
});
