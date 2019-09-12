const path = require('path');

var reactExternal = {
  root: 'React',
  commonjs2: 'react',
  commonjs: 'react',
  amd: 'react'
};
var reactDOMExternal = {
  root: 'ReactDOM',
  commonjs2: 'react-dom',
  commonjs: 'react-dom',
  amd: 'react-dom'
};

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'chimee-plugin-controlbar.umd.min.js',
    library: 'ChimeePluginControlbar',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  externals: {
    'react': reactExternal,
    'react-dom': reactDOMExternal
  },
  resolve: {
    alias: {
      src: path.join(__dirname, 'src')
    },
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader?cacheDirectory'
      },
      {
        test: /\.(css|less)$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.svg$/,
        use: [
          'url-loader'
        ]
      }
    ]
  }
};
