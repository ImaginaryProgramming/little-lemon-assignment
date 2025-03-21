module.exports = {
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: 2021, // Or a later version if you're using newer features
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    requireConfigFile: false, // Important: Prevents issues if you don't have a separate Babel config
    babelOptions: {
      //This is needed for parsing things like optional chaining
      presets: ["@babel/preset-react"],
    },
  },
  env: {
    browser: true,
    es2021: true,
    "react-native/react-native": true, // Enables React Native specific environment
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-native/all",
    "plugin:import/errors", // For import-related errors
    "plugin:import/warnings", // For import-related warnings
  ],
  plugins: ["react", "react-native", "import"],
  rules: {
    // --- Core Rules (adjust to your preferences) ---
    "no-unused-vars": "warn", // Warn about unused variables (VERY IMPORTANT)
    "no-console": "warn", // Warn about console.log statements (usually for debugging)

    // --- React Rules ---
    "react/prop-types": "off", // Disable prop-types checking (if you're not using them)
    "react/react-in-jsx-scope": "off", // React 17+ doesn't require importing React in every file

    // --- React Native ---
    "react-native/no-unused-styles": 2,
    "react-native/split-platform-components": 2,
    "react-native/no-inline-styles": 2,
    "react-native/no-color-literals": 2,
    "react-native/no-raw-text": 2,
    "react-native/no-single-element-style-arrays": 2,

    // --- Import Rules ---
    "import/no-unresolved": "error", // Ensures imported modules can be resolved (CRITICAL)
    "import/named": "error", // Ensures named exports exist
    "import/namespace": "error", // Ensures namespace imports are valid
    "import/default": "error", // Ensures default exports exist
    "import/export": "error", // Ensures you're not exporting something invalid
  },
  settings: {
    react: {
      version: "detect", // Automatically detect the React version
    },
    "import/resolver": {
      //This section helps to resolve the imports.
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"], // Add .ts and .tsx if you use TypeScript
        moduleDirectory: ["node_modules", "src/"], // Adjust 'src/' if your source files are elsewhere
      },
    },
  },
};
