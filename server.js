import express from 'express';
import { Client, GatewayIntentBits } from 'discord.js';

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware pour les requêtes JSON
app.use(express.json());

// Endpoint keep-alive
app.get('/', (req, res) => {
  res.status(200).send('OK');
});

// Endpoint Discord Webhook
app.post('/events', (req, res) => {
  console.log('Message reçu :', req.body);
  res.sendStatus(200);
});

// Démarrage du serveur Express
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});

// Lancement du bot Discord
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.on('ready', () => {
  console.log(`🤖 Bot connecté en tant que ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
  if (!message.author.bot) {
    console.log(`💬 Message de ${message.author.username} : ${message.content}`);
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
