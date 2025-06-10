const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // ou ton instance Sequelize

const modelImage = sequelize.define('generated_images', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'generated_images',
  timestamps: false
});

module.exports = modelImage;
