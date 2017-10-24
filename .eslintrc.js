module.exports = {
    "parserOptions": {
        "sourceType": "module",
        "allowImportExportEverywhere": false,
        "codeFrame": false
    },
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "rules":{
        "max-len": ["error", 120, 4],
        "one-var": "off",
        "new-cap": "off",
        "no-invalid-this":"off",
    },
    "extends": "google"
};