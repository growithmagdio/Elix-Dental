const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../public/images');
const files = fs.readdirSync(dir);

console.log("=== IMAGE AUDIT ===");
files.forEach(file => {
  const filepath = path.join(dir, file);
  const stats = fs.statSync(filepath);
  console.log(`${file.padEnd(25)} | Size: ${(stats.size / 1024).toFixed(2)} KB (${stats.size} bytes)`);
});
