const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin   = require('vue-loader/lib/plugin')
const TerserPlugin      = require('terser-webpack-plugin')

module.exports = {
    mode:         "production", // "production" | "development" | "none"
    entry:        "./front/main.js",
    module:       {
        rules: [
            {
                test:    /\.js$/,
                loader:  "babel-loader",
                exclude: file => (/node_modules/.test(file) && !/\.vue\.js/.test(file)),
                options: {
                    presets: [
                        [
                            '@babel/preset-env'
                        ]
                    ],
                    plugins: [
                        [
                            '@babel/plugin-transform-runtime',
                            {
                                useESModules: true
                            }
                        ]
                    ]
                }
            },
            {
                test:   /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test:   /\.pug$/,
                loader: 'pug-plain-loader'
            },
            {
                test: /\.less$/,
                use:  [
                    'vue-style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.css$/,
                use:  [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    resolve:      {
        extensions: ['*', '.js', '.vue'],
        mainFiles:  ['index'],
        alias:      {
            components: path.resolve(__dirname, '../components/'),
            lib:        path.resolve(__dirname, '../lib/'),
        }
    },
    plugins:      [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './front/assets/index.html'
        }),
        new VueLoaderPlugin()
    ],
    optimization: {
        usedExports: true,
        minimizer:   [new TerserPlugin({
            parallel:      true,
            terserOptions: {
                ecma: 6,
            },
        })],
    }
};
