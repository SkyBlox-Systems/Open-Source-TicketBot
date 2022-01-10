const prefix = require("../schemas/TicketData");
const MainConfig = require('../../../index')

const getprefix = async (guildID) => {
  const result = await prefix.findOne({
    ServerID: guildID,
  });

  if (result) {
    return result.BotPrefix;
  } else if (!result) {
    return MainConfig.config.BotPrefix;
  }
};

module.exports = getprefix;