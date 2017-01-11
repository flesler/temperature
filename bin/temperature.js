#!/usr/bin/env node
const wg = require('../lib/streams/wg');

wg.download();
/*
const fs = require('fs');
const https = require('https');

const place = process.argv[2] || 'Buenos Aires';
const from = parseInt(process.argv[3], 10) || 1997;
const to = parseInt(process.argv[4], 10) || 2016;

const airport = /^[A-Z]+$/.test(place);
const dir = 'data/' + (airport ? place : place.toLowerCase().replace(/\W+/g, '-'));
const buffer = [];

let pending = 0;
let originalHeader;

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

https.globalAgent.maxSockets = 1e3;

const TEMPLATE = 'https://www.wunderground.com/history/%s/%s/%d/1/1/CustomHistory.html?dayend=31&monthend=12&yearend=%d&format=1';

function download(year) {
  const type = airport ? 'airport' : 'city';
  const url = util.format(TEMPLATE, type, encodeURIComponent(place), year, year);

  pending += 1;
  https.get(url, (res) => {
    if (res.statusCode >= 300) {
      console.error(url, res.statusMessage);
      return onEnd();
    }
    let buf = '';
    let first = true;
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      buf += chunk;
      const lines = buf.split(/\r?\n|<br \/>/);
      buf = lines.pop();
      while (lines.length) {
        const line = lines.shift().trim();
        if (!line) continue;
        if (first) {
          originalHeader = line;
          first = false;
        } else {
          addLine(line);
        }
      }
    });
    res.on('end', () => {
      if (buf) addLine(buf);
      onEnd();
    });
  });
}

function addLine(line) {
  const p = line.split('-');
  if (p[1].length === 1) {
    p[1] = '0' + p[1];
  }
  if (p[2][1] === ',') {
    p[2] = '0' + p[2];
  }
  buffer.push(p.join('-'));
}

const COLS = ['year', 'month', 'day', 'max', 'avg', 'min'];

function onEnd() {
  pending -= 1;
  if (pending > 0) return;

  buffer.sort();

  write('original.csv', [originalHeader].concat(buffer));

  const matrix = buffer.map(line => line.split(/[-,]/, COLS.length));

  const csv = [COLS].concat(matrix).map(vals => vals.join(','));

  write('daily.csv', csv);

  const ndjson = matrix.map((vals) => {
    const obj = {};
    COLS.forEach((col, i) => {
      obj[col] = vals[i] ? parseInt(vals[i], 10) : null;
    });
    return JSON.stringify(obj);
  });

  write('daily.ndjson', ndjson);

  const jsonLines = ndjson.map((line, i) => '\t' + (i ? ',' : '') + line);
  const json = ['['].concat(jsonLines).concat(']');
  write('daily.json', json);
}

function write(file, lines) {
  fs.writeFile(dir + '/' + file, lines.join('\n'));
}

for (let year = from; year <= to; year++) {
  download(year);
}
*/
