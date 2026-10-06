const https = require('https');
const fs = require('fs');
const path = require('path');

https.get('https://foreversparkle.co.in/assets/index-BqApcf96.js', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const regex = /["'](\/assets\/[^"']+\.(?:png|jpg|jpeg|webp))["']/gi;
    let match;
    const urls = new Set();
    while ((match = regex.exec(data)) !== null) {
      urls.add(match[1]);
    }
    console.log('Found asset images:', Array.from(urls));

    // Also look for external or root images
    const regex2 = /["'](https?:\/\/[^"']+\.(?:png|jpg|jpeg|webp))["']/gi;
    while ((match = regex2.exec(data)) !== null) {
      urls.add(match[1]);
    }
    console.log('All image candidates:', Array.from(urls));

    // Download first good image
    const list = Array.from(urls);
    if (list.length > 0) {
      const imgPath = list[0].startsWith('http') ? list[0] : 'https://foreversparkle.co.in' + list[0];
      console.log('Downloading sample image:', imgPath);
      https.get(imgPath, (imgRes) => {
        const fileStream = fs.createWriteStream(path.join(__dirname, 'client/public/images/projects/foreversparkle-card.jpg'));
        imgRes.pipe(fileStream);
        fileStream.on('finish', () => {
          console.log('Saved foreversparkle-card.jpg!');
          // also copy to cover
          fs.copyFileSync(
            path.join(__dirname, 'client/public/images/projects/foreversparkle-card.jpg'),
            path.join(__dirname, 'client/public/images/projects/foreversparkle-cover.jpg')
          );
          console.log('Copied to foreversparkle-cover.jpg');
        });
      });
    }
  });
}).on('error', err => console.error(err));
