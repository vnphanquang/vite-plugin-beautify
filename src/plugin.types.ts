import type { HTMLBeautifyOptions, JSBeautifyOptions, CSSBeautifyOptions } from 'js-beautify';

/**
 * @public
 * Supported file types for {@link https://github.com/beautify-web/js-beautify js-beautify}
 */
export type PluginSupportedFileType = 'js' | 'html' | 'css';

/**
 * @public
 * Options passed to {@link https://github.com/beautify-web/js-beautify js-beautify}
 */
export type BeautifyOptions<T extends PluginSupportedFileType> = T extends 'js'
  ? JSBeautifyOptions
  : T extends 'html'
  ? HTMLBeautifyOptions
  : T extends 'css'
  ? CSSBeautifyOptions
  : never;

/**
 * @public
 * Config for each file type, including options passed to {@link https://github.com/beautify-web/js-beautify js-beautify}
 */
export interface PluginFileConfig<T extends PluginSupportedFileType> {
  enabled: boolean;
  glob: string;
  options: BeautifyOptions<T>;
}

/**
 * @public
 * Config for the plugin
 */
export interface PluginConfig {
  js: PluginFileConfig<'js'>;
  html: PluginFileConfig<'html'>;
  css: PluginFileConfig<'css'>;
  inDir: string;
}

/**
 * @public
 * The config input. Can be an object or a config resolver callback
 */
export type ConfigInput =
  | Partial<PluginConfig>
  | ((defautlConfig: PluginConfig) => Partial<PluginConfig>);
