const opts = require('../opts');
const year = require('./wg-year');

exports.download = () => {
  let curr = opts.from;

  function fetch() {
    const stream = year.download(curr);
    stream.on('data', (data) => {
      console.log(JSON.stringify(data))
    });
    stream.on('end', step);
  }

  function step() {
    curr += 1;
    if (curr > opts.to) {
      console.log('END')
    } else {
      fetch();
    }
  }

  fetch();
};

