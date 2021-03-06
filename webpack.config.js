const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [
    './node_modules/intersection-observer/intersection-observer.js',
    './src/js/index.js',
    './node_modules/glider-js/glider.min.css',
    './node_modules/photoswipe/dist/photoswipe.css',
    './node_modules/photoswipe/dist/default-skin/default-skin.css',
    './src/scss/index.scss',
  ],
  output: {
    path: path.resolve(__dirname, 'docs'),
  },

  resolve: {
    extensions: ['.js', '.scss', '.twig'],
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env',
              {
                useBuiltIns: 'usage',
              },
            ],
          ],
        },
      },
    }, {
      test: /\.s?css$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            url: false,
          },
        },
        'postcss-loader',
        {
          loader: 'sass-loader',
          options: {
            includePaths: ['/src/scss/'],
            sourceMap: true,
            sourceMapContents: false,
          },
        },
      ],
    }, {
      test: /\.twig$/,
      loader: 'twig-loader',
    }],
  },

  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', {discardComments: {removeAll: true}}],
        },
      }),
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/twig/index.twig',
      inject: true,
      hash: true,
    }),
    new CleanWebpackPlugin('./docs'),
    new CopyWebpackPlugin([{from: './src/assets', to: 'assets'}]),
  ],
};
