const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../public/images');
const files = fs.readdirSync(dir);

let totalSize = 0;
console.log("=== EXISTING IMAGE ASSETS AUDIT ===");
files.forEach(file => {
  const filepath = path.join(dir, file);
  const stats = fs.statSync(filepath);
  totalSize += stats.size;
  console.log(`${file.padEnd(25)} | ${(stats.size / 1024).toFixed(2).padStart(8)} KB | (${stats.size} bytes)`);
});
console.log("------------------------------------------------");
console.log(`TOTAL IMAGE SIZE: ${(totalSize / (1024 * 1024)).toFixed(2)} MB (${totalSize} bytes)`);
