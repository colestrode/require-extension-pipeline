module.exports = function(extensions) {
  if (!Array.isArray(extensions)) {
    extensions = [];
  }

  var allExtensions = Object.keys(require.extensions).concat(extensions);

  allExtensions.forEach(function(extension) {
    addPipeline(extension);
  });
};

function addPipeline(extension) {
  var transforms = [require.extensions[extension]];

  Object.defineProperty(require.extensions, extension, {
    get: function() {
      return function(module, filename) {
        transforms.forEach(function(transform) {
          transform(module, filename);
        });
      };
    },

    set: function(t) {
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
  });
}
