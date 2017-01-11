const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

exports.save = (opts, ext) => {
  const dir = opts.airport ? opts.place : opts.place.toLowerCase().replace(/\W+/g, '-');
  const root = path.join('data', dir);
  mkdirp.sync(root);

  const filename = path.join(root, `daily.${ext}`);
  return fs.createWriteString(filename);
};
