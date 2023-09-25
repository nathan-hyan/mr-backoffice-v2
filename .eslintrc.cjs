module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'airbnb',
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    overrides: [
        // override "simple-import-sort" config - requires 'eslint-plugin-simple-import-sort'
        {
            files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
            rules: {
                'simple-import-sort/imports': [
                    'warn',
                    {
                        groups: [
                            ['^react', '^@?\\w'],
                            ['^(~|components)(/.*|$)'],
                            ['^\\u0000'],
                            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                            ['^.+\\.?(scss)$', '^.+\\.?(css)$'],
                        ],
                    },
                ],
            },
        },
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
    },
    plugins: ['react', '@typescript-eslint', 'simple-import-sort', 'prettier'],
    rules: {
        'import/prefer-default-export': 0,
        'react/react-in-jsx-scope': 0,
        'react/jsx-props-no-spreading': 0,
        'import/no-extraneous-dependencies': 0,
        'simple-import-sort/imports': 'warn',
        'simple-import-sort/exports': 'error',
        'import/order': 0,
        'import/extensions': [
            'error',
            'never',
            {
                js: 'never',
                svg: 'always',
                scss: 'always',
                png: 'always',
                css: 'always',
                json: 'always',
            },
        ],
    },
    settings: {
        'import/resolver': {
            typescript: {},
        },
    },
};
