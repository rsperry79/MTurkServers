/* jshint node: true */
'use strict';
const base = require("./webpack.config.base.js");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const BomPlugin = require("webpack-utf8-bom");
const SriPlugin = require('webpack-subresource-integrity');
const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const paths = require('./paths');
const getClientEnvironment = require('./env');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ToBuild = require('./Templates.Development');
const publicPath = paths.servedPath;
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
const publicUrl = publicPath.slice(0, -1);
const env = getClientEnvironment(publicUrl);

const pathsToClean = [
  paths.BuildRoot
];

base.mode = 'production';
base.optimization = {
  minimizer:[
    new UglifyJsPlugin({
      parallel: true,
      uglifyOptions: {
        warnings: false,
        compress: true,
        ecma: 6,
        mangle: true
      }
    })
  ],

  // splitChunks: {
  //     cacheGroups: {
  //         commons: {
  //             test: /[\\/]node_modules[\\/]/,
  //             name: "vendors",
  //             chunks: "all"
  //         }
  //     }
  
  // } 

};

let cleanOptions = {
  allowExternal: true,
  root: __dirname,
  watch: true
};

base.mode = "production";

base.devtool = "";

base.output = {
  crossOriginLoading: 'anonymous',
  publicPath: paths.CDN,
  chunkFilename: '[name].[chunkhash].bundle.js',
  filename: '[name].[chunkhash].bundle.js',
  path: paths.ProductionBuild,
  devtoolModuleFilenameTemplate: info =>
    path
    .relative(paths.appSrc, info.absoluteResourcePath)
    .replace(/\\/g, '/'),
};

ToBuild.forEach(page => {
  base.plugins.push(page);
});

base.plugins.push(
  new UglifyJsPlugin(),
  // remove the BOM 
  new BomPlugin(false),
  //nunjucks transpiler/ inline of bundle
  new CleanWebpackPlugin(pathsToClean, cleanOptions),
  new SriPlugin({
    hashFuncNames: ['sha256', 'sha384'],
    enabled: process.env.NODE_ENV === 'production',
  }),
  new webpack.DefinePlugin(env.stringified),
  // Minify the code.
  new UglifyJsPlugin({
    uglifyOptions: {
      parse: {
        // we want uglify-js to parse ecma 8 code. However we want it to output
        // ecma 5 compliant code, to avoid issues with older browsers, this is
        // whey we put `ecma: 5` to the compress and output section
        // https://github.com/facebook/create-react-app/pull/4234
        ecma: 8,
      },
      compress: {
        ecma: 5,
        warnings: false,
        // Disabled because of an issue with Uglify breaking seemingly valid code:
        // https://github.com/facebook/create-react-app/issues/2376
        // Pending further investigation:
        // https://github.com/mishoo/UglifyJS2/issues/2011
        comparisons: false,
      },
      mangle: {
        safari10: true,
      },
      output: {
        ecma: 5,
        comments: false,
        // Turned on because emoji and regex is not minified properly using default
        // https://github.com/facebook/create-react-app/issues/2488
        ascii_only: true,
      },
    },
    // Use multi-process parallel running to improve the build speed
    // Default number of concurrent runs: os.cpus().length - 1
    parallel: true,
    // Enable file caching
    cache: true,
    sourceMap: shouldUseSourceMap,
  }), // Generate a manifest file which contains a mapping of all asset filenames
  // to their corresponding output file so that tools can pick it up without
  // having to parse `index.html`.
  new ManifestPlugin({
    fileName: 'asset-manifest.json',
  }),
  new ForkTsCheckerWebpackPlugin({
    async: false,
    tsconfig: paths.appTsProdConfig,
    tslint: paths.appTsLint,
  })
);

module.exports = base;

