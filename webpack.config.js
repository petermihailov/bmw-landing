const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [
    './src/scss/_app.scss',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.scss', '.twig'],
  },

  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        // fallback to style-loader in development
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
      options: {
        // See options section below
      },
    }],
  },

  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/templates/index.twig',
      inject: true,
      hash: true,
    }),
    new CleanWebpackPlugin('./dist'),
    new CopyWebpackPlugin([{from: './src/assets', to: 'assets'}]),
  ],
};
