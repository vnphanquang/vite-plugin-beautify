import type { HTMLBeautifyOptions, JSBeautifyOptions, CSSBeautifyOptions } from 'js-beautify';

import type { PluginConfig } from './plugin.types';

export const DEFAULT_HTML_OPTIONS: HTMLBeautifyOptions = {
  indent_size: 2,
  end_with_newline: true,
  preserve_newlines: false,
  max_preserve_newlines: 0,
  wrap_line_length: 0,
  wrap_attributes_indent_size: 0,
};

export const DEFAULT_CSS_OPTIONS: CSSBeautifyOptions = {
  indent_char: ' ',
  indent_size: 2,
  indent_with_tabs: false,
  end_with_newline: true,
  newline_between_rules: true,
  selector_separator_newline: false,
};

export const DEFAULT_JS_OPTIONS: JSBeautifyOptions = {
  indent_size: 2,
  indent_char: ' ',
  indent_level: 0,
  indent_with_tabs: false,
  preserve_newlines: true,
  space_in_paren: false,
  space_after_anon_function: false,
  brace_style: 'collapse',
  break_chained_methods: false,
  keep_array_indentation: false,
  space_before_conditional: true,
  unescape_strings: false,
  wrap_line_length: 0,
  end_with_newline: true,
  comma_first: false,
};

export const DEFAULT_CONFIG: PluginConfig = {
  inDir: 'build',
  html: {
    enabled: true,
    glob: '**/*.html',
    options: DEFAULT_HTML_OPTIONS,
  },
  js: {
    enabled: true,
    glob: '**/*.js',
    options: DEFAULT_JS_OPTIONS,
  },
  css: {
    enabled: true,
    glob: '**/*.css',
    options: DEFAULT_CSS_OPTIONS,
  },
};
