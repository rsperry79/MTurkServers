const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
    new HtmlWebpackPlugin({
        title: 'HitApp',
        inject: true,
        chunks: ['MultiPassageRating',  'vendor'],
        filename: "MultiPassageRating.html",
        template: "nunjucks-html-loader!src/MTurkHitappTemplates/MultiPassage.njk",
        mobile: false,
        lang: 'en-US',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),

]