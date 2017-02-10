const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Webpack constants
const METADATA = {
    title: 'Jivaro Angular Web Components',
    baseUrl: '/',
};

module.exports = function (component) {
    if (!process.env.COMPONENT) {
        console.log('Please provide env.COMPONENT variable');
        return;
    }

    return {
        entry: {
            'vendor': `./src/web-components/${component}/app/vendor.js`,
            [component]: `./src/web-components/${component}/app/app.module.js`
        },

        resolve: {
            extensions: ['', '.js', '.json']
        },

        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015', 'stage-0'],
                        plugins: ['transform-runtime']
                    }
                },
                {
                    test: /\.html$/,
                    loader: 'raw'
                },
                {
                    test: /\.json$/,
                    loader: 'json-laoder'
                },
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract(
                        'style-loader',
                        'css-loader'
                    )
                },
                {
                    test: /\.less$/,
                    exclude: /node_modules/,
                    loader: ExtractTextPlugin.extract(
                        'style-loader',
                        'css-loader!less-loader'
                    )
                }
            ]
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: `./src/web-components/${component}/index.html`,
                inject: 'body',
                hash: true,
                title: METADATA.title,
                metadata: METADATA
            }),
            new ExtractTextPlugin('[name].css')
        ]
    }
};