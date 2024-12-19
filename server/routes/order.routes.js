const express = require('express');
const bcrypt = require('bcrypt');
const Order = require("../database/models/Order");
const User = require("../database/models/User");
const { or } = require('sequelize');

User.hasMany(Order, { as: "Orders", foreignKey: "userId" });
Order.belongsTo(User, {foreignKey: "userId"});

const router = express.Router();

router.post('/', async (req, res) => {
    const { userId, total, products } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found', data: {} });
    }

    const order = await Order.create({
        userId: userId,
        total: total,
    });

    if (products && products.length > 0) {
        await order.addProducts(products.map(product => product.id)); 
    }

    res.status(201).json({ success: true, message: 'Order created', data: order });
});


router.get('/', async (req, res) => {
    const { userId } = req.query;

    const user = await User.findByPk(userId);
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found', data: {} });
    }

    const orders = await user.getOrders({
        include: [{
            model: Product,
            through: { attributes: [] }, // Ascunde câmpurile tabelului de legătură
        }]
    });

    res.status(200).json({ success: true, data: orders });
});


router.get('/:id', async (req, res) => {
    const order = await Order.findByPk(req.params.id, {
        include: Product 
    });

    if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, data: order });
});


router.put('/:oid', async (req, res) => {
    const user = await User.findByPk(req.body.userId);

    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found', data: {} });
    }

    const orders = await user.getOrders({ where: { id: req.params.oid } });
    const order = orders[0];

    if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found', data: {} });
    }

    await order.update(req.body);

    res.status(200).json({ success: true, message: "Order updated", data: order });
});


router.delete('/:oid', async (req, res) => {
    const user = await User.findByPk(req.body.userId);

    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found', data: {} });
    }

    const orders = await user.getOrders({ where: { id: req.params.oid } });
    const order = orders[0];

    if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found', data: {} });
    }

    await order.destroy();

    res.status(200).json({ success: true, message: "Order deleted" });
});

module.exports = router;
