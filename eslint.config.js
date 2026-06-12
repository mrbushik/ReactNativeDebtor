const { defineConfig, globalIgnores } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  globalIgnores([".expo/**", ".tmp/**", ".tsbuild/**", "node_modules/**"]),
  expoConfig,
  {
    rules: {
      "import/no-named-as-default-member": "off",
    },
  },
]);
