module.exports = {
    Start: () => {
        console.log('Thank you for using SkyBlox Systems! The bot will run correctly if u have required your bot token.')

        setTimeout(() => {
            require('./Bot/src/index')
        }, 1000);
    },

    config: {
        bot: {
          prefix: '',
          token: '',
          dashboardurl: 'https://localhost'
        }
      },
}