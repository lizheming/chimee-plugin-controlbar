const path = require('path');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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

const basename = 'chimee-plugin-controlbar';
const common = {
  mode: 'production',
  // devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    library: 'ChimeePluginControlbar',
    libraryTarget: 'umd',
    libraryExport: 'default'
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
  },
  plugins: []
}

// 有 React 有内联样式
const buildNormal = merge({
  output: {
    filename: `${basename}.umd.min.js`
  }
}, common);

// 无 React 有内联样式
const buildWithoutReact = merge({
  output: {
    filename: `${basename}.no-react.umd.min.js`
  },
  externals: {
    'react': reactExternal,
    'react-dom': reactDOMExternal
  }
}, common);

// 有 React 无内联样式
const buildWithoutStyle = merge({
  output: {
    filename: `${basename}.no-style.umd.min.js`
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${basename}.css`
    })
  ]
}, common);
buildWithoutStyle.module.rules[1] = {
  test: /\.css|less/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader
    },
    'css-loader',
    'less-loader'
  ]
};

// 无 React 无内联样式
const buildWithoutReactAndStyle = merge({}, buildWithoutReact, buildWithoutStyle, {
  output: {
    filename: `${basename}.no-react-and-style.umd.min.js`
  }
});

module.exports = [
  buildNormal,
  buildWithoutReact,
  buildWithoutStyle,
  buildWithoutReactAndStyle
];