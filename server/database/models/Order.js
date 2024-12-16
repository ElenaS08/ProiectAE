const { sequelize } = require("../server");
const { DataTypes } = require('sequelize');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    total: {
        type: DataTypes.FLOAT,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    address: {
        type: DataTypes.STRING,
        validate: {
            len: [3, 100]
        }
    },
    city: {
        type: DataTypes.STRING,
        validate: {
            len: [3, 50]
        }
    },
    name: {
        type: DataTypes.STRING,
        validate: {
            len: [3, 200]
        }
    },
    phone: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['placed', 'sent'],
        defaultValue: 'placed'
    },
    userId: {
        type: DataTypes.INTEGER
    },
})

module.exports = Order;