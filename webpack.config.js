const webpack = require('webpack');

module.exports = {
  entry: {
    app: ['./client/App.jsx'],
    vendor: ['react','react-dom','whatwg-fetch','babel-polyfill','react-router','reactstrap'],
    },
  
  output: {
    path: __dirname + './static',
    filename: 'app.bundle.js',
    
  },
  module: {
     loaders: [  
    {
      test: /\.css$/,
      loaders: ['style-loader','css-loader']
    },   
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        query: {
          presets: ['react','es2015']
        }, 
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor','vendor.bundle.js'), 
    ],
  devServer: {
     port: 8000,
     contentBase: 'static',
     proxy: {
        '/api/*': {
           target:'http://localhost:3000'
        },
     },
   },
 }

