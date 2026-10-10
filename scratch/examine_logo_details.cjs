const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

async function processTransparentLogo() {
  const logoPath = path.join(__dirname, '../logo.png');
  const image = sharp(logoPath);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels;

  // Create a new buffer for transparent PNG
  const outBuffer = Buffer.alloc(width * height * 4);

  let minX = width, minY = height, maxX = 0, maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const origA = channels === 4 ? data[idx + 3] : 255;

      // Calculate brightness and saturation to separate gold/white/sparkle details from dark background
      // Gold tones have high red/green relative to blue or overall brightness
      const maxRGB = Math.max(r, g, b);
      const minRGB = Math.min(r, g, b);
      const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
      
      // Background in this logo is dark (near black / dark navy)
      // Let's compute alpha based on brightness & color distance from black/dark background
      let newAlpha = 0;
      
      // If brightness is above dark threshold, or if it has distinct gold color
      if (brightness > 35 || maxRGB > 45) {
        // Smooth transition / anti-aliased alpha matting
        if (brightness < 60) {
          // Soft edge blending
          newAlpha = Math.floor(((brightness - 30) / 30) * 255);
        } else {
          newAlpha = 255;
        }
        
        // Respect original alpha if it was lower
        newAlpha = Math.min(newAlpha, origA);

        if (newAlpha > 20) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }

      const outIdx = (y * width + x) * 4;
      outBuffer[outIdx] = r;
      outBuffer[outIdx + 1] = g;
      outBuffer[outIdx + 2] = b;
      outBuffer[outIdx + 3] = newAlpha;
    }
  }

  console.log(`Bounding box of gold logo elements: X=[${minX}, ${maxX}] (width: ${maxX - minX + 1}), Y=[${minY}, ${maxY}] (height: ${maxY - minY + 1})`);

  // Save uncropped transparent logo PNG & WebP
  await sharp(outBuffer, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(path.join(__dirname, '../public/images/logo-transparent.png'));

  await sharp(outBuffer, { raw: { width, height, channels: 4 } })
    .webp({ quality: 90 })
    .toFile(path.join(__dirname, '../public/images/logo-transparent.webp'));

  // Save tightly cropped transparent logo PNG & WebP
  const cropWidth = maxX - minX + 1;
  const cropHeight = maxY - minY + 1;

  await sharp(outBuffer, { raw: { width, height, channels: 4 } })
    .extract({ left: minX, top: minY, width: cropWidth, height: cropHeight })
    .png()
    .toFile(path.join(__dirname, '../public/images/logo-cropped.png'));

  await sharp(outBuffer, { raw: { width, height, channels: 4 } })
    .extract({ left: minX, top: minY, width: cropWidth, height: cropHeight })
    .webp({ quality: 90 })
    .toFile(path.join(__dirname, '../public/images/logo-cropped.webp'));

  // Also create compact header height variants (e.g., height: 60px, 80px, 120px)
  await sharp(path.join(__dirname, '../public/images/logo-cropped.png'))
    .resize({ height: 80, fit: 'contain' })
    .webp({ quality: 90 })
    .toFile(path.join(__dirname, '../public/images/logo-header.webp'));

  await sharp(path.join(__dirname, '../public/images/logo-cropped.png'))
    .resize({ height: 80, fit: 'contain' })
    .png()
    .toFile(path.join(__dirname, '../public/images/logo-header.png'));

  console.log('Successfully created transparent & cropped logo assets in public/images/!');
}

processTransparentLogo().catch(console.error);
