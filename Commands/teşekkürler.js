const { ChatInputCommandInteraction, SlashCommandBuilder, Client, EmbedBuilder } = require("discord.js");
const db = require("croxydb");
const config = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
  .setName("teşekkürler")
  .setDescription("Bir Üyeye Teşekkür Etmenizi Sağlar")
  .setDMPermission(false)
  .addUserOption(options => options
      .setName("üye")
      .setDescription("Bir Üye Seç")
      .setRequired(true) 
      )
      .addStringOption(options => options
        .setName("sebep")
        .setDescription("Neden Teşekkür Ediyorsunuz?")
        .setRequired(true)
        ),
      /**
       * @param {Client} client
       * @param {ChatInputCommandInteraction} interaction 
       */
      async execute(interaction, client) {

    let aways = config.aways || [];

    let user = interaction.options.getUser('üye')
    let reason = interaction.options.getString('sebep')

    if (!user) return interaction.reply({ content: "Bir Üye Seçmelisin", ephemeral: true })
    if (!reason) return interaction.reply({ content: "Neden Teşekkür Ediyorsunuz?", ephemeral: true })

    if (user?.id === interaction.user.id) return interaction.reply({ content: "Kendine Teşekkür Edemezsin :D", ephemeral: true })

    if (user?.bot) return interaction.reply({ content: "Botlara Teşekkür Edemezsin :D", ephemeral: true })

    if (reason?.length > 100) return interaction.reply({ content: "Sebep; 100 Karakterden Fazla Olamaz :x:", ephemeral: true })

    let data = db.get(`MZRty.${interaction.guild.id}.${user.id}`) || [];
    let control = false
    await data.filter(x => x.user === interaction.user.id).forEach(async x => {
      if (Date.now() - x.date < 1000 * 60 * 60 * 6) {
        control = true
      }
    })
    if (control) return interaction.reply({ content: "6 Saate Bir Teşekkür Edebilirsiniz", ephemeral: true })


    data.push({
      user: interaction.user.id,
      reason: reason,
      channel: interaction.channel.id,
      date: Date.now()
    })
    db.set(`MZRty.${interaction.guild.id}.${user.id}`, data)

    interaction.reply({ content: `${user} Adlı Kullanıcıya Teşekkür Edildi :) Seninle Birlikte **${data.length}** Kişi Teşekkür Etmiş Oldu 🎉` })

    const log = client.channels.cache.get(config.log)
    if (!log) return;

    for (let i = 0; i < aways.length; i++) {
      awardControl(user, interaction.guild, aways[i].MZRty_size, aways[i].role)
    }

    const embed = new EmbedBuilder()
    .setThumbnail(user.displayAvatarURL({ dynamic: true }))
    .setDescription(`**Teşekkür Eden Güzel Arkadaş:** ${interaction.user}
    **Teşekkür Edilen İyi Kalpli Arkadaş:** ${user}
    **Teşekkür Edenin Dip Notu: \`${reason}\`**
    **Teşekkürü Bu Kanalda Etti:** <#${interaction.channel.id}>
    ${user} **Arkadaşımız Toplam: \`${data.length}\` Teşekkür Sayısına Ulaştı :tada:**`)
    .setTimestamp()
    .setColor("Random")
    .setFooter({
      text: `MZR Development `,
      iconURL:
      "https://cdn.discordapp.com/emojis/899716842346655784.gif",
    });
    log.send({ embeds: [embed], content: `${user} **Biri Sana Teşekkür Etti :tada:**` }).then(msg => {
      msg.react("🎉")
    })
  },
};

function awardControl(user, guild, MZRty_size, role) {
  let data = db.get(`MZRty.${guild.id}.${user.id}`) || [];
  if (data.length >= MZRty_size) {
    let role = guild.roles.cache.get(role)
    if (!role) return;
    if (user.roles.cache.has(role.id)) return;
    user.roles.add(role).cacth(e => { })
  }
}