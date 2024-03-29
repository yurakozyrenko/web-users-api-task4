module.exports = {
    CONNECT_INFORMATION: 'The connection to the database was successfully',
    UNCONNECT_INFORMATION: 'Unable to connect to the database ',
    SERVER_START: 'Server start on port',
    GET_USERS_ATRIBUTES: ['username', 'email', 'lastLogin', 'status'],
    GET_USERS_ORDER: [['id', 'ASC']],
    STATUS_BLOCK: 'BLOCKED',
    STATUS_ACTIVE: 'ACTIVE',
    EMAIL_ERR_MSG: 'Please correct email test@test.ru',
    USERNAME_ERR_MSG: 'The username must be at least 1 characters',
    PASSWORD_ERR_MSG: 'The password must be at least 1 characters',
    USERNAME_MINLENGTH: { min: 1 },
    PASSWORD_MINLENGTH: { min: 1 },
    SALT: 10,
    USER_REGISTER_USED_MSG: 'Sorry, this email has been used!',
    USER_UNREGISTER_MSG: 'User does not register!',
    PASSWORD_FAILED_MSG: 'Password failed',
    ERROR_UNREG_MSG: 'User Unregister',
    TIME_TOKEN: '2h',
};
