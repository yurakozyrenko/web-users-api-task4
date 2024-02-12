const sequelize = require('../config/db.js');
const constants = require('../constants/const.js');

const start = async (app, PORT) => {
    try {
        await sequelize.authenticate();
        console.log(constants.CONNECT_INFORMATION);
        await sequelize.sync();
        app.listen(PORT, () => console.log(constants.SERVER_START, `${PORT}`));
    } catch (e) {
        console.log(constants.UNCONNECT_INFORMATION, e);
    }
};

module.exports = start;
