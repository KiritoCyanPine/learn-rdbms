const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: './src/index.ts',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isProduction ? '[name].[contenthash].js' : '[name].js',
            clean: true,
            publicPath: '/'
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.(md|sql)$/,
                    type: 'asset/source'  // Webpack 5 built-in: loads file content as string
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                minify: isProduction ? {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: false
                } : false
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: 'node_modules/sql.js/dist/sql-wasm.wasm',
                        to: 'sql-wasm.wasm'
                    }
                ]
            })
        ],
        devServer: {
            static: [
                {
                    directory: path.join(__dirname, 'dist')
                },
                {
                    directory: path.join(__dirname, 'node_modules/sql.js/dist'),
                    publicPath: '/'
                }
            ],
            compress: true,
            port: 3000,
            hot: true,
            open: true
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            fallback: {
                fs: false,
                path: false,
                crypto: false
            }
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        priority: 10
                    }
                }
            }
        }
    };
};
