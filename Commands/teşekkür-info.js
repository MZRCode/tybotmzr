const { ChatInputCommandInteraction, SlashCommandBuilder, Client, EmbedBuilder } = require("discord.js");
const db = require("croxydb");
const config = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
  .setName("teşekkür-bilgi")
  .setDescription("Teşekkürler Hakkında Bilgi Verir")
  .setDMPermission(false)
  .addUserOption(options => options
      .setName("üye")
      .setDescription("Bir Üye Seçiniz")
      .setRequired(true)
      ),
      /**
       * @param {Client} client
       * @param {ChatInputCommandInteraction} interaction 
       */
      async execute(interaction, client) {

    let aways = config.aways || [];

    let user = interaction.options.getUser('üye') || interaction.user;

    let data = db.get(`MZRty.${interaction.guild.id}.${user.id}`) || [];

    let Embed = new EmbedBuilder()
    .setTitle(`${user.username} Kişisinin Ödül Listesi`)
    .setDescription(`${user} **Kişisinin Toplam Teşekkür Sayısı: \`${data?.length}\`**`)
    .setColor("Random")
    .setThumbnail(user.displayAvatarURL())
    .setTimestamp()
    for (let i = 0; i < aways.length; i++) {
      Embed.addFields({ name: `${i + 1}. Ödül`, value: `<@&${aways[i].role}>\n${data.length >= aways[i].MZRty_size ? "✔️" : "❌ **| " + Number(aways[i].MZRty_size - data?.length) + " Kaldı**"}`, inline: true })
    }
    interaction.reply({ embeds: [Embed] })

  },
};