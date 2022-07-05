module.exports = {
  Start: () => {
    console.log('[SkyBlox Systems] - Thank you for using SkyBlox Systems! The bot will run correctly if u have checked the debug.')

    setTimeout(() => {
      require('./Bot/src/index')
    }, 1000);
  },
  Debug: () => {
    console.log('[SkyBlox Systems] - Thank you for selecting the debug mode. We will run through checks of the bot to see everything is setup correctly!')
    require('./debug')
  },
  Dev: () => {
    console.log('[SkyBlox Systems] - Thank you for using SkyBlox Systems! Ticket bot has entered into developer mode.')
    setTimeout(() => {
      require('./Bot/src/index')

    }, 1000);
  },

  config: {
    bot: {
      prefix: '',
      token: '',
      dashboardurl: 'https://localhost',
      ownerid: '',
      botClientId: '',
    }
  },
}