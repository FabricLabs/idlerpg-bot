# idlerpg-bot
[![Build Status](https://img.shields.io/travis/FabricLabs/idlerpg-bot.svg?branch=master&style=flat-square)](https://travis-ci.org/FabricLabs/idlerpg-bot)
[![Coverage Status](https://img.shields.io/coveralls/FabricLabs/idlerpg-bot.svg?style=flat-square)](https://coveralls.io/r/FabricLabs/idlerpg-bot)
[![Total Contributors](https://img.shields.io/github/contributors/FabricLabs/idlerpg-bot.svg?style=flat-square)](https://github.com/FabricLabs/idlerpg-bot/contributors)

Simple chatbot implementing IdleRPG, a self-playing game which rewards users for
inactivity.  This is the main bot code, which connects [`idlerpg`][idlerpg] with
[the `doorman` chatbot framework][doorman].

## Quick Start
Requires Node.js 24.15.0 (`.nvmrc`). Copy `settings/example.js` to
`settings/local.js` (gitignored) and change to suit your needs, then:

```bash
npm i          # .npmrc sets allow-git=all for the Fabric git pins
npm start      # scripts/bot.js → services/bot.js
npm test
```

`services` lists the Doorman adapters to enable — `matrix`, `discord`, `slack`,
or `fabric` — each configured under its own key. `http` is `false` by default;
set it to an object (for example `{ port: 4444 }`) to run Doorman's HTTP server.

### `idlerpg` options
- `path` — Fabric Store directory for game state (default `stores/idlerpg`)
- `channels` — allowlist of channel names/ids whose presence counts (empty = all)
- `interval` — tick interval in milliseconds (default: 10 minutes)
- `luck` — base encounter chance between 0 and 1 (default: 0.05)

### Local development against sibling checkouts
`npm run link:doorman` and `npm run link:idlerpg` point `node_modules` at
`../doorman` and `../idlerpg` (override with `FABRIC_DOORMAN` / `IDLERPG`).

### Layout
- `services/bot.js` — the bot: a Doorman host with `idlerpg/services/idlerpg` plugged in
- `scripts/bot.js` — process entry point
- `settings/example.js` — configuration template

## Support
If you need help, please [open an issue][issues].

[doorman]: https://github.com/FabricLabs/doorman
[idlerpg]: https://github.com/FabricLabs/idlerpg
[issues]: https://github.com/FabricLabs/idlerpg-bot/issues/new
