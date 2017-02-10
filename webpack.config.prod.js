const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.common');

// Webpack constants
const ENV = process.env.ENV = process.env.NODE_ENV = 'production';
const HOST = process.env.HOST || '';
const PORT = process.env.PORT || 8080;
const API_URL = process.env.API_URL || '/api/handgroups/';

const METADATA = webpackMerge(commonConfig(process.env.COMPONENT).metadata, {
    host: HOST,
    port: PORT,
    apiUrl: API_URL,
    ENV: ENV
});

module.exports = webpackMerge.smart(commonConfig(process.env.COMPONENT), {
    output: {
        filename: '[name].js',
        publicPath: '/dist',
        path: path.resolve(__dirname, 'dist')
    },

    module: {
        loaders: [
            {
                test: /\.svg$/,
                include: path.resolve(__dirname, 'src/assets/images/deck-cards'),
                loader: 'file-loader?name=/assets/images/[hash].[ext]'
            },
            {
                test: /\.(otf|eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
                include: path.resolve(__dirname, 'src/assets/font-awesome'),
                loader: 'file-loader?name=/assets/fonts/[hash].[ext]'
            }
        ]
    },

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(METADATA.ENV),
                'NODE_ENV': JSON.stringify(METADATA.ENV),
                'HOST': JSON.stringify(METADATA.host),
                'PORT': JSON.stringify(METADATA.port),
                'API_URL': JSON.stringify(METADATA.apiUrl)
            }
        })
    ]
});