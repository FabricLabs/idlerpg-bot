'use strict';

const fs = require('fs');
const util = require('util');
const level = require('level');
const events = require('events');

const PER_TICK_CAPITAL = 10;

function IdleRPGPlugin (config) {
  let root = config.root || './data';
  if (!fs.existsSync(root)) fs.mkdirSync(root);
  this.db = level(root + '/idlerpg');
  this.users = {};
  this.start();
  return this;
}

util.inherits(IdleRPGPlugin, events);

IdleRPGPlugin.prototype.tick = function () {
  Object.keys(this.users).forEach(user => {
    console.log('iterating user:', user);
    user.wealth = (user.wealth || 0) + PER_TICK_CAPITAL;
  });

  console.log('user map:', this.users);
};

IdleRPGPlugin.prototype.subscribe = function (channel) {
  if (!this.fabric) return new Error('No Fabric instance supplied.  Failing.');
  this.fabric.on(channel, this.router.apply(this));
};

IdleRPGPlugin.prototype.trust = function (fabric) {
  this.fabric = fabric;
};

IdleRPGPlugin.prototype.start = function () {
  let rpg = this;

  if (rpg.fabric && !rpg.stream) {
    rpg.stream = rpg.subscribe('/'); // subscribe to all Fabric events
  }

  rpg.on('user', function (user) {
    console.log('new user received:', user);
    // TODO: verify!
    this.users[user.id] = user;
  });

  rpg.timer = setInterval(function () {
    console.log(`${new Date()}: 10 minutes has passed.  Beginning tick...`);
    rpg.tick();
  //}, 600000);
  }, 10000);
};

module.exports = IdleRPGPlugin;
