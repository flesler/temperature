const pumpify = require('pumpify');
const request = require('request');
const split2 = require('split2');
const through2 = require('through2');
const util = require('../util');

const URL = 'https://www.wunderground.com/history/%s/%s/%d/1/1/CustomHistory.html?dayend=31&monthend=12&yearend=%d&format=1';

exports.download = (opts) => {
  const stream =
  return pumpify.obj(
    request(url),
    split2(LINE),
    through2.obj((buf, _, done) => {
      done(null, transform(buf));
    })
  );
};

function getURL(opts, year) {
  const type = opts.airport ? 'airport' : 'city';
  return util.format(URL, type, encodeURIComponent(opts.place), year, year);
}

function transform(buf) {
  const line = buf.toString('utf8').trim();
  // Header or empty line
  if (!/^\d/.test(line)) return;

  const vals = line.split(/[-,]/, COLS.length);
  const data = {};
  COLS.forEach((col, i) => {
    data[col] = util.int(vals[i]);
  });
  return data;
}
