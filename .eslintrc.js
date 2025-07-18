module.exports = {
    root: true,

    env: {
        node: true,
    },

    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        'plugin:prettier/recommended',
        '@vue/typescript',
    ],

    parserOptions: {
        parser: '@typescript-eslint/parser',
    },

    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-unused-vars': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'vue/no-unused-components': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    },
};
