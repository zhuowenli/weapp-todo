/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */
'use strict';

module.exports = {
    extends: 'standard',
    "env": {
        "browser": false,
        "es6": true
    },
    plugins: [
        'standard',
        'promise',
        'json'
    ],
    globals: {
        App: true,
        Page: true,
        getApp: true,
        wx: true,
    },
    rules: {
        indent: ["error", 4],
        'space-before-function-paren': ["error", "never"],
        'import/no-unresolved': [0, {commonjs: true, amd: true}],
        'consistent-return': 0,
        'comma-dangle': ["error", "only-multiline"],
        'no-console': 0,
        semi: 0,
    }
};
