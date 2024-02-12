const { User } = require('../models/user.js');
const constants = require('../constants/const.js');

class UsersServices {
    async getUsers() {
        const users = await User.findAll({
            attributes: constants.GET_USERS_ATRIBUTES,
            order: constants.GET_USERS_ORDER,
        });
        return users;
    }

    async getUser(email) {
        const user = await User.findOne({ where: { email } });
        return user;
    }

    async registrationUser(username, email, hashPassword) {
        const user = await User.create({ username, email, hashPassword });
        return user;
    }
    async setLastLogin(email) {
        const user = await User.update(
            { lastLogin: new Date() },
            { where: { email }, returning: true }
        );
        return user;
    }

    async deleteUsers(userEmails) {
        const users = await User.destroy({ where: { email: userEmails } });
        return users;
    }

    async blockUsers(userEmails) {
        const users = await User.update(
            { status: constants.STATUS_BLOCK },
            { where: { email: userEmails } }
        );
        return users;
    }

    async unblockUsers(userEmails) {
        const users = await User.update(
            { status: constants.STATUS_ACTIVE },
            { where: { email: userEmails } }
        );
        return users;
    }
}

module.exports = new UsersServices();
