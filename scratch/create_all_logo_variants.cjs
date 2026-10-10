const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

async function generateLogoVariants() {
  const inputLogo = path.join(__dirname, '../logo.png');
  const publicImages = path.join(__dirname, '../public/images');

  const image = sharp(inputLogo);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels;

  // 1. Generate full transparent RGBA buffer
  const fullTransparentBuffer = Buffer.alloc(width * height * 4);

  let minX = width, minY = height, maxX = 0, maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const origA = channels === 4 ? data[idx + 3] : 255;

      const maxRGB = Math.max(r, g, b);
      const minRGB = Math.min(r, g, b);
      const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

      // Color keying for dark background removal while preserving gold highlights & anti-aliased text edges
      let alpha = 0;
      if (brightness > 25 || maxRGB > 35) {
        if (brightness < 55) {
          alpha = Math.floor(((brightness - 25) / 30) * 255);
        } else {
          alpha = 255;
        }
        alpha = Math.min(alpha, origA);

        if (alpha > 15) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }

      const outIdx = (y * width + x) * 4;
      fullTransparentBuffer[outIdx] = r;
      fullTransparentBuffer[outIdx + 1] = g;
      fullTransparentBuffer[outIdx + 2] = b;
      fullTransparentBuffer[outIdx + 3] = alpha;
    }
  }

  const cropW = maxX - minX + 1;
  const cropH = maxY - minY + 1;

  console.log(`Cropped Full Logo dimensions: ${cropW}x${cropH}`);

  // Base raw object for extraction
  const rawImageObj = sharp(fullTransparentBuffer, { raw: { width, height, channels: 4 } });

  // A. Full Logo (With Tagline) cropped tightly
  const fullLogoCropped = rawImageObj.clone().extract({ left: minX, top: minY, width: cropW, height: cropH });

  await fullLogoCropped.clone().png().toFile(path.join(publicImages, 'elix-logo-full.png'));
  await fullLogoCropped.clone().webp({ quality: 95 }).toFile(path.join(publicImages, 'elix-logo-full.webp'));

  // B. Desktop Header Logo (Height 70px)
  await fullLogoCropped.clone()
    .resize({ height: 90, fit: 'contain' })
    .png()
    .toFile(path.join(publicImages, 'elix-logo-header.png'));
  await fullLogoCropped.clone()
    .resize({ height: 90, fit: 'contain' })
    .webp({ quality: 95 })
    .toFile(path.join(publicImages, 'elix-logo-header.webp'));

  // C. Mobile Logo (Wordmark & Profile without lower tagline, cropped Y=0..665)
  // Find bounding box for Y=0..665
  let mobMinX = width, mobMaxX = 0, mobMinY = height, mobMaxY = 0;
  for (let y = minY; y <= Math.min(665, maxY); y++) {
    for (let x = minX; x <= maxX; x++) {
      const idx = (y * width + x) * 4 + 3;
      if (fullTransparentBuffer[idx] > 15) {
        if (x < mobMinX) mobMinX = x;
        if (x > mobMaxX) mobMaxX = x;
        if (y < mobMinY) mobMinY = y;
        if (y > mobMaxY) mobMaxY = y;
      }
    }
  }

  const mobW = mobMaxX - mobMinX + 1;
  const mobH = mobMaxY - mobMinY + 1;
  console.log(`Mobile Wordmark dimensions: ${mobW}x${mobH}`);

  const mobLogoCropped = rawImageObj.clone().extract({ left: mobMinX, top: mobMinY, width: mobW, height: mobH });

  await mobLogoCropped.clone().png().toFile(path.join(publicImages, 'elix-logo-mobile.png'));
  await mobLogoCropped.clone().webp({ quality: 95 }).toFile(path.join(publicImages, 'elix-logo-mobile.webp'));

  // Header Mobile Resized
  await mobLogoCropped.clone()
    .resize({ height: 56, fit: 'contain' })
    .png()
    .toFile(path.join(publicImages, 'elix-logo-mobile-header.png'));
  await mobLogoCropped.clone()
    .resize({ height: 56, fit: 'contain' })
    .webp({ quality: 95 })
    .toFile(path.join(publicImages, 'elix-logo-mobile-header.webp'));

  console.log('--- ALL ELIX LOGO ASSETS CREATED SUCCESSFULLY ---');
}

generateLogoVariants().catch(console.error);
