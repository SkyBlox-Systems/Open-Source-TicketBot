module.exports = {
    Start: () => {
        console.log('Thank you for using SkyBlox Systems! The bot will run correctly if u have required your bot token.')

        setTimeout(() => {
            require('./Bot/src/index')
        }, 1000);
    },
    Debug: () => {
      console.log('Thank you for selecting the debug mode. We will run through checks of the bot to see everything is setup correctly!')
    },
    Dev: () => {
      console.log('Thank you for using SkyBlox Systems! Ticket bot has entered into developer mode.')
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
          botClientId: '0000000',


        }
      },
}