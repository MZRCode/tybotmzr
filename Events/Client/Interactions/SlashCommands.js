const { ChatInputCommandInteraction, Client, EmbedBuilder, InteractionType } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction, client) {
        if(!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if(!command)
        return interaction.reply({
            content: "Bu Komutun Yenisi Çıktı",
            ephemeral: true
        });

        if(command.developer && interaction.user.id !== "SIZIN IDNIZ")
        return interaction.reply({
            content: "Bu komudu sadece Developer'lar kullanabilir!",
            ephemeral: true
        });

        const subCommand = interaction.options.getSubcommand(false);
        if(subCommand) {
            const subCommandFile = client.subCommands.get(`${interaction.commandName}.${subCommand}`);
            if(!subCommandFile) return interaction.reply({
                content: "Bu Komutun Yenisi Çıktı",
                ephemeral: true
            });
            subCommandFile.execute();
        } else command.execute();

        const { InteractionType } = require("discord.js");
      const Discord = require("discord.js");
      const db = require("croxydb")
      const fs = require("fs");
      const config = require("../../../config.json");
      
module.exports = async (client, interaction) => {
  if (!interaction.guild) return;
  if (interaction.user.bot) return;

  if (interaction.type === InteractionType.ApplicationCommand) {
    fs.readdir("./commands", (err, files) => {
      if (err) throw err;
      files.forEach(async (f) => {
        let props = require(`../commands/${f}`);
        if (interaction.commandName.toLowerCase() === props.name.toLowerCase()) {
          try {
            return props.run(client, interaction);
          } catch (e) {
            return interaction.reply({ content: `ERROR\n\n\`\`\`${e.message}\`\`\``, ephemeral: true }).catch(e => { })
          }
        }
      });
    });
  }

  if (interaction.type === InteractionType.MessageComponent) {
    if (interaction.customId === "aways") {
      let aways = config.aways || [];

      let data = db.get(`MZRty.${interaction.guild.id}.${interaction.user.id}`) || [];
      let embed = new EmbedBuilder()
        .setTitle(`${interaction.user.username} Kişisinin Ödül Listesi`)
        .setColor("Random")
        .setThumbnail(interaction.user.displayAvatarURL())
        .setTimestamp()
      for (let i = 0; i < aways.length; i++) {
        embed.addFields({ name: `${i + 1}. Ödül`, value: `<@&${aways[i].role}>\n${data.length >= aways[i].MZRty_size ? "✔️" : "❌ **| " + Number(aways[i].MZRty_size - data?.length) + " Kaldı**"}`, inline: true })
      }
      interaction.reply({ embeds: [embed], ephemeral: true })
    }
   }
  }
 }
}
