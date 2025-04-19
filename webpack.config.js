const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (_, argv) => {
  const isProd = argv.mode === 'production';

  // if its host app use this config, if not just delete
  // const headerRemote = isProd
  //   ? 'header@https://remoteURL/mfe-header/remoteEntry.js'
  //   : 'header@http://localhost:3001/remoteEntry.js';

  // const footerRemote = isProd
  //   ? 'footer@https://remoteURL/mfe-footer/remoteEntry.js'
  //   : 'footer@http://localhost:3002/remoteEntry.js';

  const publicPath = isProd
    ? 'https://remoteURL/mfe-boilerplate/'
    : 'http://localhost:5173/';

  return {
    mode: isProd ? 'production' : 'development',
    entry: './src/bootstrap',
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
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
      // if its host app use this config, if not just delete
      // path: path.resolve(__dirname, 'dist'),
      filename: isProd ? '[name].[contenthash].js' : '[name].js',
      publicPath,
      clean: true,
    },
    devtool: isProd ? false : 'eval-source-map',
    devServer: !isProd
      ? {
          port: 5173,
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
        exposes: {
          './BoilerPlate': './src/BoilerPlate',
        },
        filename: 'remoteEntry.js',
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
