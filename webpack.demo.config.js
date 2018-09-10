const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',

    entry: {
        'histogram-slider-demo': ['./demo/src/app/app.ts']
    },

    output: {
        path: path.resolve(__dirname, 'demo'),
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.ts$/,
                include: [/src/],
                loader: 'tslint-loader'
            },
            {
                test: /\.ts$/,
                include: [/src/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: [
                                'angularjs-annotate'
                            ],
                            presets: [
                                [
                                    'env',
                                    {
                                        'targets': {
                                            'browsers': [
                                                'last 2 versions',
                                                'not ie < 11'
                                            ]
                                        }
                                    }
                                ]
                            ]
                        }
                    },
                    {
                        loader: 'ts-loader'
                    }
                ]
            },
            {
                test: /(\.less$)|(\.css$)/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(gif|png|jpg)$/,
                loader: 'file-loader?name=[name].[ext]'
            },
            {
                test: /\.(otf|eot|ttf|woff|woff2|svg)$/,
                loader: 'file-loader?name=[name].[ext]'
            },
            {
                test: /\.tpl.pug$/,
                loader: 'ngtemplate-loader!html-loader!pug-html-loader'
            }
        ]
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: isVendor,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['.js', '.ts']
    },

    devServer: {
        port: 3000,
        contentBase: 'demo',
        historyApiFallback: true
    },

    plugins: [
        new ExtractTextPlugin({filename: '[name].css', disable: false, allChunks: true}),
        new HtmlWebpackPlugin({
            template: 'html-loader!pug-html-loader!demo/src/index.pug'
        })
    ]
};

function isVendor({resource}) {
    return resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/.js$/);
}