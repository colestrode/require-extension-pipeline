var fs = require('fs');

require.extensions['.js'] = function(module, filename) {
  var contents = fs.readFileSync(filename, {encoding: 'UTF-8'});

  contents += '\nmodule.exports.log1 = ' + log.toString();
  module._compile(contents);
};

function log() {
  console.log('hello from extensions1');
}
