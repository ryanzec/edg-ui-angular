import { themeFromSourceColor, argbFromHex, hexFromArgb } from '@material/material-color-utilities';
import fs from 'fs';
import path from 'path';

// esm modules do not have a __dirname available by default
const __dirname = path.dirname(new URL(import.meta.url).pathname);

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

const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

function generateSCSSVariables(sourceColor, name) {
  const theme = themeFromSourceColor(argbFromHex(sourceColor));

  const lightScheme = theme.schemes.light;
  const darkScheme = theme.schemes.dark;

  return `
// ${name.toUpperCase()} SCSS Variables - Generated from ${sourceColor}
$${name}-palette: (
  primary: ${hexFromArgb(lightScheme.primary)},
  on-primary: ${hexFromArgb(lightScheme.onPrimary)},
  primary-container: ${hexFromArgb(lightScheme.primaryContainer)},
  on-primary-container: ${hexFromArgb(lightScheme.onPrimaryContainer)},
  primary-fixed: ${hexFromArgb(lightScheme.primaryFixed)},
  primary-fixed-dim: ${hexFromArgb(lightScheme.primaryFixedDim)},
  on-primary-fixed: ${hexFromArgb(lightScheme.onPrimaryFixed)},
  on-primary-fixed-variant: ${hexFromArgb(lightScheme.onPrimaryFixedVariant)},

  secondary: ${hexFromArgb(lightScheme.secondary)},
  on-secondary: ${hexFromArgb(lightScheme.onSecondary)},
  secondary-container: ${hexFromArgb(lightScheme.secondaryContainer)},
  on-secondary-container: ${hexFromArgb(lightScheme.onSecondaryContainer)},
  secondary-fixed: ${hexFromArgb(lightScheme.secondaryFixed)},
  secondary-fixed-dim: ${hexFromArgb(lightScheme.secondaryFixedDim)},
  on-secondary-fixed: ${hexFromArgb(lightScheme.onSecondaryFixed)},
  on-secondary-fixed-variant: ${hexFromArgb(lightScheme.onSecondaryFixedVariant)},

  tertiary: ${hexFromArgb(lightScheme.tertiary)},
  on-tertiary: ${hexFromArgb(lightScheme.onTertiary)},
  tertiary-container: ${hexFromArgb(lightScheme.tertiaryContainer)},
  on-tertiary-container: ${hexFromArgb(lightScheme.onTertiaryContainer)},
  tertiary-fixed: ${hexFromArgb(lightScheme.tertiaryFixed)},
  tertiary-fixed-dim: ${hexFromArgb(lightScheme.tertiaryFixedDim)},
  on-tertiary-fixed: ${hexFromArgb(lightScheme.onTertiaryFixed)},
  on-tertiary-fixed-variant: ${hexFromArgb(lightScheme.onTertiaryFixedVariant)},

  error: ${hexFromArgb(lightScheme.error)},
  on-error: ${hexFromArgb(lightScheme.onError)},
  error-container: ${hexFromArgb(lightScheme.errorContainer)},
  on-error-container: ${hexFromArgb(lightScheme.onErrorContainer)},

  surface: ${hexFromArgb(lightScheme.surface)},
  on-surface: ${hexFromArgb(lightScheme.onSurface)},
  surface-variant: ${hexFromArgb(lightScheme.surfaceVariant)},
  on-surface-variant: ${hexFromArgb(lightScheme.onSurfaceVariant)},
  surface-container-lowest: ${hexFromArgb(lightScheme.surfaceContainerLowest)},
  surface-container-low: ${hexFromArgb(lightScheme.surfaceContainerLow)},
  surface-container: ${hexFromArgb(lightScheme.surfaceContainer)},
  surface-container-high: ${hexFromArgb(lightScheme.surfaceContainerHigh)},
  surface-container-highest: ${hexFromArgb(lightScheme.surfaceContainerHighest)},
  surface-dim: ${hexFromArgb(lightScheme.surfaceDim)},
  surface-bright: ${hexFromArgb(lightScheme.surfaceBright)},

  inverse-surface: ${hexFromArgb(lightScheme.inverseSurface)},
  on-inverse-surface: ${hexFromArgb(lightScheme.inverseOnSurface)},
  inverse-primary: ${hexFromArgb(lightScheme.inversePrimary)},

  outline: ${hexFromArgb(lightScheme.outline)},
  outline-variant: ${hexFromArgb(lightScheme.outlineVariant)},

  shadow: ${hexFromArgb(lightScheme.shadow)},
  scrim: ${hexFromArgb(lightScheme.scrim)},
  surface-tint: ${hexFromArgb(lightScheme.surfaceTint)},
);

$${name}-palette-dark: (
  primary: ${hexFromArgb(darkScheme.primary)},
  on-primary: ${hexFromArgb(darkScheme.onPrimary)},
  primary-container: ${hexFromArgb(darkScheme.primaryContainer)},
  on-primary-container: ${hexFromArgb(darkScheme.onPrimaryContainer)},
  primary-fixed: ${hexFromArgb(darkScheme.primaryFixed)},
  primary-fixed-dim: ${hexFromArgb(darkScheme.primaryFixedDim)},
  on-primary-fixed: ${hexFromArgb(darkScheme.onPrimaryFixed)},
  on-primary-fixed-variant: ${hexFromArgb(darkScheme.onPrimaryFixedVariant)},

  secondary: ${hexFromArgb(darkScheme.secondary)},
  on-secondary: ${hexFromArgb(darkScheme.onSecondary)},
  secondary-container: ${hexFromArgb(darkScheme.secondaryContainer)},
  on-secondary-container: ${hexFromArgb(darkScheme.onSecondaryContainer)},
  secondary-fixed: ${hexFromArgb(darkScheme.secondaryFixed)},
  secondary-fixed-dim: ${hexFromArgb(darkScheme.secondaryFixedDim)},
  on-secondary-fixed: ${hexFromArgb(darkScheme.onSecondaryFixed)},
  on-secondary-fixed-variant: ${hexFromArgb(darkScheme.onSecondaryFixedVariant)},

  tertiary: ${hexFromArgb(darkScheme.tertiary)},
  on-tertiary: ${hexFromArgb(darkScheme.onTertiary)},
  tertiary-container: ${hexFromArgb(darkScheme.tertiaryContainer)},
  on-tertiary-container: ${hexFromArgb(darkScheme.onTertiaryContainer)},
  tertiary-fixed: ${hexFromArgb(darkScheme.tertiaryFixed)},
  tertiary-fixed-dim: ${hexFromArgb(darkScheme.tertiaryFixedDim)},
  on-tertiary-fixed: ${hexFromArgb(darkScheme.onTertiaryFixed)},
  on-tertiary-fixed-variant: ${hexFromArgb(darkScheme.onTertiaryFixedVariant)},

  error: ${hexFromArgb(darkScheme.error)},
  on-error: ${hexFromArgb(darkScheme.onError)},
  error-container: ${hexFromArgb(darkScheme.errorContainer)},
  on-error-container: ${hexFromArgb(darkScheme.onErrorContainer)},

  surface: ${hexFromArgb(darkScheme.surface)},
  on-surface: ${hexFromArgb(darkScheme.onSurface)},
  surface-variant: ${hexFromArgb(darkScheme.surfaceVariant)},
  on-surface-variant: ${hexFromArgb(darkScheme.onSurfaceVariant)},
  surface-container-lowest: ${hexFromArgb(darkScheme.surfaceContainerLowest)},
  surface-container-low: ${hexFromArgb(darkScheme.surfaceContainerLow)},
  surface-container: ${hexFromArgb(darkScheme.surfaceContainer)},
  surface-container-high: ${hexFromArgb(darkScheme.surfaceContainerHigh)},
  surface-container-highest: ${hexFromArgb(darkScheme.surfaceContainerHighest)},
  surface-dim: ${hexFromArgb(darkScheme.surfaceDim)},
  surface-bright: ${hexFromArgb(darkScheme.surfaceBright)},

  inverse-surface: ${hexFromArgb(darkScheme.inverseSurface)},
  on-inverse-surface: ${hexFromArgb(darkScheme.inverseOnSurface)},
  inverse-primary: ${hexFromArgb(darkScheme.inversePrimary)},

  outline: ${hexFromArgb(darkScheme.outline)},
  outline-variant: ${hexFromArgb(darkScheme.outlineVariant)},

  shadow: ${hexFromArgb(darkScheme.shadow)},
  scrim: ${hexFromArgb(darkScheme.scrim)},
  surface-tint: ${hexFromArgb(darkScheme.surfaceTint)},
);
`;
}

// Generate all themes
function generateAllThemes() {
  let allSCSS = '// Generated M3 SCSS Variables\n';

  Object.entries(colorConfig).forEach(([name, color]) => {
    allSCSS += generateSCSSVariables(color, name);
  });

  const outputDir = path.join(__dirname, '../../projects/shared-ui/src/lib');
  const outputFileName = '_theme-overrides.scss';

  ensureDirectoryExists(outputDir);

  fs.writeFileSync(path.join(outputDir, outputFileName), allSCSS);

  console.log('✅ Generated themes:');
  console.log(path.join(outputDir, outputFileName));
}

// Run generation
generateAllThemes();
