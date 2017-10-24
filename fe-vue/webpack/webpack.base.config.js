const path = require('path');
module.exports = {
    entry: path.resolve(__dirname, '../src/app.js'),
    output: {
        path: path.resolve(__dirname, '../build'),
        publicPath: '../build',
        filenam: 'bundle,[hash].js',
        chunkFilename: '',
    },
};
