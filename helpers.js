var path = require('path');
var zlib = require('zlib');
var validateWebpackConfig = require('webpack-validator');

// Helper functions

exports.validateWebpackConfig = validateWebpackConfig;
exports.validate = validateWebpackConfig;

function gzipMaxLevel(buffer, callback) {
  return zlib['gzip'](buffer, {level: 9}, callback);
}
exports.gzipMaxLevel = gzipMaxLevel;

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
exports.root = root;

function rootNode(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return root.apply(path, ['node_modules'].concat(args));
}
exports.rootNode = rootNode;

function prependExt(extensions, args) {
  args = args || [];
  if (!Array.isArray(args)) { args = [args]; }
  return extensions.reduce(function(memo, val) {
    return memo.concat(val, args.map(function(prefix) {
      return prefix + val;
    }));
  }, ['']);
}
exports.prependExt = prependExt;
exports.prepend = prependExt;
