import express from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import {getOrders} from '../controllers/orderController.js'
import Product from '../models/productmodel.js';
const orderRouter = express.Router();

orderRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const {
      items,
      status,
      user,
      shippingAddress,
      paymentMethod,
      totalPrice,
      dateOrdered
    } = req.body;
    const order = new Order({
      items,
      status,
      user,
      shippingAddress,
      paymentMethod,
      totalPrice,
      dateOrdered
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  })
);

orderRouter.get('/getOrders/:id', getOrders);

export {orderRouter};