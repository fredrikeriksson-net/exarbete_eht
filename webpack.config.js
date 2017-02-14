// Webpack
var webpack = require('webpack');

// Config
const config = {
  entry: './js/index.js',
  output: {
    filename: "./js/dist/bundle.js"
  },

  module: {
    rules: [
      
    	// Babel Loader
    	{
    	  test: /\.js$/,
    	  use: [{
    	    loader: 'babel-loader'
    	  }]
    	},

    	// CSS Loader
    	{
    	  test: /\.css$/,
    	  use: [ 'style-loader', 'css-loader' ]
    	}

    ]
  }

};

module.exports = config;

