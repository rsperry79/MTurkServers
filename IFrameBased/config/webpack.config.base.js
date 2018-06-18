/* jshint node: true */
const path = require("path");
const excludePath = /(node_modules|bower_components)/;
var FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
var DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const paths = require('./paths');
const webpack = require("webpack");
const EntryPoints = require('./Templates.EntryPoints');

module.exports = {
  entry: EntryPoints,
  devtool: 'source-map',
  resolve: {
  
    extensions: [
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      ".njk",
      ".nunjucks"
    ]
  },

  module: {
    strictExportPresence: true,
    rules: [
 
      {
        // "oneOf" will traverse all following loaders until one will
        // match the requirements. When no loader matches it will fall
        // back to the "file" loader at the end of the loader list.
        oneOf: [{
            exclude: [
              /\.html$|njk|nunjucks/,
              /\.(js|jsx)$/,
              /\.(ts|tsx)$/,
              /\.css$/,
              /\.json$/,
              /\.svg$/,
              /\.scss|.css$/
            ],
            loader: 'url-loader',
            query: {
              limit: 10000,
              name: '[name].[hash:8].[ext]'
            }
          },

          //scss loader
          {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
          },
          // nunjucks loader
          {
            test: /\.html$|njk|nunjucks/,
            use: [
              "html-loader", {
                loader: "nunjucks-html-loader",
                options: {

                  searchPaths: ["./src/MTurkHitappTemplates"]
                }
              }
            ]
          },
          //typescript loader
          {
            test: /\.(ts|tsx)$/,
            include: paths.appSrc,
            use: [{
              loader: require.resolve('ts-loader'),
              options: {
                // disable type checker - we will use it in fork plugin
                  configFile: paths.appTsProdConfig
              },
            }, ],
          },
          //js - babel loader
          {
            test: /\.js$/,
            include: path.join(__dirname, "/src/js"),
            loader: "babel-loader",
            query: {
              presets: ["es5"]
            }
          },
          {
            test: /\.json$/,
            loader: 'json-loader'
          },
          // "file" loader makes sure assets end up in the `build` folder.
          // When you `import` an asset, you get its filename.
          // This loader doesn't use a "test" so it will catch all modules
          // that fall through the other loaders.
          {
            loader: require.resolve('file-loader'),
            // Exclude `js` files to keep "css" loader working as it injects
            // it's runtime that would otherwise processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          // ** STOP ** Are you adding a new loader?
          // Make sure to add the new loader(s) before the "file" loader.
        ],
      },
    ],
  },
  plugins: [
    new DuplicatePackageCheckerPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new CaseSensitivePathsPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })

  ]
};
