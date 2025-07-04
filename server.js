import express from 'express';
import { verifyKey } from 'discord-interactions';
import { InteractionType, InteractionResponseType } from 'discord-interactions';

const app = express();
const PORT = process.env.PORT || 3000;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const FORWARD_URL = process.env.FORWARD_URL;

app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));

app.post('/interactions', async (req, res) => {
  const signature = req.get('X-Signature-Ed25519');
  const timestamp = req.get('X-Signature-Timestamp');

  if (!verifyKey(req.rawBody, signature, timestamp, PUBLIC_KEY)) {
    return res.status(401).send('Bad request signature');
  }

  if (req.body.type === InteractionType.PING) {
    return res.json({ type: InteractionResponseType.PONG });
  }

  try {
    const response = await fetch(FORWARD_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    return res.status(500).send('Forwarding failed');
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));