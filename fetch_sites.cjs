const https = require('https');

function checkSite(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      console.log(url, 'Status:', res.statusCode);
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const titleMatch = data.match(/<title>([^<]+)<\/title>/i);
        console.log(url, 'Title:', titleMatch ? titleMatch[1] : 'none');
        const imgs = data.match(/https?:\/\/[^\s"'<>]+\.(?:jpg|png|webp)/gi);
        console.log(url, 'Images:', imgs ? imgs.slice(0, 8) : []);
        resolve({ url, title: titleMatch ? titleMatch[1] : '', imgs });
      });
    }).on('error', err => {
      console.error(url, 'Error:', err.message);
      resolve({ url, error: err.message });
    });
  });
}

async function run() {
  await checkSite('https://baanijewels.com/');
  await checkSite('https://foreversparkle.co.in/');
}
run();
