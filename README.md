<div align="center">

# vite-plugin-beautify

[![MIT][license.badge]][license] [![npm.badge]][npm] [![bundlephobia.badge]][bundlephobia]

[Vite plugin][vite.plugin] for beautifying build output with [js-beautify]

</div>

> 💡 You shouldn't be beautifying your output. Always minify if possible. But sometimes you just need to, and that's when this plugin comes in handy.

> 💡 Be aware that [vite] does provide a [`minifiy` build option][vite.build.options.minify]. You can turn it off `minify: false`, but the output won't be super legible.

## Table of Contents

- [vite-plugin-beautify](#vite-plugin-beautify)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Configuration](#configuration)
    - [Defaults](#defaults)

## Installation

1. Install the package

   ```bash
   npm install -D vite-plugin-beautify
   ```

   ```bash
   yarn add -D vite-plugin-beautify
   ```

   ```bash
   pnpm add -D vite-plugin-beautify
   ```

2. Add to your `vite.config.ts`

   ```typescript
   // vite.config.ts
   import { defineConfig } from 'vite';
   import beautify from 'vite-plugin-beautify';

   export default defineConfig({
     plugins: [beautify({ inDir: 'build' })],
   });
   ```

## Configuration

### Defaults

`vite-plugin-beautify` provides some sensible defaults options to [js-beautify]. [See them here][defaults].

### Customization

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import beautify from 'vite-plugin-beautify';

export default defineConfig({
  plugins: [
    beautify({
      inDir: 'custom-build-directory',
      html: {
        enabled: false,
      },
      js: {
        glob: 'immutable/**/*.js',
      },
      css: {
        options: {
          indent_size: 4,
        },
      },
    }),
  ],
});
```

> ⚠️ If `options` for [js-beautify] (`JS`, `HTML` / `CSS`) is provided, it'll override instead of being merged with the defaults. To access the default options, use the config resolver callback.

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import beautify from 'vite-plugin-beautify';

export default defineConfig({
  plugins: [
    beautify((defaultConfig) => {
      css: {
        options: {
          ...defaultConfig.css.options,
          indent_size: 4,
        },
      },
    }),
  ],
});
```

<p align="center">
  <a href="https://www.buymeacoffee.com/vnphanquang" target="_blank">
    <img
      src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
      height="60"
      width="217"
      alt="buy vnphanquang a coffee"
    />
  </a>
</p>

[vite]: https://vitejs.dev/
[vite.plugin]: https://vitejs.dev/guide/api-plugin.html
[vite.build.options.minify]: https://vitejs.dev/config/build-options.html#build-minify
[js-beautify]: https://github.com/beautify-web/js-beautify

<!-- heading badge -->

[license.badge]: https://img.shields.io/badge/license-MIT-blue.svg
[license]: ./LICENSE
[npm.badge]: https://img.shields.io/npm/v/vite-plugin-beautify
[npm]: https://www.npmjs.com/package/vite-plugin-beautify
[bundlephobia.badge]: https://img.shields.io/bundlephobia/minzip/vite-plugin-beautify?label=minzipped
[bundlephobia]: https://bundlephobia.com/package/vite-plugin-beautify
[defaults]: https://github.com/vnphanquang/vite-plugin-beautify/blob/main/src/plugin.constants.ts
