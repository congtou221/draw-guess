var webpack = require('webpack');
var path = require('path');

var ROOT_PATH = __dirname;
var BUILD_PATH = path.join(ROOT_PATH, 'dist');

module.exports = {
	// 插件项
	plugins: [],
	// 页面入口文件配置
	entry: {
		index: './client/script/index.js'
	},
	// 入口文件输出配置
	output: {
		path: BUILD_PATH,
		filename: 'bundle.js'
	},
	module: {
		// 加载器配置
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader?presets[]=es2015,presets[]=react'
			},		
			{
				test: /\.vue$/,
				loader: 'vue'
			}
		]
	}
}