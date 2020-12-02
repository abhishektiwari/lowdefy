const path = require('path');
const webpack = require('webpack');
const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const packageJson = require('./package.json');

module.exports = {
  entry: './src/shell/index',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist/shell'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          babelrc: false,
          presets: ['@babel/preset-react'],
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/shell/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new ModuleFederationPlugin({
      name: 'lowdefy_web_shell',
      shared: {
        ...packageJson.dependencies,
        react: {
          singleton: true, // only a single version of the shared module is allowed
          requiredVersion: '~17.0.0',
          version: packageJson.dependencies.react,
        },
        'react-dom': {
          singleton: true, // only a single version of the shared module is allowed
          requiredVersion: '~17.0.0',
          version: packageJson.dependencies['react-dom'],
        },
      },
      remotes: {
        lowdefy_renderer: `lowdefy_renderer@https://unpkg.com/@lowdefy/renderer@${packageJson.version}/dist/remoteEntry.js`,
      },
    }),
  ],
};