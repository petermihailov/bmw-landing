const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: ['./src/scss/_app.scss'],
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
  ],
};
