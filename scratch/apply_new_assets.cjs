const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const brainDir = 'C:\\Users\\sazan\\.gemini\\antigravity-ide\\brain\\d28ed48a-5898-441c-a5b0-72a85e8514be';
const publicImages = path.join(__dirname, '../public/images');

// Mapping of generated artifact images to public images
const copies = [
  { src: 'doctor1_indian_1791635231010.jpg', dest: 'doctor1.jpg' },
  { src: 'doctor2_indian_1791635258162.jpg', dest: 'doctor2.jpg' },
  { src: 'about_indian_1791635293880.jpg', dest: 'about.jpg' },
  { src: 'smile_before_1791635327407.jpg', dest: 'smile-before.jpg' },
  { src: 'smile_after_1791635364522.jpg', dest: 'smile-after.jpg' },
];

async function applyAssets() {
  console.log('--- COPYING & OPTIMIZING NEW LOCALIZED ASSETS ---');

  for (const c of copies) {
    const srcPath = path.join(brainDir, c.src);
    const destPath = path.join(publicImages, c.dest);
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied ${c.src} -> public/images/${c.dest}`);
    } else {
      console.error(`Missing source image: ${srcPath}`);
    }
  }

  // Re-run sharp image optimization for all assets
  const optimizeScript = require('./optimize_images.cjs');
}

applyAssets().catch(console.error);
