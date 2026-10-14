'use strict';

// Copy to settings/local.js (gitignored). Secrets belong in environment
// variables or this untracked file — never in git.
module.exports = {
  name: 'idlerpg',
  // Doorman adapters to enable: 'matrix', 'discord', 'slack', 'fabric'.
  services: ['matrix'],
  // Doorman HTTP server (set to an object such as { port: 4444 } to enable).
  http: false,
  matrix: {
    token: process.env.MATRIX_TOKEN || '',
    user: '@idlerpg:roleplaygateway.com',
    authority: 'https://chat.roleplaygateway.com'
  },
  discord: {
    token: process.env.DISCORD_BOT_TOKEN || ''
  },
  slack: {
    token: process.env.SLACK_TOKEN || ''
  },
  idlerpg: {
    path: 'stores/idlerpg',
    channels: ['idlerpg'], // only presence in these channels counts
    interval: 600000,
    luck: 0.05
  }
};
