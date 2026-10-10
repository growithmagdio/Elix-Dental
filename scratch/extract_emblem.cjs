const path = require('path');
const sharp = require('sharp');

async function extractEmblem() {
  const fullLogo = path.join(__dirname, '../public/images/elix-logo-full.png');
  const publicImages = path.join(__dirname, '../public/images');

  const image = sharp(fullLogo);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;

  // Let's find top emblem bounds (from Y=0 to Y=Math.floor(height * 0.55))
  const maxY = Math.floor(height * 0.55);

  let minX = width, minY = height, maxX = 0, emblemMaxY = 0;

  for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4 + 3;
      if (data[idx] > 20) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > emblemMaxY) emblemMaxY = y;
      }
    }
  }

  const emblemW = maxX - minX + 1;
  const emblemH = emblemMaxY - minY + 1;

  console.log(`Emblem bounds: X=[${minX}, ${maxX}] (${emblemW}px), Y=[${minY}, ${emblemMaxY}] (${emblemH}px)`);

  const emblemCropped = image.clone().extract({ left: minX, top: minY, width: emblemW, height: emblemH });

  await emblemCropped.clone().png().toFile(path.join(publicImages, 'elix-mark.png'));
  await emblemCropped.clone().webp({ quality: 95 }).toFile(path.join(publicImages, 'elix-mark.webp'));

  // Create favicon.png (64x64) and apple-touch-icon.png (180x180) from official emblem mark!
  await emblemCropped.clone()
    .resize(180, 180, { fit: 'contain', background: { r: 11, g: 19, b: 43, alpha: 1 } })
    .png()
    .toFile(path.join(publicImages, 'apple-touch-icon.png'));

  console.log('Successfully created elix-mark.png and elix-mark.webp!');
}

extractEmblem().catch(console.error);
