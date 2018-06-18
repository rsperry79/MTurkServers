const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = [
    new HtmlWebpackPlugin({
        filename: "index.html",
        
        template: "./src/template/index.html",

    }),
];