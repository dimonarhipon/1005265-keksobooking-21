'use strict';

const path = require(`path`);

module.exports = {
  entry: [
    `./js/util.js`,
    `./js/backend.js`,
    `./js/advert.js`,
    `./js/card.js`,
    `./js/map.js`,
    `./js/mapFilter.js`,
    `./js/form.js`,
    `./js/pin.js`,
    `./js/loadImage.js`,
    `./js/main.js`
  ],
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname),
    iife: true,
  },
  devtool: false,
};
