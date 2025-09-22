const { defineConfig } = require('unocss');
const { presetWind } = require('@unocss/preset-wind');
const path = require('path');

module.exports = defineConfig({
  // @todo(research) this should work but does not so just inject the pattern in the moon task, should be investigated
  // content: {
  //   filesystem: [
  //     path.resolve(__dirname, 'projects/**/*.{html,ts,js}'),
  //   ]
  // },
  blocklist: [
    // colors should come from angular material and not unocss
    /^(bg|text|border|ring|divide|shadow|accent|caret|fill|stroke|placeholder|from|via|to)-.+$/,
  ],
  presets: [presetWind()],
});
