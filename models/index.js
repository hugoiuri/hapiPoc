var fs = require('fs');
var db = require('../lib/db');
var models = {};

fs.readdirSync(__dirname).forEach(function(file){
  if(!file.match(/-model\.js/gi))
    return;

    var model = db.import(__dirname + '/' + file);
    models[model.name] = model;
  });

  module.exports = models;
