const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const UsersServices = require('../services/usersServices');
const { generateJwt } = require('../helpers/generateJwt');
const { generateHash } = require('../helpers/generateHash');
const constants = require('../constants/const.js');

class UserControllers {
    async registrationUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(404).json({ detail: errors.array()[0].msg });
            }
            const { username, email, password } = req.body;

            const candidate = await UsersServices.getUser(email);

            if (candidate) {
                return res.json({
                    detail: constants.USER_REGISTER_USED_MSG,
                });
            }

            const hashPassword = generateHash(password);

            const user = await UsersServices.registrationUser(
                username,
                email,
                hashPassword
            );

            const token = generateJwt(user.id, user.email, user.status);

            return res.json({ email, token });
        } catch (err) {
            return res.json({ detail: err.message });
        }
    }

    async loginUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(404).json({ detail: errors.array()[0].msg });
            }
            const { email, password } = req.body;

            const user = await UsersServices.getUser(email);

            if (!user) {
                return res.json({ detail: constants.USER_UNREGISTER_MSG });
            }

            if (user.status === constants.STATUS_BLOCK) {
                return res.json({ detail: constants.STATUS_BLOCK });
            }

            const success = await bcrypt.compare(
                password,
                user.dataValues.hashPassword
            );

            if (!success) {
                return res.json({ detail: constants.PASSWORD_FAILED_MSG });
            }

            const token = generateJwt(user.id, user.email, user.status);

            await UsersServices.setLastLogin(email);
            return res.json({ email: user.dataValues.email, token });
        } catch (err) {
            return res.json({ detail: err.message });
        }
    }

    async getUsers(req, res, next) {
        try {
            const usersData = await UsersServices.getUsers();
            if (!usersData) {
                return res.json({ detail: constants.UNCONNECT_INFORMATION });
            }
            return res.json(usersData);
        } catch (err) {
            return res.json({ detail: err.message });
        }
    }

    async getUser(req, res, next) {
        try {
            const email = req.user.email;
            const usersData = await UsersServices.getUser(email);
            if (!usersData) {
                return res.json({ detail: constants.USER_UNREGISTER_MSG });
            }
            return res.json(usersData);
        } catch (err) {
            return res.json({ detail: err.message });
        }
    }

    async deleteUsers(req, res) {
        try {
            const userEmails = req.body.selectedRows;
            const usersData = await UsersServices.deleteUsers(userEmails);
            if (!usersData) {
                return res.json({ detail: constants.UNCONNECT_INFORMATION });
            }
            return res.json(usersData);
        } catch (error) {
            return res.json({ detail: err.message });
        }
    }

    async blockUsers(req, res) {
        try {
            const userEmails = req.body.selectedRows;
            const usersData = await UsersServices.blockUsers(userEmails);
            if (!usersData) {
                return res.json({ detail: constants.UNCONNECT_INFORMATION });
            }
            return res.json(usersData);
        } catch (error) {
            return res.json({ detail: err.message });
        }
    }

    async unblockUsers(req, res) {
        try {
            const userEmails = req.body.selectedRows;
            const usersData = await UsersServices.unblockUsers(userEmails);
            if (!usersData) {
                return res.json({ detail: constants.UNCONNECT_INFORMATION });
            }
            return res.json(usersData);
        } catch (error) {
            return res.json({ detail: err.message });
        }
    }
}

module.exports = new UserControllers();
