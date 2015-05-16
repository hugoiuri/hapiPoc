var Joi = require('joi');
var db = [];

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/api/v1/user',
    handler: function(request, reply){
      reply('teste');
    }
  });

  server.route({
    method: 'POST',
    path: '/api/v1/user',
    handler: function(request, reply){
      reply(request.payload);
    },
    config: {
      validate: {
        payload: {
          name: Joi.string().max(100).required(),
          email: Joi.string().email().required(),
          passworld: Joi.string().required()
        }
      }
    }
  });

  next();

};

exports.register.attributes = {
  name: 'user-ctrl',
  version: '0.0.1'
};
