var Joi = require('joi');
var models = require('../models');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/api/v1/message',
    handler: function(request, reply){
      var user = request.auth.credentials.user;
      var Message = models.Message;

      Message
      .findAll({
        where: {
          userId: user
        }
      })
      .map(function(message){
        return message.get();
      })
      .then(function(messages){
        reply(messages);
      })

    },
    config: {
      auth: 'bearer'
    }
  });

  server.route({
    method: 'DELETE',
    path: '/api/v1/message/{id}',
    handler: function(request, reply){
      var id = request.params.id;
      var user = request.auth.credentials.user;
      var Message = models.Message;

      Message
      .destroy({
        where: {
          userId: user,
          Id: id
        }
      })
      .then(function(){
        reply({success: true});
      })
    },
    config: {
      auth: 'bearer',
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
      var auth = request.auth.credentials;
      var Message = models.Message;
      var data = request.payload;
      data.userId = auth.user;

      Message
        .create(data)
        .then(function(message){
          reply(message.get());
        })
    },
    config: {
      auth: 'bearer',
      validate: {
        payload: {
          name: Joi.string().max(100).required(),
          message: Joi.string().max(140).required(),
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
