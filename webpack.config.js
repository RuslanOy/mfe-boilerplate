const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (_, argv) => {
  const isProd = argv.mode === 'production';

  // if its host app use this config, if not just delete
  // const headerRemote = 'header@https://ruslanoy.github.io/mfe-header/remoteEntry.js'
  // const footerRemote = 'footer@https://ruslanoy.github.io/mfe-footer/remoteEntry.js'

  const publicPath = isProd ? './' : 'http://localhost:3000/';

  return {
    mode: isProd ? 'production' : 'development',
    entry: './src/app/bootstrap.js',
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        app: path.resolve(__dirname, 'src/app'),
        entities: path.resolve(__dirname, 'src/entities'),
        features: path.resolve(__dirname, 'src/features'),
        pages: path.resolve(__dirname, 'src/pages'),
        shared: path.resolve(__dirname, 'src/shared'),
        widgets: path.resolve(__dirname, 'src/widgets'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProd ? '[name].[contenthash].js' : '[name].js',
      // publicPath,
      publicPath: 'auto',
      clean: true,
    },
    devtool: isProd ? false : 'eval-source-map',
    devServer: !isProd
      ? {
          port: 3000,
          hot: true,
          historyApiFallback: true,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods':
              'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers':
              'X-Requested-With, content-type, Authorization',
          },
        }
      : undefined,
    optimization: {
      minimize: isProd,
      splitChunks: isProd ? { chunks: 'all' } : undefined,
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'boilerplate',
        filename: 'remoteEntry.js',
        exposes: {
          './app': './src/app',
          './Main': './src/app/Main.tsx',
        },
        // if its host app use this config, if not just delete and delete filename
        // remotes: {
        //   header: headerRemote,
        //   footer: footerRemote,
        // },
        shared: {
          react: {
            singleton: true,
            requiredVersion: '^18.2.0',
            eager: false,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: '^18.2.0',
            eager: false,
          },
        },
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(
          isProd ? 'production' : 'development'
        ),
        'process.env.PUBLIC_URL': JSON.stringify(publicPath),
      }),
    ],
  };
};
