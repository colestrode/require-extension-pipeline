var fs = require('fs');

require.extensions['.json'] = function(module, filename) {
  var contents = fs.readFileSync(filename, {encoding: 'UTF-8'});
  try {
    contents = JSON.parse(contents);
    contents.json1 = 'hello';
    module.exports = contents;
  } catch (err) {
    err.message = filename + ': ' + err.message;
    throw err;
  }
};
