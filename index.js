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
      transforms.push(t);
    }
  });
}
