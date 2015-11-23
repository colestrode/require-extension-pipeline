var fs = require('fs')
  , rimraf = require('rimraf')
  , crypto = require('crypto')
  , uuid = require('uuid')
  , _ = require('lodash')
  , stripBom = require('strip-bom')
  , tempDir = __dirname + '/.tmp'
  , fileMap = {};


module.exports = function init(extensions) {
  // clear temp file cache
  rimraf(tempDir, function(err) {
    var allExtensions = ['.js'];
    if (!err) {
      // otherwise cross your fingers
      fs.mkdirSync(tempDir);

      if (Array.isArray(extensions) && extensions.length > 0) {
        allExtensions = _.uniq(allExtensions.concat(extensions));
      }

      allExtensions.forEach(function(extension) {
        addPipeline(extension);
      });
    }
  });
};

function addPipeline(extension) {
  var transforms = [require.extensions[extension]]
    , propertyConfig = {};

  propertyConfig.get = function() {
    return getter(transforms);
  };

  propertyConfig.set = setter(transforms);

  Object.defineProperty(require.extensions, extension, propertyConfig);
}

function getter(transforms) {
  return function(module, filename) {
    var generatedFilename = fileMap[filename]
      , filePath = filename;

    if (!generatedFilename) {
      generatedFilename = crypto.createHash('md5').update(filename).digest('hex');
      fileMap[filename] = generatedFilename;
      filePath = tempDir + '/' +  generatedFilename;
      fs.writeFileSync(filePath, stripBom(fs.readFileSync(filename, 'utf8')));
    }

    // override compile to write modified contents to temp file
    if (module && module._compile) {
      var compileOrig = module._compile.bind(module);
      module._compile = function(content) {
        fs.writeFileSync(filePath, content);
        compileOrig(content);
      };
    }

    transforms.forEach(function(transform) {
      transform(module, filePath);
    });
  };
}

function setter(transforms) {
  return function(t) {
    var exists = false;
    transforms.forEach(function(transform) {
      if (transform === t) {
        exists = true;
      }
    });

    if (!exists) {
      transforms.push(t);
    }
  }
}
