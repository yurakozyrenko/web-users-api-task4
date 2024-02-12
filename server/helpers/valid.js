const constants = require('../constants/const.js');

const commonEmailField = {
    isEmail: true,
    errorMessage: constants.EMAIL_ERR_MSG,
};

const commonPasswordField = {
    isLength: {
        options: constants.PASSWORD_MINLENGTH,
        errorMessage: constants.PASSWORD_ERR_MSG,
    },
};

const registerSchema = {
    username: {
        isLength: {
            options: constants.USERNAME_MINLENGTH,
            errorMessage: constants.USERNAME_ERR_MSG,
        },
    },
    email: { ...commonEmailField },
    password: { ...commonPasswordField },
};

const loginSchema = {
    email: { ...commonEmailField },
    password: { ...commonPasswordField },
};

module.exports = { registerSchema, loginSchema };
