const express = require('express');
const User = require("../database/models/User");
const Product = require("../database/models/Product");
const Order =  require("../database/models/Order");
const OrderProduct = require("../database/models/OrderProduct");
const router = express.Router();

Product.belongsToMany(Order, { through: "OrderProduct" });
Order.belongsToMany(Product, { through: "OrderProduct" });

router.post('/', async (req, res) => {
    try {cd 
        const { orderId, productId, quantity } = req.body;

        const order = await Order.findByPk(orderId);
        const product = await Product.findByPk(productId);

        if (!order || !product) {
            return res.status(404).json({ success: false, message: 'Order or product not found' });
        }

        await OrderProduct.create({ orderId, productId, quantity });

        res.status(201).json({ success: true, message: 'Product added to order' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});


router.delete('/:orderId/:productId', async (req, res) => {
    try {
        const { orderId, productId } = req.params;

        const orderProduct = await OrderProduct.findOne({
            where: { orderId, productId }
        });

        if (!orderProduct) {
            return res.status(404).json({ success: false, message: 'Product not found in order' });
        }

        await orderProduct.destroy();

        res.status(200).json({ success: true, message: 'Product removed from order' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});


router.put('/:orderId/:productId', async (req, res) => {
    try {
        const { orderId, productId } = req.params;
        const { quantity } = req.body;

        const orderProduct = await OrderProduct.findOne({
            where: { orderId, productId }
        });

        if (!orderProduct) {
            return res.status(404).json({ success: false, message: 'Product not found in order' });
        }

        orderProduct.quantity = quantity;
        await orderProduct.save();

        res.status(200).json({ success: true, message: 'Product quantity updated in order' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

module.exports = router;
