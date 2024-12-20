const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database/db.sqlite',
    logging: false
})

sequelize
    .sync({ force: false })  
    .then(() => {
        console.log('Models successfully synced.');
    })
    .catch((err) => {
        console.log('Error syncing models:', err);
    })


module.exports = { sequelize }