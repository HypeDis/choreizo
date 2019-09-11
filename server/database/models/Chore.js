const Sequelize = require('sequelize');
const db = require('./../db');

const Chore = db.define('chore', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  difficulty: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10,
    },
  },
  penalty: {
    type: Sequelize.INTEGER,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  // unit: days
  timeLimit: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
    },
  },
  details: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
});

module.exports = Chore;
