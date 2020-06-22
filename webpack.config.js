let path = require("path");
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let VueLoaderPlugin = require("vue-loader/lib/plugin");
let webpack = require('webpack');
let config = {
    mode: "development",
    devtool: "sourcemap",
    entry: {
        main: "./main.js"
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        publicPath: "/dist/",
        filename: "main.js"
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: ["babel-loader"],
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                use: ["vue-loader"]
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: ["css-loader", "less-loader"],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ["css-loader"],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(jpg|png|svg|woff|gif|eot|ttf)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 1024,
                    fallback: 'file-loader'
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new ExtractTextPlugin({
            filename: "main.css",
            allChunks: true
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
}
module.exports = config;