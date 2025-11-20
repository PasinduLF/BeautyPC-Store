const pool = require('../config/db');

const createOrder = async (orderData, items) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [orderResult] = await connection.execute(
      `INSERT INTO orders 
        (customer_name, phone, email, address, city, payment_method, delivery_charge, subtotal, status, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        orderData.customer_name,
        orderData.phone,
        orderData.email || null,
        orderData.address,
        orderData.city,
        orderData.payment_method,
        orderData.delivery_charge,
        orderData.subtotal,
        'New',
        orderData.notes || null,
      ]
    );

    const orderId = orderResult.insertId;

    for (const item of items) {
      await connection.execute(
        `INSERT INTO order_items (order_id, product_id, quantity, unit_price) 
         VALUES (?, ?, ?, ?)`,
        [orderId, item.product_id, item.quantity, item.unit_price]
      );
    }

    await connection.commit();
    return { id: orderId, ...orderData, items };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const getOrders = async (limit = 50) => {
  const safeLimit = Number(limit) || 50;
  const [rows] = await pool.query(
    `SELECT * FROM orders ORDER BY created_at DESC LIMIT ?`,
    [safeLimit]
  );
  return rows;
};

const getOrderById = async (id) => {
  const [orders] = await pool.query('SELECT * FROM orders WHERE id = ?', [id]);
  if (!orders.length) return null;

  const [items] = await pool.query(
    `SELECT oi.*, p.name as product_name 
     FROM order_items oi
     LEFT JOIN products p ON oi.product_id = p.id
     WHERE oi.order_id = ?`,
    [id]
  );

  return { ...orders[0], items };
};

const updateOrderStatus = async (id, status) => {
  await pool.execute('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
};

const getTodayOrderCount = async () => {
  const [rows] = await pool.query(
    `SELECT COUNT(*) as count 
     FROM orders 
     WHERE DATE(created_at) = CURDATE()`
  );
  return rows[0]?.count || 0;
};

const getRecentOrders = async (limit = 5) => {
  const [rows] = await pool.query(
    `SELECT id, customer_name, status, subtotal, created_at 
     FROM orders
     ORDER BY created_at DESC
     LIMIT ?`,
    [limit]
  );
  return rows;
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  getTodayOrderCount,
  getRecentOrders,
};

