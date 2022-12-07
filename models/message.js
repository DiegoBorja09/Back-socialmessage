'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      message.belongsTo(models.user,{
        foreignKey:'iduser',
        target_Key:'id'

      })
    }
  }
  message.init({
    title: DataTypes.STRING,
    contents: DataTypes.STRING,
    date: DataTypes.DATE,
    iduser: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'message',
  });
  return message;
};