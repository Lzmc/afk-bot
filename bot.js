const mineflayer = require('mineflayer');
const keep_alive = require('./keep_alive.js')

const config = {
  host: process.env.HOST,
  port: parseInt(process.env.PORT, 10),
  username: process.env.NAME,
  version: '1.21.1',
  reconnectDelay: 5000
};

let bot;

function createBot() {
  bot = mineflayer.createBot({
    host: config.host,
    port: config.port,
    username: config.username,
    version: config.version
  });

  bot.on('login', () => {
    console.log(`[BOT] Logged in as ${bot.username}`);
  });

  bot.on('spawn', () => {
    console.log('[BOT] Spawned.');
  });

  bot.on('end', () => {
    console.log('[BOT] Disconnected. Reconnecting...');
    setTimeout(createBot, config.reconnectDelay);
  });

  bot.on('error', (err) => {
    console.log(`[BOT] Error: ${err.message}`);
  });

  bot.on('kicked', (reason) => {
    console.log(`[BOT] Kicked: ${reason}`);
  });
}

createBot();
