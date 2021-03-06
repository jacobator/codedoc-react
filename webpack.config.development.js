/* eslint strict: 0 */
'use strict';

const webpack = require('webpack');
const webpackTargetElectronRenderer = require('webpack-target-electron-renderer');
const baseConfig = require('./webpack.config.base');


const config = Object.create(baseConfig);

config.debug = true;

config.devtool = 'cheap-module-eval-source-map';

config.entry = [
	'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
	'./app/index'
];

config.output.publicPath = 'http://localhost:3000/dist/';

config.module.loaders.push({
	test: /^((?!\.module).)*\.css$/,
	loaders: [
		'style-loader',
		'css-loader'
	]
}, {
	test: /\.module\.css$/,
	loaders: [
		'style-loader',
		'css-loader'
	]
},
{
	test: /\.json$/,
	loader: 'json-loader',
}, {
	test: /\.txt$/,
	loader: 'raw-loader',
}, {
	test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
	loader: 'url-loader?limit=10000',
}, {
	test: /\.(eot|ttf|wav|mp3)$/,
	loader: 'file-loader',
});


config.plugins.push(
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin(),
	new webpack.DefinePlugin({
		'__DEV__': true,
		'process.env': {
			'NODE_ENV': JSON.stringify('development')
		}
	})
);

config.target = webpackTargetElectronRenderer(config);

module.exports = config;
