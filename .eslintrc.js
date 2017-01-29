module.exports = {
    'parser': 'babel-eslint',
    'env': {
        'node': true,
        'jasmine': true,
        'es6': true,
    },
    'extends': 'airbnb-base',
    'rules': {
        'max-len': ['error', 100, 2, {
            ignoreUrls: true,
            ignoreTrailingComments: true,
            ignoreTemplateLiterals: true,
            ignoreRegExpLiterals: true
        }],
        'import/no-extraneous-dependencies': ['error', {
            'devDependencies': ["**/*Spec.js"]
        }],
    }
};
