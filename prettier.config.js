/** @typedef {import("prettier").Config} PrettierConfig */
/** @typedef {import("prettier-plugin-tailwindcss").PluginOptions} TailwindConfig */

/** @type { PrettierConfig  | TailwindConfig } */
const config = {
  trailingComma: "es5",
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  jsxSingleQuote: false,
  plugins: ["prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: "*.json.hbs",
      options: {
        parser: "json",
      },
    },
    {
      files: "*.js.hbs",
      options: {
        parser: "babel",
      },
    },
  ],
};

export default config;
