const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function inspectLogo() {
  const logoPath = path.join(__dirname, '../logo.png');
  const metadata = await sharp(logoPath).metadata();
  console.log('=== LOGO METADATA ===');
  console.log('Dimensions:', metadata.width, 'x', metadata.height);
  console.log('Format:', metadata.format);
  console.log('Channels:', metadata.channels);
  console.log('Has Alpha:', metadata.hasAlpha);
  console.log('Space:', metadata.space);
  console.log('File Size:', fs.statSync(logoPath).size, 'bytes');
}

inspectLogo().catch(console.error);
