import {
  themeFromSourceColor,
  argbFromHex,
  hexFromArgb,
  TonalPalette
} from '@material/material-color-utilities';
import fs from 'fs';
import path from 'path';

// esm modules do not have a __dirname available by default
const __dirname = path.dirname(new URL(import.meta.url).pathname);

function generateAngularMaterialPalette(sourceColor, paletteName) {
  const theme = themeFromSourceColor(argbFromHex(sourceColor));

  // Get the tonal palettes from the theme
  const primaryPalette = theme.palettes.primary;
  const secondaryPalette = theme.palettes.secondary;
  const neutralPalette = theme.palettes.neutral;
  const neutralVariantPalette = theme.palettes.neutralVariant;

  // Standard M3 tones
  const standardTones = [0, 10, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100];

  // Additional neutral tones (matching Angular Material's structure)
  const neutralExtraTones = [4, 6, 12, 17, 22, 24, 87, 92, 94, 96];

  function generateToneMap(palette, extraTones = []) {
    const allTones = [...standardTones, ...extraTones].sort((a, b) => a - b);

    return allTones.map(tone => {
      const color = hexFromArgb(palette.tone(tone));
      return `    ${tone}: ${color},`;
    }).join('\n');
  }

  const paletteCode = `$${paletteName}-palette: _patch-error-palette((
${generateToneMap(primaryPalette)}
  secondary: (
${generateToneMap(secondaryPalette)}
  ),
  neutral: (
${generateToneMap(neutralPalette, neutralExtraTones)}
  ),
  neutral-variant: (
${generateToneMap(neutralVariantPalette)}
  ),
));`;

  return paletteCode;
}

function generateAllPalettes() {
  const colorConfig = {
    neutral: '#5d5d5d',
    primary: '#38695D',
    secondary: '#7F4BDC',
    success: '#247731',
    info: '#2C708E',
    caution: '#B4851A',
    warning: '#973c00',
    danger: '#FB0721',
  };

  let allPalettes = `@use 'sass:map';
// Generated Angular Material M3 Palettes
// Compatible with Angular Material's palette structure
@use '@angular/material' as mat;

// Helper function (copy from Angular Material source)
@function _patch-error-palette($palette) {
  @return map.merge(
    $palette,
    (
      error: (
        0: #000000,
        10: #410002,
        20: #690005,
        25: #7e0007,
        30: #93000a,
        35: #a80710,
        40: #ba1a1a,
        50: #de3730,
        60: #ff5449,
        70: #ff897d,
        80: #ffb4ab,
        90: #ffdad6,
        95: #ffedea,
        98: #fff8f7,
        99: #fffbff,
        100: #ffffff,
      ),
    )
  );
}

`;

  Object.entries(colorConfig).forEach(([name, color]) => {
    allPalettes += generateAngularMaterialPalette(color, name) + '\n\n';
  });

  return allPalettes;
}

function generateSinglePalette(sourceColor) {
  console.log('Source Color:', sourceColor);
  console.log('Generated Palette:');
  console.log(generateAngularMaterialPalette(sourceColor, 'custom'));
}

function generateInteractivePalette(sourceColor, name) {
  const theme = themeFromSourceColor(argbFromHex(sourceColor));

  // Show color relationships
  console.log(`\n🎨 Generated palette "${name}" from ${sourceColor}:`);
  console.log(`Primary (40): ${hexFromArgb(theme.palettes.primary.tone(40))}`);
  console.log(`Primary Container (90): ${hexFromArgb(theme.palettes.primary.tone(90))}`);
  console.log(`Secondary (40): ${hexFromArgb(theme.palettes.secondary.tone(40))}`);
  console.log(`Neutral Surface (90): ${hexFromArgb(theme.palettes.neutral.tone(90))}`);

  return generateAngularMaterialPalette(sourceColor, name);
}

const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

if (import.meta.url === `file://${process.argv[1]}`) {
  const output = generateAllPalettes();
  const outputPath = path.join(__dirname, '../../projects/shared-ui/src/lib');
  const outputFileName = '_color-palettes.scss';

  ensureDirectoryExists(outputPath);

  fs.writeFileSync(path.join(outputPath, outputFileName), output);
  console.log(`✅ Generated: ${path.join(outputPath, outputFileName)}`);
}

export { generateAngularMaterialPalette, generateAllPalettes, generateSinglePalette };
