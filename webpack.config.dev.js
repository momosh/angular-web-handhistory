const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.common');

// Webpack constants
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const API_URL = process.env.API_URL || 'http://www.dev.jivaro.com:3031/handgroups/58469919b95ff5581ff414bc';

const METADATA = webpackMerge(commonConfig(process.env.COMPONENT).metadata, {
    host: HOST,
    port: PORT,
    apiUrl: API_URL,
    ENV: ENV
});

module.exports = webpackMerge.smart(commonConfig(process.env.COMPONENT), {
    output: {
        filename: '[name].bundle.js',
        publicPath: '/client',
        path: path.resolve(__dirname, 'client')
    },

    module: {
        loaders: [
            {
                test: /\.svg$/,
                include: path.resolve(__dirname, 'src/assets/images/deck-cards'),
                loader: 'file-loader?name=/assets/images/deck-cards/[name].[ext]'
            },
            {
                test: /\.(otf|eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
                include: path.resolve(__dirname, 'src/assets/font-awesome'),
                loader: 'file-loader?name=/assets/fonts/[name].[ext]'
            }
        ]
    },

    plugins: [
        // Adds webpack HMR support. It act's like livereload,
        // reloading page after webpack rebuilt modules.
        // It also updates stylesheets and inline assets without page reloading.
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(METADATA.ENV),
                'NODE_ENV': JSON.stringify(METADATA.ENV),
                'HOST': JSON.stringify(METADATA.host),
                'PORT': JSON.stringify(METADATA.port),
                'API_URL': JSON.stringify(METADATA.apiUrl)
            }
        })
    ],

    // Webpack Dev Server config
    devServer: {
        port: METADATA.port,
        host: METADATA.host,
        historyApiFallback: true,
        contentBase: "./client",
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    },

    // Fix for the ES6-shim
    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
});