var good = require('good');
var GoodConsole = require('good-console');

exports.register = function(server, options, next){
  server.register({
    register: good,
    options: {
      reporters: [
        new GoodConsole({
          ops: '*',
          request: '*',
          response: '*',
          log: '*',
          error: '*'
        })
      ]
    }
  }, next);

};

exports.register.attributes = {
  name: 'log-plugin',
  version: '0.0.1'
};
