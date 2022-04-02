const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    summary:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    score:{
      type: DataTypes.INTEGER
    },
    healthScore:{
      type: DataTypes.INTEGER
    },
    preparation:{
      type: DataTypes.ARRAY(DataTypes.STRING)
    }
  });
};
