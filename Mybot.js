const TelegramBot = require('node-telegram-bot-api');
const ExcelJS = require('exceljs');
require('dotenv').config();
const fs = require('fs');

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

const workbook = new ExcelJS.Workbook();
let sheet;
const sheetName = 'Messages';

const initExcelFile = async () => {
  try {
    const fileExists = fs.existsSync('messages.xlsx');
    if (fileExists) {
      await workbook.xlsx.readFile('messages.xlsx');
      sheet = workbook.getWorksheet(sheetName) || workbook.addWorksheet(sheetName);
    } else {
      sheet = workbook.addWorksheet(sheetName);
      sheet.columns = [
        { header: 'Date', key: 'date', width: 20 },
        { header: 'Flag and Address', key: 'flagAddress', width: 30 },
        { header: 'Portfolio', key: 'portfolio', width: 25 },
        { header: 'URL', key: 'url', width: 50 },
      ];
    }
  } catch (error) {
    console.error('Error initializing Excel file:', error);
  }
};

const saveMessageToExcel = async (msg) => {
 
  const lines = msg.text.split('\n').map(line => line.trim());
  console.log(lines);
  
  
  const flagAddress = lines[0] || 'N/A'; 
  const portfolio = lines.length > 1 ? lines[1] : 'N/A'; 
  const url = lines.length > 2 ? lines[2] : 'N/A'; 
  const urls = lines.length > 2 ? lines[3] : 'N/A';
  
  sheet.addRow({
    date: new Date().toISOString(),
    flagAddress: flagAddress,
    portfolio: portfolio,
    url: urls,
  });
  
  await workbook.xlsx.writeFile('messages.xlsx');
};

bot.on('message', async (msg) => {
  if (msg.text && msg.text.includes('\n')) {
    await saveMessageToExcel(msg);
  }
});

initExcelFile().then(() => {
  console.log('Bot ok...');
});
k