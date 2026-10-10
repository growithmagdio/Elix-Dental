const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../public/images');
const files = fs.readdirSync(dir);

const originalMap = {
  'dental-hero': 763806,
  'about': 905225,
  'doctor1': 646931,
  'doctor2': 657458,
  'smile-before': 658700,
  'smile-after': 658700,
};

console.log("=== COMPREHENSIVE IMAGE PERFORMANCE REPORT ===");
console.log("");
console.log("1. INDIVIDUAL IMAGE COMPARISONS:");
console.log("-----------------------------------------------------------------------------------------");
console.log("Asset Base      | Format & Size  | Mobile (AVIF/WebP) | Desktop (AVIF/WebP) | Reduction %");
console.log("-----------------------------------------------------------------------------------------");

const bases = ['dental-hero', 'about', 'doctor1', 'doctor2', 'smile-before', 'smile-after'];

let totalOrig = 0;
let totalOptDesktopAvif = 0;
let totalOptMobileAvif = 0;

bases.forEach(base => {
  const origSize = originalMap[base];
  totalOrig += origSize;

  const avifLg = fs.existsSync(path.join(dir, `${base}.avif`)) ? fs.statSync(path.join(dir, `${base}.avif`)).size : 0;
  const webpLg = fs.existsSync(path.join(dir, `${base}.webp`)) ? fs.statSync(path.join(dir, `${base}.webp`)).size : 0;
  
  const avifSm = fs.existsSync(path.join(dir, `${base}-sm.avif`)) ? fs.statSync(path.join(dir, `${base}-sm.avif`)).size : avifLg;
  const webpSm = fs.existsSync(path.join(dir, `${base}-sm.webp`)) ? fs.statSync(path.join(dir, `${base}-sm.webp`)).size : webpLg;

  totalOptDesktopAvif += avifLg;
  totalOptMobileAvif += avifSm;

  const mobileKB = (avifSm / 1024).toFixed(1) + ' KB';
  const desktopKB = (avifLg / 1024).toFixed(1) + ' KB';
  const origKB = (origSize / 1024).toFixed(1) + ' KB';
  const reductionMobile = (((origSize - avifSm) / origSize) * 100).toFixed(1) + '%';
  const reductionDesktop = (((origSize - avifLg) / origSize) * 100).toFixed(1) + '%';

  console.log(
    `${base.padEnd(15)} | Orig: ${origKB.padStart(8)} | Mobile: ${mobileKB.padStart(8)} | Desktop: ${desktopKB.padStart(8)} | ${reductionDesktop} (D) / ${reductionMobile} (M)`
  );
});

console.log("-----------------------------------------------------------------------------------------");
console.log("");
console.log("2. OVERALL PAYLOAD REDUCTION SUMMARY:");
console.log(`- Original Raw Images Payload: ${(totalOrig / (1024 * 1024)).toFixed(2)} MB (${totalOrig} bytes)`);
console.log(`- Desktop AVIF Image Payload:  ${(totalOptDesktopAvif / 1024).toFixed(1)} KB (${totalOptDesktopAvif} bytes) -> Save ${(((totalOrig - totalOptDesktopAvif) / totalOrig) * 100).toFixed(1)}%`);
console.log(`- Mobile AVIF Image Payload:   ${(totalOptMobileAvif / 1024).toFixed(1)} KB (${totalOptMobileAvif} bytes) -> Save ${(((totalOrig - totalOptMobileAvif) / totalOrig) * 100).toFixed(1)}%`);
