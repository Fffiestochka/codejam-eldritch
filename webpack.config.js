// Generated using webpack-cli https://github.com/webpack/webpack-cli
// const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';

// const stylesHandler = isProduction
  // ? MiniCssExtractPlugin.loader
//   : 'style-loader';

const config = {
  mode: isProduction ? 'production' : 'development',
  entry: ['./src/index.js', './src/sass/style.scss'],
  devtool: isProduction ? 'none' : 'source-map',
  watch: !isProduction,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'script.js',
  },
  devServer: {
    open: true,
    host: 'localhost',
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!.git'],
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: ['/node_modules/'],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpg|svg|jpe?g|gif)$/,
        type: 'asset/resource', //! теперь хорошо работает!
        // use: [
        //   {
        //     loader: 'file-loader',
        //   },
        // ],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },

      // {
      //   test: /\.html$/,
      //   type: 'asset/resource',
      //   // generator: {
      //   //   filename: '[name][ext]',
      //   // },
      // },
      // {
      //   test: /\.html$/i,
      //   use: ['html-loader'],
      // },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';

    config.plugins.push(new MiniCssExtractPlugin());
  } else {
    config.mode = 'development';
  }
  return config;
};
