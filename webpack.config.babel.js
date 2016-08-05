/* eslint import/no-extraneous-dependencies: off */

import path from 'path';
import webpack from 'webpack';

const { NODE_ENV } = process.env;
const DEBUG = NODE_ENV === undefined || NODE_ENV === 'development';

export default {
    cache: DEBUG,
    debug: DEBUG,
    devtool: '#source-map',
    entry: './src/browser',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel'],
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css?modules'],
            },
            {
                test: /\.styl$/,
                loaders: ['style', 'css?modules', 'stylus'],
            },
        ],
    },
    output: {
        path: path.join(__dirname, 'dist/js'),
        filename: DEBUG ? 'browser.js' : 'browser.min.js',
    },
    plugins: DEBUG ? [] : [
        new webpack.optimize.UglifyJsPlugin(),
    ],
    resolve: {
        extensions: [
            '',
            '.js',
            '.jsx',
        ],
    },
};
