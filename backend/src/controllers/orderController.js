const { validationResult } = require('express-validator');
const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel');

const createOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { customer_name, phone, email, address, city, payment_method, items, notes } = req.body;

  if (!items || !items.length) {
    return res.status(400).json({ message: 'At least one item is required' });
  }

  const enrichedItems = [];
  let subtotal = 0;

  for (const item of items) {
    const product = await productModel.getProductById(item.product_id);
    if (!product) {
      return res.status(400).json({ message: `Invalid product ${item.product_id}` });
    }
    const unit_price = Number(product.price);
    const quantity = Number(item.quantity);
    subtotal += unit_price * quantity;
    enrichedItems.push({ product_id: product.id, quantity, unit_price });
  }

  const delivery_charge = Number(req.body.delivery_charge ?? 0);

  const order = await orderModel.createOrder(
    {
      customer_name,
      phone,
      email,
      address,
      city,
      payment_method,
      delivery_charge,
      subtotal,
      notes,
    },
    enrichedItems
  );

  res.status(201).json({
    message: 'Order placed successfully',
    order_id: order.id,
  });
};

const listOrders = async (req, res) => {
  const { limit } = req.query;
  const orders = await orderModel.getOrders(limit);
  res.json(orders);
};

const getOrder = async (req, res) => {
  const order = await orderModel.getOrderById(req.params.id);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json(order);
};

const updateStatus = async (req, res) => {
  const order = await orderModel.getOrderById(req.params.id);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  const { status } = req.body;
  const allowedStatuses = ['New', 'Processing', 'Shipped', 'Completed', 'Cancelled'];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  await orderModel.updateOrderStatus(req.params.id, status);
  res.json({ message: 'Status updated' });
};

const getDashboardSummary = async (req, res) => {
  const todayCount = await orderModel.getTodayOrderCount();
  const recentOrders = await orderModel.getRecentOrders(5);
  res.json({ todayCount, recentOrders });
};

module.exports = {
  createOrder,
  listOrders,
  getOrder,
  updateStatus,
  getDashboardSummary,
};

