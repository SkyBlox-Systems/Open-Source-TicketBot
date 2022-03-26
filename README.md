# SkyBlox Systems Ticket Bot

SkyBlox Systems is the best Open Source Ticket bot out there. Not far behind with the current up to date private one. 

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install foobar.

```bash
npm i @skybloxsystems/ticket-bot
```
## Update

If you want to update the bot, please use the current version

```bash
npm i @skybloxsystems/ticket-bot@1.0.4
```

## Usage

```javascript
const Bot = require('@skybloxsystems/ticket-bot')

# Setup config settings
Bot.config.bot.prefix = ""
Bot.config.bot.token = ""
Bot.config.bot.dashboardurl = ""
Bot.config.Bot.botClientId = ""
Bot.config.bot.ownerid = ""

# Start the bot!
Bot.Start() or Bot.Dev()
```

## Contributingad
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)