const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/template/index.html',
        minify: {
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
        }
    })
];