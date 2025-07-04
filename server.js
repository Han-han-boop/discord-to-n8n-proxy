const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bot is alive');
});

// Lancer le serveur HTTP pour Render
app.listen(PORT, () => {
  console.log(`Keep-alive webserver listening on port ${PORT}`);
});

// Discord client
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.on('ready', () => {
  console.log(`Bot connecté en tant que ${client.user.tag}`);
});

// Message handler
client.on('messageCreate', message => {
  if (!message.author.bot) {
    console.log("Message reçu :", message.content);
  }
});

// Connexion à Discord
client.login(process.env.DISCORD_TOKEN);
