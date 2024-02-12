const constants = require('../constants/const.js');
const bcrypt = require('bcrypt');

const generateHash = (password) => {
    const salt = bcrypt.genSaltSync(constants.SALT);
    return bcrypt.hashSync(password, salt);
};

module.exports = { generateHash };
