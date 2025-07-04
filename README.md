# Discord → n8n Proxy

Un petit serveur Express pour :

- Vérifier la signature Discord
- Répondre au ping
- Relayer les interactions vers n8n

## Variables d'environnement

- `PUBLIC_KEY` : la clé publique Discord
- `FORWARD_URL` : URL du webhook n8n