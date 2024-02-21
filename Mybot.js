const TelegramBot = require('node-telegram-bot-api');
const { google } = require('googleapis');
require('dotenv').config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const spreadsheetId = process.env.SPREADSHEET_ID; // ID de votre Google Sheet
const credentials = require('./gsheetscrap-415015-349339806e2f.json'); // Chemin vers votre fichier de credentials JSON

const auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);

const sheets = google.sheets({ version: 'v4', auth });

async function appendToGoogleSheet(data) {
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'A:D', // Assurez-vous que cette plage correspond à votre besoin
    valueInputOption: 'USER_ENTERED',
    resource: { values: [data] },
  });
}

// Exemple de remplacement de la fonction saveMessageToExcel
const saveMessageToGoogleSheet = async (msg) => {
  const lines = msg.text.split('\n').map(line => line.trim());
  
  const flagAddress = lines[0] || 'N/A';
  let portfolio = lines[1] || 'N/A';

  const matches = portfolio.match(/\(\$([0-9,.]+)\)/);
  let amount = 0;
  if (matches) {
    amount = parseFloat(matches[1]) * 0.3; // Calculer 30% du montant
    amount = amount.toFixed(2); // Arrondir à deux décimales
    portfolio = `Portfolio ($${amount})`; // Reconstruire la ligne avec le montant ajusté
  }
  const url = lines[3] || 'N/A';
  
  // Les données à ajouter dans Google Sheets
  const data = [new Date().toISOString(), flagAddress, portfolio, url];
  
  try {
    await appendToGoogleSheet(data);
    console.log('Message saved to Google Sheets');
  } catch (error) {
    console.error('Failed to save message to Google Sheets:', error);
  }
};

// Modification de l'écouteur de messages pour utiliser saveMessageToGoogleSheet
bot.on('message', async (msg) => {
  if (msg.text && msg.text.includes('\n')) {
    await saveMessageToGoogleSheet(msg);
  }
});
