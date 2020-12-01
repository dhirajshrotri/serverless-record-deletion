const path = require('path');
const nodeExternals = require('webpack-node-externals');
const slsw = require('serverless-webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const isLocal = slsw.lib.webpack.isLocal;

function srcPath(subdir) {
  return path.join(__dirname, "src", subdir);
}

// let node_ext_options = {
//   allowlist : [
//     'aws-lambda-framework'
//   ]
// }

module.exports = {
  mode: isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  externals: [nodeExternals()],
  devtool: 'source-map',
  resolve: {
    extensions: [ '.js', '.jsx', '.json', '.ts', '.tsx' ],
    alias: {
      '@utils': srcPath('shared/utils'),
      '@lib': srcPath('shared/lib'),
      '@config': srcPath('config'),
      '@infra': srcPath('shared/infra')
    }
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  },
  target: 'node',
  module: {
    rules: [
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: path.resolve('.webpackCache')
            }
          },
          'babel-loader'
        ]
      }
    ]
  },
  plugins: [new ForkTsCheckerWebpackPlugin()]
};