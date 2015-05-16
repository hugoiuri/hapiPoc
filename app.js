var Hapi = require('hapi');
var plugins = require('./plugins');
var controllers = require('./controllers');
var server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: 8080
});

server.register(plugins.concat(controllers), function(err){
  if(err)
  {
    throw err;
  }
  
  server.start();
});
