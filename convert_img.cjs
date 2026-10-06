const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('C:/Users/Kalaiyarasi/.gemini/antigravity/brain/6ae26fd8-0924-4eac-81d4-cac6dbaa7bee/.system_generated/steps/481/output.txt', 'utf8');
const lines = content.split('\n');
const line = lines.find(l => l.includes('data:image/png;base64,'));
if (line) {
  const base64 = line.trim().replace(/^"/, '').replace(/"$/, '').replace(/^data:image\/png;base64,/, '');
  const buffer = Buffer.from(base64, 'base64');
  const cardPath = path.join(__dirname, 'client/public/images/projects/foreversparkle-card.jpg');
  const coverPath = path.join(__dirname, 'client/public/images/projects/foreversparkle-cover.jpg');
  fs.writeFileSync(cardPath, buffer);
  fs.writeFileSync(coverPath, buffer);
  console.log('Saved images successfully! Size:', buffer.length);
} else {
  console.log('Line not found');
}
