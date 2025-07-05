import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(express.json());

// ✅ Ping (keep-alive)
app.get('/', (req, res) => {
  res.send('✅ Bot is alive and running.');
});

// ✅ Endpoint pour recevoir les événements Discord
app.post('/events', (req, res) => {
  console.log('📨 Event received from Discord:', req.body);

  // Tu peux traiter les events ici, ex : vérifier le type, faire une action, etc.
  res.sendStatus(200); // toujours renvoyer 200 pour confirmer réception
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});
