const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const ScoreDifficile = sequelize.define("score_james_difficile", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  pseudo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: "score_james_difficile",
  timestamps: false,
});

module.exports = ScoreDifficile;
