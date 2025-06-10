//configuration de sequelize
const { Sequelize } = require('sequelize');
require('dotenv').config();
//connexion bdd avec infos
const sequelize = new Sequelize(process.env.DATABASE_PROD,
    process.env.ID_DATABASE_PROD,
    process.env.PASSWORD_DATABASE,
    {    dialect: process.env.DIALECT_DATABASE,
        host: process.env.HOST_DATABASE
    });

module.exports = sequelize ;