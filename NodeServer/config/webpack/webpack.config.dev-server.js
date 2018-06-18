"use strict";
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const errorOverlayMiddleware = require("react-dev-utils/errorOverlayMiddleware");
const noopServiceWorkerMiddleware = require("react-dev-utils/noopServiceWorkerMiddleware");
const ignoredFiles = require("react-dev-utils/ignoredFiles");
const config = require("./webpack.config.development");
const paths = require("../misc/paths");

const host = process.env.HOST || "0.0.0.0";
const port = 3000;
config.plugins.push(
    new BrowserSyncPlugin(
        // BrowserSync options
        {
            quiet: true,
            host: host,
            port: 3100,
            proxy: `http://${host}:${port}/${paths.StartPage}`
        }
    )
);


module.exports = function(proxy, allowedHost) {
    return {
        disableHostCheck: !proxy ||
            process.env.DANGEROUSLY_DISABLE_HOST_CHECK === "true",
        compress: false,
        clientLogLevel: "none",
        contentBase: paths.devServerTrueRoot,
        // By default files from `contentBase` will not trigger a page reload.
        watchContentBase: true,
        // Enable hot reloading server. It will provide /sockjs-node/ endpoint
        // for the WebpackDevServer client so it can learn when the files were
        // updated. The WebpackDevServer client is included as an entry point
        // in the Webpack development configuration. Note that only changes
        // to CSS are currently hot reloaded. JS changes will refresh the browser.
        hot: true,

        publicPath: "",

        quiet: true,

        watchOptions: {
            ignored: ignoredFiles(paths.appSrc),
        },
        // Enable HTTPS if the HTTPS environment variable is set to 'true'

        port: port,
        host: host,
        overlay: false,
        historyApiFallback: {
            // See https://github.com/facebookincubator/create-react-app/issues/387.
            disableDotRule: true,
        },
        public: allowedHost,
        proxy,
        before(app) {
            // This lets us open files from the runtime error overlay.
            app.use(errorOverlayMiddleware());
            // This service worker file is effectively a 'no-op' that will reset any
            // previous service worker registered for the same host:port combination.
            // We do this in development to avoid hitting the production cache if
            // it used the same host and port.
            // https://github.com/facebookincubator/create-react-app/issues/2272#issuecomment-302832432
            app.use(noopServiceWorkerMiddleware());
        },
    };
};