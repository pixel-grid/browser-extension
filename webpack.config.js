const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const SriPlugin = require('webpack-subresource-integrity');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';
const isChromeBuild = process.env.TARGET === 'chrome';
const isFirefoxBuild = process.env.TARGET === 'firefox';
const isOperaBuild = process.env.TARGET === 'opera';
const isEdgeBuild = process.env.TARGET === 'edge';

const isOptionsRun = process.env.APP === 'options';
const isDebug = process.argv.indexOf('--debug') !== -1;

module.exports = {
    entry: {
        bundle: path.resolve(__dirname, 'src/index.tsx'),
        browser: path.resolve(__dirname, 'src/_browser/index.ts'),
        background: path.resolve(__dirname, 'src/_browser/background.ts'),
        options: path.resolve(__dirname, 'src/index.options.tsx')
    },

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
        publicPath: '/'
    },

    devtool: isDevelopment ? 'source-map' : undefined,

    devServer: {
        host: '0.0.0.0',
        port: 3000,
        disableHostCheck: true,
        index: !isOptionsRun ? 'index.html' : 'options.html',
        historyApiFallback: {
            index: !isOptionsRun ? 'index.html' : 'options.html',
            rewrites: [
                {
                    from: /./,
                    to: !isOptionsRun ? '/index.html' : '/options.html'
                }
            ]
        },
        open: true,
        contentBase: path.join(__dirname, 'dist')
    },

    module: {
        rules: [
            /**
             * TS
             */
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                include: [
                    path.resolve(__dirname, 'src'),
                    path.resolve(__dirname, 'html')
                ],
                use: {
                    loader: 'ts-loader'
                }
            },

            /**
             * CSS
             */
            {
                test: /\.(css|pcss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',

                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',

                        options: {
                            sourceMap: isDevelopment,
                            plugins: () => require('./webpack.config.postcss')
                        }
                    }
                ]
            },

            /**
             * Media
             */
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',

                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets',
                            publicPath: 'assets',
                            useRelativePath: true
                        }
                    }
                ]
            }
        ]
    },

    resolve: {
        extensions: [
            '.ts',
            '.tsx',
            '.js',
            '.json',
            '.css',
            '.pcss',
            '.png',
            '.jpg',
            '.jpeg',
            '.gif',
            '.svg'
        ],
        alias: { '@': path.resolve(__dirname, 'src') }
    },

    plugins: [
        new CleanWebpackPlugin(),

        /**
         * Env variables
         */
        new webpack.DefinePlugin({
            'process.env.DEBUG': isDebug,
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.TARGET': JSON.stringify(process.env.TARGET),
            'process.env.APP': JSON.stringify(process.env.APP)
        }),

        /**
         * CSS
         */
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        !isDevelopment
            ? new OptimizeCssAssetsPlugin({
                  cssProcessorPluginOptions: {
                      preset: [
                          'default',
                          { discardComments: { removeAll: true } }
                      ]
                  }
              })
            : function() {},

        /**
         * HTML
         */
        new SriPlugin({
            hashFuncNames: ['sha256', 'sha384'],
            enabled: process.env.NODE_ENV === 'production'
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            chunks: ['vendors', 'bundle'],
            hash: true,
            minify: !isDebug
                ? {
                      collapseWhitespace: true,
                      removeComments: true
                  }
                : false
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'options.html',
            chunks: ['vendors', 'options'],
            hash: true,
            minify: !isDebug
                ? {
                      collapseWhitespace: true,
                      removeComments: true
                  }
                : false
        }),

        /**
         * Assets
         */
        new CopyPlugin([{ from: 'assets/', to: 'assets' }]),

        new CopyPlugin([
            {
                from: isChromeBuild
                    ? 'manifest.chrome.json'
                    : isFirefoxBuild
                    ? 'manifest.firefox.json'
                    : isOperaBuild
                    ? 'manifest.opera.json'
                    : isEdgeBuild
                    ? 'manifest.edge.json'
                    : 'manifest.json',
                to: './manifest.json'
            }
        ])
    ]
};
