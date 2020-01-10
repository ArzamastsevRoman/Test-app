const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); 
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    entry: {
        main: './src/pages/scripts/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './[name]/[name].[chunkhash].js'
    },
    resolve: {
        alias: {
          'super-helpers': path.resolve(__dirname, './src/helpers')
        }
    },
    resolve: {
        alias: {
          'super-helpers': path.resolve(__dirname, './src/helpers')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/, 
                use: [
                    (isDev ? 'style-loader' : {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    }),
                    'css-loader', 
                    'postcss-loader'
                ] 
            },
            {
                test: /\.(png|jpe?g|gif|ico|svg)$/i,
                use: [
                  'file-loader?name=./images/[name].[ext]',
                  {
                    loader: 'image-webpack-loader',
                    options: {
                      bypassOnDebug: true,
                      disable: true
                    }
                  }
                ]
              },
              {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'file-loader?name=./fonts/[name].[ext]'
              }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './[name]/[name].[contenthash].css'
        }),
        new HtmlWebpackPlugin({ 
            inject: false,
            template: './src/index.html',
            filename: 'index.html'
        }),
        new WebpackMd5Hash(),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default'],
            },
            canPrint: true
        })
    ]
};