const pumpify = require('pumpify');
const request = require('request');
const split2 = require('split2');
const through2 = require('through2');
const util = require('../util');
const opts = require('../opts');

const URL = 'https://www.wunderground.com/history/%s/%s/%d/1/1/CustomHistory.html?dayend=31&monthend=12&yearend=%d&format=1';
const LINE = /\r?\n|<br.*?>/;
const COLS = ['year', 'month', 'day', 'max', 'avg', 'min'];

exports.download = (year) => {
  const type = opts.airport ? 'airport' : 'city';
  const url = util.format(URL, type, encodeURIComponent(opts.place), year, year);

  return pumpify.obj(
    request(url),
    split2(LINE),
    through2.obj((buf, _, done) => {
      done(null, transform(buf));
    })
  );
};

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
