const fs = require('fs');
const path = require('path');

const newHeroPath = 'C:\\Users\\sazan\\.gemini\\antigravity-ide\\brain\\d28ed48a-5898-441c-a5b0-72a85e8514be\\dental_hero_elix_1791635737085.jpg';
const destHeroPath = path.join(__dirname, '../public/images/dental-hero.jpg');

if (fs.existsSync(newHeroPath)) {
  fs.copyFileSync(newHeroPath, destHeroPath);
  console.log('Successfully updated public/images/dental-hero.jpg with ELIX branded hero image!');
} else {
  console.error('Source hero image missing:', newHeroPath);
}
