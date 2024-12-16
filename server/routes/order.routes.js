const express = require('express');
const bcrypt = require('bcrypt');
const Order = require("../database/models/Order");
const User = require("../database/models/User");
const { or } = require('sequelize');

User.hasMany(Order, { as: "Orders", foreignKey: "userId" });
Order.belongsTo(User, {foreignKey: "userId"})

const router = express.Router();

router.post('/', async (req, res) => {
    const user = await User.findByPk(req.body.userId)

    if(!user) {
        return res.status(404).json({success: false, message: 'User not found', data: {}});
    }

    const order = req.body
    await Order.create(order)

    res.status(201).json({ success: true, message: "Order created", data: order });
})

router.get('/', async (req, res) => {
    const user = await User.findByPk(req.body.userId)

    if(!user) {
        return res.status(404).json({success: false, message: 'User not found', data: {}});
    }

    const orders = await user.getOrders()

    res.status(200).json(orders);
})

router.put('/:oid', async (req, res) => {
    const user = await User.findByPk(req.body.userId)

    if(!user) {
        return res.status(404).json({success: false, message: 'User not found', data: {}});
    }

    const orders = await user.getOrders({where: { id: req.params.oid }})
    const order = orders[0]

    if (!order){
        return res.status(404).json({success: false, message: 'Order not found', data: {}});
    }

    await order.update(req.body)

    res.status(200).json({ success: true, message: "Order updated", data: order});
})

router.delete('/:oid', async (req, res) => {
    const user = await User.findByPk(req.body.userId)

    if(!user) {
        return res.status(404).json({success: false, message: 'User not found', data: {}});
    }

    const orders = await user.getOrders({where: { id: req.params.oid }})
    const order = orders[0]

    if (!order){
        return res.status(404).json({success: false, message: 'Order not found', data: {}});
    }

    await order.destroy()    

    res.status(200).json({ success: true, message: "Order deleted"});
})

module.exports = router;