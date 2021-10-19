const Sequelize = require("sequelize");
const database = require("../database");

const Basquete = database.define("projeto_final", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  equipe: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao:{
    type: Sequelize.TEXT,
    allowNull: false,    
  }, 
  card: {
      type: Sequelize.STRING,
      allowNull: false,
  },
  video: {
      type: Sequelize.STRING,
      allowNull: false,
  },
}, 
{
  freezeTableName: true,
  timestamps: false, 
  createdAt: false,
  updatedAt: false,
});

module.exports = Basquete;