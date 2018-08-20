# idlerpg-bot
[![Build Status](https://img.shields.io/travis/FabricLabs/idlerpg-bot.svg?branch=master&style=flat-square)](https://travis-ci.org/FabricLabs/idlerpg-bot)
[![Coverage Status](https://img.shields.io/coveralls/FabricLabs/idlerpg-bot.svg?style=flat-square)](https://coveralls.io/r/FabricLabs/idlerpg-bot)
[![Total Contributors](https://img.shields.io/github/contributors/FabricLabs/idlerpg-bot.svg?style=flat-square)](https://github.com/FabricLabs/idlerpg-bot/contributors)

Simple chatbot implementing IdleRPG, a self-playing game which rewards users for
inactivity.  This is the main bot code, which connects [`idlerpg`][idlerpg] with
[the `doorman` chatbot framework][doorman].

## Quick Start
Copy `config.json.sample` to `config.json` and change to suit your needs.

Configuration values include `services`, which can be configured to support any
Doorman service — as of this writing, this includes `slack`, `matrix`, and
`discord`.

### Options
- `interval` specifies the "tick" interval in milliseconds (default: 60 seconds)
- `luck` specifies the base encounter chance between 0 and 1 (default: 0.05)

## Support
If you need help, please [open an issue][issues].

[doorman]: https://github.com/FabricLabs/doorman
[idlerpg]: https://github.com/FabricLabs/idlerpg
[issues]: https://github.com/FabricLabs/idlerpg-bot/issues/new
