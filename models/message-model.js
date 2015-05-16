module.exports = function(sequelize, types){
  return sequelize.define('Message', {
    name: types.STRING,
    message: types.STRING,
    userId: types.BIGINT
  });
};
