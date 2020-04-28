module.exports = {
  env: {
    es6: true,
    node: true,
    mocha: true
  },
  extends: [
    'standard',
    'plugin:chai-friendly/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'chai-friendly'
  ]
}
