const util = require('util');

function int(str) {
  return parseInt(str, 10);
}

exports.int = int;

exports.pad = num => (
  num < 10 ? '0' + num : num
);

exports.format = util.format;
