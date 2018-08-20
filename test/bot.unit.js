const assert = require('assert');
const expect = require('chai').expect;

const Bot = require('../lib/bot');

describe('Bot', function () {
  it('should expose a constructor', function () {
    assert(Bot instanceof Function);
  });

  describe('start', function () {
    it('should start and stop smoothly', async function () {
      let bot = new Bot();

      async function body () {
        assert.ok(bot.doorman);
        assert.ok(bot.doorman.plugins.idlerpg);
        await bot.stop();
      }

      await bot.start();
      await body();
    });
  });
});
