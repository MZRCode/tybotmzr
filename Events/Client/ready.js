const { loadCommands } = require("../../Handlers/commandHandler");
const { Client, ActivityType } = require("discord.js");

module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log("Client Hazır");
        client.user.setActivity({
            name: `/yardım`,
            type: ActivityType.Streaming,
            url: "https://www.twitch.tv/mzrdev"
        });

        loadCommands(client);
    }
}