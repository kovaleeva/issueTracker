const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');


const config = {
  entry: [
    // path.join(__dirname, '/server/server.jsx'),
    path.join(__dirname, '/src/index.jsx'),
  ],
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react'],
      },
    },
    {
      test: /\.less$/,
      loaders: ['style-loader', 'css-loader', 'less-loader'],
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },
    ],
  },
  output: {
    path: `${__dirname}/public`,
    filename: 'bundle.js',
    library: 'home',
  },
  devServer: {
    contentBase: path.join(__dirname, '/src/'),
    historyApiFallback: true,
  },
  // watch: NODE_ENV == 'development',
  // watchOptions: {
  //     aggregateTimeout: 100
  // },
  devtool: NODE_ENV === 'development' ? 'cheap-inline-module-source-map' : false,
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      LANG: JSON.stringify('ru'),
    }),
    new webpack.DefinePlugin({
      'process.env.BROWSER': false,
    }),
    new webpack.DefinePlugin({
      'process.env.BROWSER': true,
    }),
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  resolveLoader: {
    extensions: ['*', '.js', '.jsx'],
  },
};

if (NODE_ENV === 'production') {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_console: true,
      unsafe: true,
    },
  }));
}

module.exports = config;
