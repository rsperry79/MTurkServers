const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
    new HtmlWebpackPlugin({
        inject: true,
        chunks: ['MultiPassageRating', 'vendor'],
        filename: "MultiPassageRating.html",
        template: "nunjucks-html-loader!src/MTurkHitappTemplates/MultiPassage.njk",
      }),


]