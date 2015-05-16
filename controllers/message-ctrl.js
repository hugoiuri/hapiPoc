var Joi = require('joi');
var db = [];

exports.register = function(server, options, next){
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

  next();

};

exports.register.attributes = {
  name: 'message-ctrl',
  version: '0.0.1'
};
