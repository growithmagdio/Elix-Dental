const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function buildAllBrandAssets() {
  const rootDir = path.resolve(__dirname, '..');
  const logoPath = path.join(rootDir, 'logo.png');
  const publicImages = path.join(rootDir, 'public/images');
  const publicDir = path.join(rootDir, 'public');

  if (!fs.existsSync(publicImages)) {
    fs.mkdirSync(publicImages, { recursive: true });
  }

  console.log('Loading base logo from:', logoPath);
  const baseImg = sharp(logoPath);
  const { data: rawData, info: rawInfo } = await baseImg.raw().toBuffer({ resolveWithObject: true });
  const { width, height } = rawInfo;

  // 1. Tightly crop full logo bounds (removing outer empty canvas while keeping anti-aliasing)
  // Bounding box: X: 107..2035, Y: 100..617
  const pad = 6;
  const cropX = Math.max(0, 107 - pad);
  const cropY = Math.max(0, 100 - pad);
  const cropW = Math.min(width - cropX, (2035 - 107 + 1) + pad * 2);
  const cropH = Math.min(height - cropY, (617 - 100 + 1) + pad * 2);

  console.log(`Cropping base full logo to: ${cropW}x${cropH} at (${cropX}, ${cropY})`);

  // Extract raw buffer of cropped region
  const fullCroppedRaw = await sharp(logoPath)
    .extract({ left: cropX, top: cropY, width: cropW, height: cropH })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const cWidth = fullCroppedRaw.info.width;
  const cHeight = fullCroppedRaw.info.height;
  const cData = fullCroppedRaw.data;

  // 2. Generate Light Variation Raw Buffer (for Dark Backgrounds)
  // Maps forest-green pixels to warm ivory (#F8F5EE) while keeping all gold elements pristine
  const lightData = Buffer.from(cData);

  for (let i = 0; i < lightData.length; i += 4) {
    const r = cData[i];
    const g = cData[i + 1];
    const b = cData[i + 2];
    const a = cData[i + 3];

    if (a < 5) continue;

    // Distinguish metallic gold from dark forest green
    const isGold = (r > 110 && g > 80 && r >= g * 0.75) || (r > 70 && g > 60 && b < 40);

    if (!isGold) {
      // Forest green pixel -> Transform to warm ivory (#F8F5EE) with delicate shading
      const greenLuma = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      const factor = Math.min(1, Math.max(0, greenLuma * 2.8));
      
      const ivoryR = Math.round(226 + 29 * factor);
      const ivoryG = Math.round(220 + 33 * factor);
      const ivoryB = Math.round(210 + 38 * factor);

      lightData[i] = ivoryR;
      lightData[i + 1] = ivoryG;
      lightData[i + 2] = ivoryB;
    }
  }

  // Base sharp objects for full logo
  const fullOriginalBuf = await sharp(cData, { raw: { width: cWidth, height: cHeight, channels: 4 } }).png().toBuffer();
  const fullLightBuf = await sharp(lightData, { raw: { width: cWidth, height: cHeight, channels: 4 } }).png().toBuffer();

  // A. Save Full Logos (High-res and WebP)
  await sharp(fullOriginalBuf).png().toFile(path.join(publicImages, 'panacea-logo-full.png'));
  await sharp(fullOriginalBuf).webp({ quality: 95 }).toFile(path.join(publicImages, 'panacea-logo-full.webp'));

  await sharp(fullLightBuf).png().toFile(path.join(publicImages, 'panacea-logo-full-light.png'));
  await sharp(fullLightBuf).webp({ quality: 95 }).toFile(path.join(publicImages, 'panacea-logo-full-light.webp'));

  // Also backwards compatibility links
  await sharp(fullOriginalBuf).png().toFile(path.join(publicImages, 'logo-cropped.png'));
  await sharp(fullOriginalBuf).webp({ quality: 95 }).toFile(path.join(publicImages, 'logo-cropped.webp'));
  await sharp(fullOriginalBuf).png().toFile(path.join(publicImages, 'logo-transparent.png'));
  await sharp(fullOriginalBuf).webp({ quality: 95 }).toFile(path.join(publicImages, 'logo-transparent.webp'));

  // B. Emblem Extraction (Tooth and Leaf Mark)
  const embLeft = 4;
  const embTop = 4;
  const embWidth = 596;
  const embHeight = 518;

  const emblemOriginalBuf = await sharp(fullOriginalBuf).extract({ left: embLeft, top: embTop, width: embWidth, height: embHeight }).png().toBuffer();
  const emblemLightBuf = await sharp(fullLightBuf).extract({ left: embLeft, top: embTop, width: embWidth, height: embHeight }).png().toBuffer();

  await sharp(emblemOriginalBuf).png().toFile(path.join(publicImages, 'panacea-emblem.png'));
  await sharp(emblemOriginalBuf).webp({ quality: 95 }).toFile(path.join(publicImages, 'panacea-emblem.webp'));

  await sharp(emblemLightBuf).png().toFile(path.join(publicImages, 'panacea-emblem-light.png'));
  await sharp(emblemLightBuf).webp({ quality: 95 }).toFile(path.join(publicImages, 'panacea-emblem-light.webp'));

  // Backwards compatibility for elix-mark
  await sharp(emblemOriginalBuf).png().toFile(path.join(publicImages, 'elix-mark.png'));
  await sharp(emblemOriginalBuf).webp({ quality: 95 }).toFile(path.join(publicImages, 'elix-mark.webp'));

  // C. Compact Header Logo Generation (Emblem + PANACEA Wordmark)
  const panLeft = 642;
  const panTop = 114;
  const panWidth = 1292;
  const panHeight = 226;

  // Create compact lockup for Original
  const embResizedOrig = await sharp(emblemOriginalBuf).resize({ height: 260 }).png().toBuffer();
  const panResizedOrig = await sharp(fullOriginalBuf)
    .extract({ left: panLeft, top: panTop, width: panWidth, height: panHeight })
    .resize({ height: 165 })
    .png()
    .toBuffer();

  const embMeta = await sharp(embResizedOrig).metadata();
  const panMeta = await sharp(panResizedOrig).metadata();

  const compactW = embMeta.width + 36 + panMeta.width;
  const compactH = Math.max(embMeta.height, panMeta.height);

  const compactCanvasOrig = await sharp({
    create: {
      width: compactW,
      height: compactH,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  }).png().toBuffer();

  const compactOrigBuf = await sharp(compactCanvasOrig).composite([
    { input: embResizedOrig, top: Math.round((compactH - embMeta.height) / 2), left: 0 },
    { input: panResizedOrig, top: Math.round((compactH - panMeta.height) / 2), left: embMeta.width + 36 }
  ]).png().toBuffer();

  await sharp(compactOrigBuf).png().toFile(path.join(publicImages, 'panacea-logo-compact.png'));
  await sharp(compactOrigBuf).webp({ quality: 95 }).toFile(path.join(publicImages, 'panacea-logo-compact.webp'));

  // Create compact lockup for Light (Warm Ivory)
  const embResizedLight = await sharp(emblemLightBuf).resize({ height: 260 }).png().toBuffer();
  const panResizedLight = await sharp(fullLightBuf)
    .extract({ left: panLeft, top: panTop, width: panWidth, height: panHeight })
    .resize({ height: 165 })
    .png()
    .toBuffer();

  const compactCanvasLight = await sharp({
    create: {
      width: compactW,
      height: compactH,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  }).png().toBuffer();

  const compactLightBuf = await sharp(compactCanvasLight).composite([
    { input: embResizedLight, top: Math.round((compactH - embMeta.height) / 2), left: 0 },
    { input: panResizedLight, top: Math.round((compactH - panMeta.height) / 2), left: embMeta.width + 36 }
  ]).png().toBuffer();

  await sharp(compactLightBuf).png().toFile(path.join(publicImages, 'panacea-logo-compact-light.png'));
  await sharp(compactLightBuf).webp({ quality: 95 }).toFile(path.join(publicImages, 'panacea-logo-compact-light.webp'));

  // D. Sized Header & Footer Assets (Desktop & Mobile, Fast Loading)
  // Desktop header (height 80px)
  await sharp(fullLightBuf)
    .resize({ height: 80, fit: 'contain' })
    .png()
    .toFile(path.join(publicImages, 'panacea-header-light.png'));
  await sharp(fullLightBuf)
    .resize({ height: 80, fit: 'contain' })
    .webp({ quality: 95 })
    .toFile(path.join(publicImages, 'panacea-header-light.webp'));

  await sharp(fullOriginalBuf)
    .resize({ height: 80, fit: 'contain' })
    .png()
    .toFile(path.join(publicImages, 'panacea-header-dark.png'));
  await sharp(fullOriginalBuf)
    .resize({ height: 80, fit: 'contain' })
    .webp({ quality: 95 })
    .toFile(path.join(publicImages, 'panacea-header-dark.webp'));

  // Mobile header compact (height 56px)
  await sharp(compactLightBuf)
    .resize({ height: 56, fit: 'contain' })
    .png()
    .toFile(path.join(publicImages, 'panacea-header-mobile-light.png'));
  await sharp(compactLightBuf)
    .resize({ height: 56, fit: 'contain' })
    .webp({ quality: 95 })
    .toFile(path.join(publicImages, 'panacea-header-mobile-light.webp'));

  await sharp(compactOrigBuf)
    .resize({ height: 56, fit: 'contain' })
    .png()
    .toFile(path.join(publicImages, 'panacea-header-mobile-dark.png'));
  await sharp(compactOrigBuf)
    .resize({ height: 56, fit: 'contain' })
    .webp({ quality: 95 })
    .toFile(path.join(publicImages, 'panacea-header-mobile-dark.webp'));

  // Update legacy elix-logo files for seamless backwards compatibility
  await sharp(fullLightBuf).resize({ height: 80, fit: 'contain' }).png().toFile(path.join(publicImages, 'elix-logo-header.png'));
  await sharp(fullLightBuf).resize({ height: 80, fit: 'contain' }).webp({ quality: 95 }).toFile(path.join(publicImages, 'elix-logo-header.webp'));
  await sharp(fullLightBuf).png().toFile(path.join(publicImages, 'elix-logo-full.png'));
  await sharp(fullLightBuf).webp({ quality: 95 }).toFile(path.join(publicImages, 'elix-logo-full.webp'));
  await sharp(compactLightBuf).resize({ height: 56, fit: 'contain' }).png().toFile(path.join(publicImages, 'elix-logo-mobile-header.png'));
  await sharp(compactLightBuf).resize({ height: 56, fit: 'contain' }).webp({ quality: 95 }).toFile(path.join(publicImages, 'elix-logo-mobile-header.webp'));
  await sharp(compactLightBuf).png().toFile(path.join(publicImages, 'elix-logo-mobile.png'));
  await sharp(compactLightBuf).webp({ quality: 95 }).toFile(path.join(publicImages, 'elix-logo-mobile.webp'));

  // E. Favicons and Apple Touch Icon
  // Apple Touch Icon: 180x180 px on luxury deep forest-green/navy (#071912) background with gold border circle
  const emblemForIcon = await sharp(emblemOriginalBuf).resize({ height: 130 }).png().toBuffer();
  const embIconMeta = await sharp(emblemForIcon).metadata();
  const iconBg = await sharp({
    create: {
      width: 180,
      height: 180,
      channels: 4,
      background: { r: 6, g: 25, b: 17, alpha: 1 }
    }
  }).png().toBuffer();

  const iconTop = Math.round((180 - embIconMeta.height) / 2);
  const iconLeft = Math.round((180 - embIconMeta.width) / 2);

  await sharp(iconBg)
    .composite([{ input: emblemForIcon, top: iconTop, left: iconLeft }])
    .png()
    .toFile(path.join(publicImages, 'apple-touch-icon.png'));

  // Favicon PNG 32x32 & 64x64
  await sharp(emblemOriginalBuf)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicImages, 'favicon-32x32.png'));

  await sharp(emblemOriginalBuf)
    .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicImages, 'favicon-64x64.png'));

  // SVG Favicon with high-res embedded PNG tooth emblem
  const emblemBase64 = (await sharp(emblemOriginalBuf).resize(128, 128, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer()).toString('base64');
  const faviconSvgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <defs>
    <radialGradient id="panaceaBg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0E2F20" />
      <stop offset="100%" stop-color="#04150D" />
    </radialGradient>
  </defs>
  <circle cx="64" cy="64" r="62" fill="url(#panaceaBg)" stroke="#C5A059" stroke-width="2.5" />
  <image href="data:image/png;base64,${emblemBase64}" x="16" y="16" width="96" height="96" preserveAspectRatio="xMidYMid meet" />
</svg>
`;
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSvgContent, 'utf8');

  console.log('--- ALL PANACEA DENTAL CARE BRAND ASSETS GENERATED SUCCESSFULLY! ---');
}

buildAllBrandAssets().catch(console.error);
