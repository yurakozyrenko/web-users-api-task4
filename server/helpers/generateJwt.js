const jwt = require('jsonwebtoken');
const constants = require('../constants/const.js');

const generateJwt = (id, email, status) => {
    return jwt.sign({ id, email, status }, process.env.SECRET_KEY, {
        expiresIn: constants.TIME_TOKEN,
    });
};

module.exports = { generateJwt };
