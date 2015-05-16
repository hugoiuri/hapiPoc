var Hapi = require('hapi');
var Joi = require('joi');
var plugins = require('./plugins');
var server = new Hapi.Server();
var db = [];

server.connection({
  host: 'localhost',
  port: 8080
});

server.register(plugins, function(err){
  if(err)
    throw err;
});

server.route({
  method: 'GET',
  path: '/api/v1/message',
  handler: function(request, reply){
    reply(db);
  }
});

server.route({
  method: 'DELETE',
  path: '/api/v1/message/{id}',
  handler: function(request, reply){
    var id = request.params.id;
    db.splice(l, 1);
    reply({success: true});
  },
  config: {
    validate: {
      params: {
        id: Joi.number().min(0).required()
      }
    }
  }
});

server.route({
  method: 'POST',
  path: '/api/v1/message',
  handler: function(request, reply){
    db.push(request.payload);
    reply({success: true});
  },
  config: {
    validate: {
      payload: {
        name: Joi.string().max(100).required(),
        message: Joi.string().max(140).required(),
        date: Joi.date().iso().optional().default(Date.now, 'Date now')
      }
    }
  }
});

server.start();
