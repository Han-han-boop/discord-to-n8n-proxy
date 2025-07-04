import { Client, GatewayIntentBits } from 'discord.js';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

const TOKEN = process.env.DISCORD_TOKEN;
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

client.on('ready', () => {
  console.log(`🤖 Bot connecté en tant que ${client.user.tag}`);
});

client.on('messageCreate', async message => {
  if (message.author.bot) return;

  try {
    await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: message.author.username,
        content: message.content,
        channel: message.channel.name,
        guild: message.guild?.name || 'DM',
        id: message.id,
        timestamp: message.createdTimestamp,
      }),
    });
    console.log(`📨 Message reçu : ${message.content}`);
  } catch (err) {
    console.error('Erreur en envoyant à n8n :', err);
  }
});

client.login(TOKEN);
