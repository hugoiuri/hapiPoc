var fs = require('fs');
var plugins = [];

fs.readdirSync(__dirname).forEach(function(file){
  if(file.match(/-plugin\.js/gi))
  plugins.push(require(__dirname + '/' + file));
});

module.exports = plugins;
