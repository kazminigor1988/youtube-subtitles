const path = require('path');

const root = path.resolve(__dirname, '..');

module.exports = {
    entry:  path.resolve(root, 'src', 'index.js'),
    output: {
        path:     path.resolve(root, 'dist'),
        filename: 'main.js'
    }
};
