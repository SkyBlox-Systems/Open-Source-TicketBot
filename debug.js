const { config } = require('./index')
const prefixnum = 0
const tokennum = 0
const dashboardnum = 0
const ownernum = 0
const clientnum = 0



if (config.bot.prefix === '' || undefined) {
    console.warn('[SkyBlox Systems] - There is no prefix set. Bot will not run')
    prefixnums = prefixnum + 1
} else {
    console.log('[SkyBlox Systems] - Prefix Loaded')
    prefixnums = prefixnum + 0
}
setTimeout(() => {
    if (config.bot.token === '' || undefined) {
        console.warn('[SkyBlox Systems] - There is no bot token set. Bot will not run')
        tokennums = tokennum + 1 
    } else {
        console.log('[SkyBlox Systems] - Bot Token Loaded')
        tokennums = tokennum + 0
    }

    setTimeout(() => {
        if (config.bot.dashboardurl === '' || undefined) {
            console.warn('[SkyBlox Systems] - There is no dashboard url set. Bot will not run')
            dashboardnums = dashboardnum + 1
        } else {
            console.log(`[SkyBlox Systems] - Dashboard URL loaded at ${config.bot.dashboardurl}`)
            dashboardnums = dashboardnum + 0
        }

        setTimeout(() => {
            if (config.bot.ownerid === '' || undefined) {
                console.warn('[SkyBlox Systems] - There is no owner id set. Bot will not run')
                ownernums = ownernum + 1
            } else {
                console.log(`[SkyBlox Systems] - Owner ID loaded`)
                ownernums = ownernum + 0
            }

            setTimeout(() => {
                if (config.bot.botClientId === '' || undefined) {
                    console.warn('[SkyBlox Systems] - There is no Bot Client ID set. Bot will not run')
                    clientnums = clientnum + 1
                } else {
                    console.log(`[SkyBlox Systems] - Bot Client ID loaded`)
                    clientnums = clientnum + 0
                }

                setTimeout(() => {
                    errorlist = clientnums + ownernums + dashboardnums + tokennums + prefixnums
                    if (errorlist === 0) {
                        console.warn('[SkyBlox Systems] - No erros found')
                        
                    }  else {
                        console.warn(`[SkyBlox Systems] - There is ${errorlist} errors. Please go up the list to see what u need to add`)
                    }   
                }, 1000);

            }, 1000);

        }, 1000);

    }, 1000);

}, 1000);

