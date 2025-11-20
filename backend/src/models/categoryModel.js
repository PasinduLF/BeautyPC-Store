const pool = require('../config/db');

const getCategories = async () => {
  const [rows] = await pool.execute('SELECT * FROM categories ORDER BY name ASC');
  return rows;
};

const getCategoryById = async (id) => {
  const [rows] = await pool.execute('SELECT * FROM categories WHERE id = ?', [id]);
  return rows[0];
};

const createCategory = async (data) => {
  const { name, description } = data;
  const [result] = await pool.execute(
    'INSERT INTO categories (name, description) VALUES (?, ?)',
    [name, description || null]
  );
  return { id: result.insertId, ...data };
};

const updateCategory = async (id, data) => {
  const { name, description } = data;
  await pool.execute(
    'UPDATE categories SET name = ?, description = ? WHERE id = ?',
    [name, description || null, id]
  );
  return { id, ...data };
};

const deleteCategory = async (id) => {
  await pool.execute('DELETE FROM categories WHERE id = ?', [id]);
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};

