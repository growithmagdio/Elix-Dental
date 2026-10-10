const path = require('path');
const sharp = require('sharp');

async function analyzePixels() {
  const logoPath = path.join(__dirname, '../logo.png');
  const image = sharp(logoPath);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  
  console.log(`Image info: ${info.width}x${info.height}, channels: ${info.channels}`);
  
  // Sample top-left corner (0,0)
  const getPixel = (x, y) => {
    const idx = (y * info.width + x) * info.channels;
    return {
      r: data[idx],
      g: data[idx + 1],
      b: data[idx + 2],
      a: info.channels === 4 ? data[idx + 3] : 255
    };
  };

  console.log('Top-left (0,0):', getPixel(0, 0));
  console.log('Top-right (1773,0):', getPixel(info.width - 1, 0));
  console.log('Center (887, 443):', getPixel(Math.floor(info.width / 2), Math.floor(info.height / 2)));
  console.log('Bottom-left (0, 886):', getPixel(0, info.height - 1));

  // Let's check min/max alpha values
  let minAlpha = 255, maxAlpha = 0;
  let nonZeroAlphaCount = 0;
  let zeroAlphaCount = 0;
  for (let i = 3; i < data.length; i += info.channels) {
    const a = data[i];
    if (a < minAlpha) minAlpha = a;
    if (a > maxAlpha) maxAlpha = a;
    if (a === 0) zeroAlphaCount++;
    else nonZeroAlphaCount++;
  }
  console.log(`Alpha stats: min=${minAlpha}, max=${maxAlpha}, zeroAlphaCount=${zeroAlphaCount}, nonZeroAlphaCount=${nonZeroAlphaCount}`);

  // Let me sample colors of non-transparent background vs gold elements
  // Let's find dark background colors vs bright gold colors
  let darkCount = 0;
  let goldCount = 0;
  for (let y = 0; y < info.height; y += 10) {
    for (let x = 0; x < info.width; x += 10) {
      const p = getPixel(x, y);
      if (p.a > 0) {
        // Luminance / brightness
        const brightness = 0.299 * p.r + 0.587 * p.g + 0.114 * p.b;
        if (brightness < 40) darkCount++;
        else if (p.r > 100 && p.g > 70) goldCount++;
      }
    }
  }
  console.log(`Sampled pixel counts: Dark pixels (brightness < 40): ${darkCount}, Gold/Bright pixels: ${goldCount}`);
}

analyzePixels().catch(console.error);
