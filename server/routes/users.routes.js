const express = require('express');
const UsersControllers = require('../controllers/users.controller');
const router = express.Router();
const { checkSchema } = require('express-validator');
const { registerSchema, loginSchema } = require('../helpers/valid');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, UsersControllers.getUsers);

router.get('/:email', authMiddleware, UsersControllers.getUser);


router.delete('/', UsersControllers.deleteUsers);

router.post(
    '/registration',
    checkSchema(registerSchema),
    UsersControllers.registrationUser
);

router.post('/login', checkSchema(loginSchema), UsersControllers.loginUser);

router.patch('/block', UsersControllers.blockUsers);

router.patch('/unblock', UsersControllers.unblockUsers);

module.exports = router;
