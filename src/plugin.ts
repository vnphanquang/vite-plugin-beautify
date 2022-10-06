import fs from 'fs';
import path from 'path';

import glob from 'glob';
import beautify from 'js-beautify';
import type { Plugin } from 'vite';

import { DEFAULT_CONFIG } from './plugin.constants';
import { ConfigInput, PluginConfig, PluginFileConfig, PluginSupportedFileType } from './plugin.types';

/**
 * @internal
 */
function executeBeautify<T extends PluginSupportedFileType>(
  type: T,
  inDir: string,
  config: PluginFileConfig<T>,
) {
  const files = glob.sync(path.resolve(process.cwd(), inDir, config.glob));
  files.forEach((file) => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const beautified = beautify[type](content, config.options);
      fs.writeFileSync(file, beautified, 'utf8');
    } catch (error) {
      console.log('\x1b[31m%s\x1b[0m', `      - Failed to beautify "${file}"`);
    }
  });
  return files;
}

/**
 * @internal
 */
export function resolveConfig(input: ConfigInput = {}): PluginConfig {
  const inputConfig = typeof input === 'function' ? input(DEFAULT_CONFIG) : input;

  return {
    inDir: inputConfig.inDir || DEFAULT_CONFIG.inDir,
    html: {
      enabled: inputConfig.html?.enabled ?? DEFAULT_CONFIG.html.enabled,
      glob: inputConfig.html?.glob ?? DEFAULT_CONFIG.html.glob,
      options: inputConfig.html?.options ?? DEFAULT_CONFIG.html.options,
    },
    js: {
      enabled: inputConfig.js?.enabled ?? DEFAULT_CONFIG.js.enabled,
      glob: inputConfig.js?.glob ?? DEFAULT_CONFIG.js.glob,
      options: inputConfig.js?.options ?? DEFAULT_CONFIG.js.options,
    },
    css: {
      enabled: inputConfig.css?.enabled ?? DEFAULT_CONFIG.css.enabled,
      glob: inputConfig.css?.glob ?? DEFAULT_CONFIG.css.glob,
      options: inputConfig.css?.options ?? DEFAULT_CONFIG.css.options,
    },
  };
}

/**
 * Beautify `JS`, `CSS`, `HTML` files in build output using {@link https://github.com/beautify-web/js-beautify js-beautify}
 * @public
 *
 * @param config - the {@link ConfigInput} to configure the plugin
 * @returns vite {@link Plugin}
 */
export const vitePluginBeautify: (config?: ConfigInput) => Plugin = (config = {}) => {
  return {
    name: 'vite-plugin-beautify',
    apply: 'build',
    closeBundle() {
      const rConfig = resolveConfig(config);

      const { inDir, js, html, css } = rConfig;
      console.log('\x1b[36m%s\x1b[0m', `Beautify - "${inDir}" folder`);
      if (!fs.existsSync(inDir)) {
        console.log('\x1b[31m%s\x1b[0m', `  - "${inDir}" folder does not exist!`);
        return;
      }

      console.log('\x1b[32m%s\x1b[0m', '  - Executing beautify tasks:');

      const configs: Array<[PluginSupportedFileType, PluginFileConfig<PluginSupportedFileType>]> = [
        ['js', js],
        ['html', html],
        ['css', css],
      ];
      for (const [type, _config] of configs) {
        if (_config.enabled) {
          const files = executeBeautify(type, inDir, _config);
          console.log(
            '\x1b[32m%s\x1b[0m',
            `    - Beautified ${files.length} [${type.toUpperCase()}] files`,
          );
        }
      }
      console.log('\x1b[32m%s\x1b[0m', '  - Done ✓.');
    },
  };
};
