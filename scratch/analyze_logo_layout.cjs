const path = require('path');
const sharp = require('sharp');

async function analyzeLayout() {
  const logoPath = path.join(__dirname, '../public/images/logo-cropped.png');
  const { data, info } = await sharp(logoPath).raw().toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;

  // Let's divide image into 10 horizontal strips (y-axis) and count gold pixels in each strip
  console.log(`=== VERTICAL DENSITY ANALYSIS (${width}x${height}) ===`);
  const stripH = Math.floor(height / 10);
  for (let s = 0; s < 10; s++) {
    const yStart = s * stripH;
    const yEnd = Math.min(height, (s + 1) * stripH);
    let goldPixels = 0;
    
    // Find minX and maxX for this strip
    let stripMinX = width, stripMaxX = 0;

    for (let y = yStart; y < yEnd; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const a = data[idx + 3];
        if (a > 50) {
          goldPixels++;
          if (x < stripMinX) stripMinX = x;
          if (x > stripMaxX) stripMaxX = x;
        }
      }
    }
    const widthInStrip = stripMaxX >= stripMinX ? (stripMaxX - stripMinX + 1) : 0;
    console.log(`Strip ${s} (y=${yStart}..${yEnd}): ${goldPixels} gold pixels, X span: [${stripMinX}, ${stripMaxX}] (width: ${widthInStrip})`);
  }
}

analyzeLayout().catch(console.error);
