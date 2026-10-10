const path = require('path');
const sharp = require('sharp');

async function findTextRegions() {
  const logoPath = path.join(__dirname, '../logo.png');
  const { data, info } = await sharp(logoPath).raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;

  // Let's create an image showing connected component bounding boxes or horizontal projection profile
  const yProfile = new Array(h).fill(0);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * info.channels;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
      if (brightness > 45) {
        yProfile[y]++;
      }
    }
  }

  console.log('=== HORIZONTAL PROJECTION PROFILE (Non-zero rows) ===');
  let inRegion = false;
  let regionStart = 0;
  for (let y = 0; y < h; y++) {
    if (yProfile[y] > 50 && !inRegion) {
      inRegion = true;
      regionStart = y;
    } else if (yProfile[y] <= 50 && inRegion) {
      inRegion = false;
      console.log(`Region from Y=${regionStart} to Y=${y - 1} (height: ${y - regionStart})`);
    }
  }
  if (inRegion) {
    console.log(`Region from Y=${regionStart} to Y=${h - 1} (height: ${h - regionStart})`);
  }
}

findTextRegions().catch(console.error);
