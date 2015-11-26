require('../index.js')(); // add pipelining

// add json require.extension hooks
require('./extensions/json1');
require('./extensions/json2');

// add js require.extension hooks
require('./extensions/js1');
require('./extensions/js2');




var base = require('./lib/base');
console.log('base.log1:', base.log1);
console.log('base.log2:', base.log2);

var data = require('./lib/data.json');
console.log('data:', data);
