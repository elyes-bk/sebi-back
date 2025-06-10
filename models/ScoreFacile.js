const { DataTypes } = require("sequelize");
const sequelize = require("./index"); // ou la bonne instance Sequelize

const ScoreFacile = sequelize.define("score_james_facile", {
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
  tableName: "score_james_facile",
  timestamps: false,
});

module.exports = ScoreFacile;
