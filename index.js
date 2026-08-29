const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'amcgg.aternos.me', // الـ IP بتاع سيرفرك
        port: 13653,             // الـ Port بتاع سيرفرك
        username: 'Aternos_Guard_Bot', // اسم البوت جوه اللعبة
        version: false           // بيخليه يلقط إصدار السيرفر تلقائياً
    });

    bot.on('spawn', () => {
        console.log('البوت دخل السيرفر بنجاح!');
        // حركة وهمية كل دقيقتين عشان الأنتى AFK
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 120000);
    });

    bot.on('chat', (username, message) => {
        if (username === bot.username) return;
        if (message === 'ping') bot.chat('pong');
    });

    bot.on('end', () => {
        console.log('البوت اتفصل، جاري إعادة الاتصال بعد 10 ثواني...');
        setTimeout(createBot, 10000);
    });

    bot.on('error', (err) => console.log('خطأ في البوت: ', err));
}

createBot();

// كود إضافي عشان Koyeb يفتكر إن السيرفر شغال ويبقيه مفتوح
const http = require('http');
http.createServer((req, res) => res.end('Bot is running!')).listen(8080);
