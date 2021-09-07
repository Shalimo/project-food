'use strict';

let path = require('path');

module.exports = {
  mode: 'production',
  entry: './js/script.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/js'
  },
  watch: true,

  devtool: "source-map",

  module: { // какие модули используем
    rules: [ // правила
      {
        test: /\.m?js$/, // находим js файлы с помощью регулярных выражений
        exclude: /(node_modules|bower_components)/, // какие файлы мы должны исключить
        use: { // описываем как и что будем использовать
          loader: 'babel-loader', // loader - технология, которая связывает вебпак с бэбелем
          options: {
            presets: [['@babel/preset-env', {
                debug: true,
                corejs: 3,
                useBuiltIns: "usage"
            }]]
          }
        }
      }
    ]
  }
};
