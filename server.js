import express from 'express';
import fetch from 'node-fetch'; // n'oublie pas de l'ajouter dans package.json
import { Client, GatewayIntentBits } from 'discord.js';

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware JSON
app.use(express.json());

// Keep-alive
app.get('/', (req, res) => {
  res.status(200).send('OK');
});

// Endpoint webhook d'événement Discord (optionnel pour tests externes)
app.post('/events', (req, res) => {
  console.log('📥 POST /events reçu :', req.body);
  res.sendStatus(200);
});

// Start HTTP server
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});

// Discord bot setup
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.on('ready', () => {
  console.log(`🤖 Bot connecté en tant que ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const data = {
    username: message.author.username,
    content: message.content,
  };

  console.log(`💬 Message de ${data.username} : ${data.content}`);

  try {
    const response = await fetch('https://n8n.srv858173.hstgr.cloud/webhook/Discord1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error(`❌ Erreur en envoyant à n8n : ${response.status} ${response.statusText}`);
    } else {
      console.log('✅ Message envoyé à n8n');
    }
  } catch (error) {
    console.error('❌ Erreur réseau vers n8n :', error);
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
