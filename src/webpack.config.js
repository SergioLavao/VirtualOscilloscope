const path = require('path');

module.exports = {
  entry: './tsx/index.tsx',
  devtool: 'inline-source-map',
  watch: true,
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
        { loader: 'style-loader', options: { injectType: 'singletonStyleTag' } },
        { loader: 'css-loader' },
        ]
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../build/core/static'),
  },
};
