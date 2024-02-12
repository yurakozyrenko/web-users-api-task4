const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const constants = require('../constants/const.js');

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    hashPassword: { type: DataTypes.STRING, allowNull: false },
    lastLogin: { type: DataTypes.DATE, defaultValue: new Date() },
    status: { type: DataTypes.STRING, defaultValue: constants.STATUS_ACTIVE },
});

module.exports = { User };
