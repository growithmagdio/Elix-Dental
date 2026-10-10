const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, '../public/images');
const outputDir = path.join(__dirname, '../public/images');

const images = [
  { name: 'dental-hero', orig: 'dental-hero.jpg' },
  { name: 'about', orig: 'about.jpg' },
  { name: 'doctor1', orig: 'doctor1.jpg' },
  { name: 'doctor2', orig: 'doctor2.jpg' },
  { name: 'smile-before', orig: 'smile-before.jpg' },
  { name: 'smile-after', orig: 'smile-after.jpg' },
];

const sizes = [
  { suffix: '-sm', width: 480 },
  { suffix: '-md', width: 800 },
  { suffix: '-lg', width: 1200 },
];

async function processImages() {
  console.log('--- STARTING IMAGE OPTIMIZATION ---');

  for (const img of images) {
    const inputPath = path.join(inputDir, img.orig);
    if (!fs.existsSync(inputPath)) {
      console.warn(`Input file missing: ${img.orig}`);
      continue;
    }

    const metadata = await sharp(inputPath).metadata();
    console.log(`\nProcessing ${img.name} (Original: ${metadata.width}x${metadata.height}, Format: ${metadata.format})`);

    // 1. Optimize full-size original WebP & AVIF & JPG
    // Full size WebP (quality 82 - visually lossless, huge compression)
    const fullWebpPath = path.join(outputDir, `${img.name}.webp`);
    await sharp(inputPath)
      .resize({ width: Math.min(metadata.width, 1200), fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(fullWebpPath + '.tmp');
    fs.renameSync(fullWebpPath + '.tmp', fullWebpPath);

    // Full size AVIF
    const fullAvifPath = path.join(outputDir, `${img.name}.avif`);
    await sharp(inputPath)
      .resize({ width: Math.min(metadata.width, 1200), fit: 'inside', withoutEnlargement: true })
      .avif({ quality: 78, effort: 6 })
      .toFile(fullAvifPath);

    // Full size optimized JPG fallback
    const fullJpgPath = path.join(outputDir, `${img.name}.jpg`);
    await sharp(inputPath)
      .resize({ width: Math.min(metadata.width, 1200), fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(fullJpgPath + '.tmp');
    fs.renameSync(fullJpgPath + '.tmp', fullJpgPath);

    // 2. Generate responsive sizes (-sm: 480w, -md: 800w)
    for (const size of sizes) {
      if (metadata.width > size.width) {
        // WebP
        await sharp(inputPath)
          .resize({ width: size.width, fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 80, effort: 6 })
          .toFile(path.join(outputDir, `${img.name}${size.suffix}.webp`));

        // AVIF
        await sharp(inputPath)
          .resize({ width: size.width, fit: 'inside', withoutEnlargement: true })
          .avif({ quality: 75, effort: 6 })
          .toFile(path.join(outputDir, `${img.name}${size.suffix}.avif`));

        // JPG fallback
        await sharp(inputPath)
          .resize({ width: size.width, fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: 80, mozjpeg: true })
          .toFile(path.join(outputDir, `${img.name}${size.suffix}.jpg`));
      }
    }
  }

  // Generate og-image.jpg (1200x630 social share card) from dental-hero.jpg
  const heroPath = path.join(inputDir, 'dental-hero.jpg');
  if (fs.existsSync(heroPath)) {
    await sharp(heroPath)
      .resize(1200, 630, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(path.join(outputDir, 'og-image.jpg'));
    console.log('\nGenerated og-image.jpg (1200x630)');
  }

  // Clean up duplicate hero.jpg if it exists
  const duplicateHero = path.join(outputDir, 'hero.jpg');
  if (fs.existsSync(duplicateHero)) {
    fs.unlinkSync(duplicateHero);
    console.log('Removed duplicate hero.jpg');
  }

  console.log('\n--- IMAGE OPTIMIZATION COMPLETED ---');
}

processImages().catch(console.error);
