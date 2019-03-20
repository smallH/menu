module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends":  [
        "eslint:recommended",
        'plugin:react/recommended'
    ],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "off",
            "Tabs"
        ],
        "linebreak-style": [
            "off",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "react/jsx-indent-props": [
            "error", 
            4
        ],
        "react/no-direct-mutation-state": 
            2
        ,
        "no-console": 
            0
        ,
        "no-debugger": 
            2
    }
};