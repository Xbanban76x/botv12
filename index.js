const Discord = require("discord.js");

const Client = new Discord.Client;

Client.on("ready", () => {
    console.log("Je suis prêt a faire mon boulot")
})

//-----message de bienvenue------

bot.on("guildMemberAdd", async member => {
    
    let bienvenue = bot.guilds.cache.get("824790989092552714").channels.cache.get("824993605814583306")   
    member.roles.add("825163714231140433")
  
    let embed = new Discord.MessageEmbed()
    .setDescription(`Salut à toi ${member}`)
    .setColor("#f7f7f7")
    bienvenue.send(embed)
})

//----Système de ticket----

Client.on("message", message => {
    if(message.content.startsWith(prefix + "ticket")){
        message.channel.bulkDelete(1)
        if(message.channel.parentID == "825496596179451934"){
            message.guild.channels.create('ticket ${message.member.displayName}', {type: 'text'}).then(channel => {
                let category = message.guild.channels.cache.get("825496596179451934", c => c.type == "category")
                channel.setParent(category) 
                let everyone = message.guild.roles.cache.get("824790989092552714")
                let role1 = message.guild.roles.cache.get("825166655796543509")
                let role2 = message.guild.roles.cache.get("825166690295611432")

                channel.uptadeOverwrite(message.author, {
                    SEND_MESSAGE: true,
                    VIEW_CHANNEL: true
                })

                channel.uptadeOverwrite(everyone, {
                    SEND_MESSAGES: false,
                    VIEW_CHANNEL: false
                })

                channel.uptadeOverwrite(role1, {
                    SEND_MESSAGES: true,
                    VIEW_CHANNEL: true
                })
                channel.uptadeOverwrite(role2, {
                    SEND_MESSAGES: true,
                    VIEW_CHANNEL: true


                }).then(channel => {
                    var embed = new Discord.MessageEmbed()
                    .setTitle('Ticket de ${message.member.displayName}')
                    .setDescription("Vous pouvez désormais posez votre question , un membre vous répondra au plus vite")
                    .setColor("#f7f7f7") 
                    setTimesamp();
                    channel_ticket.send(embed)    
                })

                
            })
        } else {
            message.reply("Vous n'ètes pas dans la bonne catégorie ! Merci d'aller dans le salon #création-ticket")
            setTimeout(function() {
                message.channel.bulkDelete(1)
            }, 15 * 300)
        }
    } else {
        if(message.author.bot) return;
        if(!message.channel.parentID == "825166690295611432") return;
        if(message.channel.parentID == "825166690295611432"){
           message.channel.bulkDelete(1).then(message.reply("Vous devez envoyer la commande ci dessus !"))
           setTimeout(function() {
               message.channel.bulkDelete(1)
           }, 15 * 300)
        }
    }
});

Client.on("message", async message => {
    if(message.content.startsWith(prefix + "close")){
        if(message.channel.parenID == "825496596179451934"){
        message.channel.send("Fermeture du ticket en cours, le ticket sera fermé dans 15 secondes !")
        message.guild.channels.cache.get(message.channel.id).setName("ticket fermé")
        setTimeout(function() {
            message.guild.channels.cache.get(message.channel.id).setParent("825517408013516881")
        }, 10 *300)
        setTimeout(function() {
            message.channel.delete()
        }, 30 * 300)
    } else {
        message.channel.bulkDelete(1)
        message.reply("Vous n'êtes pas dans la bonne catégorie ! Merci d'aller dans votre ticket.*Si vous n'avez pas de ticket aller dans #création-ticket")
    setTimeout(function() {
        message.channel.bulkDelete(1)
    }, 15 * 300)
    }
    } 
})
