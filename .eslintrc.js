module.exports = {
  extends: ['@codingsans/eslint-config/typescript-recommended'],
  rules: {
    complexity: ['error', 12],
  },
  env: {
    node: true
  }
};
