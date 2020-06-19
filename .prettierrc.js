module.exports = {
    filepath: 'src',
    parser: 'typescript',
    semi: true,
    trailingComma: 'all',
    bracketSpacing: true,
    singleQuote: true,
    printWidth: 100,
    tabWidth: 4,
    arrowParens: 'always',
    overrides: [
        {
            files: ['*.json', '*.json5'],
            options: { parser: 'json' },
        },
    ],
};
