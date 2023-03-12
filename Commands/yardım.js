const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, Client } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("yardım")
      .setDescription("Bot Komutları Hakkınd Bilgi Verir")
      .setDMPermission(false),
    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
          const Embed = new EmbedBuilder()
            .setColor("Random")
            .setTitle(`Komutlarım`)
            .setThumbnail("https://cdn.discordapp.com/emojis/1084507617705066627.gif")
            .addFields(
              {
                name: `/teşekkürler [üye] [sebep]`,
                value: `Bu komudu kullanarak istediğiniz üyelere Teşekkür edebilirsiniz\n`,
              },
              {
                name: `/teşekkürler-bilgi [üye]`,
                value: `Bu komudu kullanarak istediğiniz üyenin Teşekkür Bilgilerini görüntüleye bilirsiniz`,
              }
            )
            .setFooter({
              text: `MZR Development `,
              iconURL:
              "https://cdn.discordapp.com/emojis/899716842346655784.gif",
            });
          interaction.reply({ embeds: [Embed], content: `${interaction.user} **Al Yardım Komutlarım**` });
    },  
};
  