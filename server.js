import express from 'express';

const app = express();
const PORT = process.env.PORT || 10000;
const FORWARD_URL = process.env.FORWARD_URL;

app.use(express.json());

app.post('/events', async (req, res) => {
  try {
    console.log('Event received from Discord:', req.body);

    await fetch(FORWARD_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    return res.status(200).send('Event forwarded to n8n');
  } catch (err) {
    console.error('Forwarding failed:', err);
    return res.status(500).send('Error');
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Listening on port ${PORT}`);
});
