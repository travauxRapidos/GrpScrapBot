
# Bot Telegram pour Stockage de Messages dans Excel

Ce projet implémente un bot Telegram qui écoute les messages d'un groupe ou d'un utilisateur et les stocke dans un fichier Excel. Chaque message est attendu sous un format spécifique, divisé en trois parties, et chaque partie est stockée dans une colonne distincte d'un fichier Excel.

## Fonctionnalités

- Écoute des messages en temps réel sur Telegram.
- Stockage de chaque message dans un fichier Excel avec les détails : date, contenu du message divisé en trois parties.
- Gestion des messages suivant un format spécifique.

## Prérequis

- Node.js
- Un token API de bot Telegram
- ExcelJS et node-telegram-bot-api packages

## Installation

Pour utiliser ce projet, suivez ces étapes :

1. Clonez le dépôt sur votre machine locale :

\`\`\`sh
git clone <url_du_dépôt>
\`\`\`

2. Installez les dépendances en exécutant :

\`\`\`sh
cd <répertoire_du_projet>
npm install
\`\`\`

3. Créez un fichier `.env` à la racine du projet et ajoutez votre token de bot Telegram :

\`\`\`env
TELEGRAM_BOT_TOKEN=<votre_token_bot>
\`\`\`

## Configuration et Utilisation

1. **Créez un bot Telegram** en utilisant BotFather et obtenez votre token API.
2. **Ajoutez le bot à un groupe Telegram** ou utilisez-le en message privé.
3. **Exécutez le bot** avec la commande :

\`\`\`sh
node bot.js
\`\`\`

Le bot commencera à écouter les messages. Chaque message conforme au format attendu sera stocké dans un fichier Excel nommé `messages.xlsx`.

## Format du Message Attendu

Le message doit être structuré en trois lignes comme suit :

\`\`\`
COUNTRY ID
XXXXXX (XX$)
XXXXXLINK
\`\`\`

- La première ligne est stockée comme "Flag and Address".
- La deuxième ligne est le "Portfolio".
- La troisième ligne est l'"URL".

## Contribution

Les contributions à ce projet sont les bienvenues. Veuillez suivre les bonnes pratiques de développement et maintenir le code propre et bien commenté.

## Licence

[MIT](LICENSE.txt)
