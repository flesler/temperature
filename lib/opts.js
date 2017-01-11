const util = require('./util');

const argv = process.argv;

exports.place = argv[2] || 'Buenos Aires';
exports.from = util.int(argv[3]) || 1997;
exports.to = util.int(argv[4]) || new Date().getFullYear();
exports.airport = /^[A-Z]+$/.test(exports.place);
