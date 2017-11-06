const path = require("path")
const webpack = require("webpack")
const NyanProgressPlugin = require("nyan-progress-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const rootPath = path.resolve(__dirname, ".")
const src = path.join(rootPath, "src")
const dist = path.join(rootPath, "dist")
const nm = path.join(rootPath, "node_modules")

const env = process.env.NODE_ENV.trim()

module.exports = {
	entry: {
		app: path.join(src, "index.tsx"),

		// ================================
		// 框架 / 类库 分离打包
		// ================================
		vendor: [
			"react",
			"react-dom"
		]
	},
	output: {
		path: dist,
		filename: "[name].js",
		chunkFilename: "[id].js"
	},
	devtool: "eval-source-map",
	target: "web",
	resolve: {
		extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
		mainFields: ['browser', 'main'],
		alias: {
			// ================================
			// 自定义路径别名
			// ================================
			SRC: src,
			ASSET: path.join(src, "assets"),
			COMPONENT: path.join(src, "components"),
			PAGE: path.join(src, "pages"),
			SERVICE: path.join(src, "services"),
			UTIL: path.join(src, "utils"),
			VIEW: path.join(src, "views")
		},
	},
	module: {
		rules: [{
			test: /\.tsx?$/,
			use: [
				"react-hot-loader/webpack",
				"babel-loader",
				"awesome-typescript-loader"
			],
			include: src,
			exclude: [/node_modules/, nm]
		}, {
			test: /\.css$/,
			use: [{
				loader: "style-loader"
			}, {
				loader: 'css-loader'
			}, {
				loader: 'postcss-loader'
			}]
		}, {
			test: /\.html$/,
			use: "html-loader"
		}, {
			test: /\.(png|jpe?g|gif|svg)$/,
			loader: "url-loader",
			query: {
				limit: 10240, // 10KB 以下使用 base64
				name: "img/[name]-[hash:6].[ext]"
			}
		}, {
			test: /\.(woff2?|eot|ttf|otf)$/,
			loader: "url-loader?limit=10240&name=fonts/[name]-[hash:6].[ext]"
		}]
	},
	plugins: [
		new NyanProgressPlugin(),
		new webpack.NamedModulesPlugin(),
		new HtmlWebpackPlugin({
			template: path.join(src, "index.html")
		}),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify(env)
			},
			// ================================
			// 配置开发全局常量
			// ================================
			__DEV__: env === "development",
			__PROD__: env === "production",
		})
	],
	devServer: {
		contentBase: src,
		hot: true,
		open: true,
		inline: true,
		historyApiFallback: true,
		port: 4040
	}
};
