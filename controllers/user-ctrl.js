var Joi = require('joi');
var models = require('../models');
var bcrypt = require('bcryptjs');
var jwt = require ('jsonwebtoken');
var Boom = require('boom');

exports.register = function(server, options, next){
  server.route({
    method: 'POST',
    path: '/api/v1/user/auth',
    handler: function(request, reply){
      var User = models.User;
      var data = request.payload;

      User.find({
        where: {
          email: data.email
        }
      }).then(function(user){
        if(!user){
          throw Boom.notFound('User not found');
        }
        var password = user.get('password');
        if(!bcrypt.compareSync(data.password, password)){
          throw Boom.bedRequest('Wrong email or password!')
        }

        var token = jwt.sign({
          user: user.get('id')
        }, 'senha123');

        reply({token: token});
      }).catch(function(err){
        reply(err.isBoom ? err : Boom.wrap(err));
      });
    },
    config: {
      validate: {
        payload: {
          email: Joi.string().email().required(),
          password: Joi.string().required()
        }
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/api/v1/user',
    handler: function(request, reply){
      var User = models.User;

      reply(User.findAll());
    }
  });

  // server.route({
  //   method: 'GET',
  //   path: '/api/v1/user/{id}',
  //   handler: function(request, reply){
  //     var id = request.params.id;
  //     var User = models.User;
  //
  //     User.find({
  //       where: {
  //         id: id
  //       }
  //     }).then(function(user){
  //       if(!user){
  //         throw Boom.notFound('User not found');
  //       }
  //       reply(user);
  //       .catch(function(err){
  //         reply(err.isBoom ? err : Boom.wrap(err));
  //       });
  //   }
  // });

  server.route({
    method: 'POST',
    path: '/api/v1/user',
    handler: function(request, reply){
      var User = models.User;

      User
        .create(request.payload)
        .then(function(user){
          reply(user.get());
        });
    },
    config: {
      validate: {
        payload: {
          name: Joi.string().max(100).required(),
          email: Joi.string().email().required(),
          password: Joi.string().required()
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
