const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: ['./scss/_app.scss'],
  output: {
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.scss'],
  },

  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        // fallback to style-loader in development
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
        {
          loader: 'sass-loader',
          options: {
            includePaths: ['scss/'],
          },
        },
      ],
    }],
  },

  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],
};
