const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const { resolve } = require('path');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: [
        './index.tsx',
        './styles/base.scss'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: '/',
    },
    devServer: {
        historyApiFallback: true
    },
    resolve: {
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx",".scss"],
        mainFields: ["module", "browser", "main"],
        alias: {
            "@actions": resolve(__dirname, "src/actions"),
            "@assets": resolve(__dirname, "src/assets"),
            "@components": resolve(__dirname, "src/components"),
            "@basecomponents": resolve(__dirname, "src/basecomponents"),
            "@constants": resolve(__dirname, "src/constants"),
            "@middleware": resolve(__dirname, "src/middleware"),
            "@models": resolve(__dirname, "src/models"),
            "@reducers": resolve(__dirname, "src/reducers"),
            "@services": resolve(__dirname, "src/services"),
            "@promises": resolve(__dirname, "src/services/promises"),
            "@store": resolve(__dirname, "src/store"),
            "@styles": resolve(__dirname, "src/styles"),
            "@views": resolve(__dirname, "src/views"),
            "@utils": resolve(__dirname, "src/utils")
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader','sass-loader'],
            },
            {
                test: /\.(png|j?g|svg|gif)?$/,
                use: 'file-loader'
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|gif|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/'
                        }
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{ loader: 'url-loader?limit=15000&name=fonts/[hash].[ext]' }]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: 'index.html',
            filename: 'index.html'
        })
    ]
};