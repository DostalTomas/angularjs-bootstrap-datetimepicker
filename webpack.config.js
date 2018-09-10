const path = require('path');

const ExtractTextPlugin =  require('extract-text-webpack-plugin');
const  CleanWebpackPlugin =  require('clean-webpack-plugin');

module.exports = {
    mode: 'production',

    entry: {
        datetimepicker: ['./src/js/datetimepicker.module.js']
    },

    output: {
        // eslint-disable-next-line no-undef
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',

        library: 'angularjs-bootstrap-datetimepicker',
        libraryTarget: 'umd'
    },

    module: {
        rules: [
            /*{
                enforce: 'pre',
                test: /\.js$/,
                exclude: [/node_modules/],
                loader: 'eslint-loader'
            },*/

            {
                test: /\.js$/,
                include: /(angularjs-bootstrap-datetimepicker\/src)|(angularjs-register)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        'plugins': [
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-proposal-object-rest-spread',
                            'angularjs-annotate'
                        ],
                        'presets': [
                            [
                                'env',
                                {
                                    'targets': {
                                        'browsers': [
                                            'last 2 versions',
                                            'IE 11'
                                        ]
                                    }
                                }
                            ]
                        ]
                    }
                }]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.tpl\.pug$/,
                loader: `ngtemplate-loader?relativeTo=${path.resolve(__dirname, 'src')}!html-loader!pug-html-loader`
            }
        ]
    },

    externals: {
        angular: 'angular',
        luxon: 'luxon',
        'angularjs-register': 'angularjs-register'
    },

    devtool: 'source-map',

    plugins: [
        new ExtractTextPlugin({filename: '[name].css', disable: false, allChunks: true}),
        new CleanWebpackPlugin(
            ['dist/*.*'],
            {
                root: path.resolve(__dirname),
                verbose: true,
                exclude: ['.gitkeep']
            }
        )
    ]
};