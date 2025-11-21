const pool = require('../config/db');

const getSubcategories = async (categoryId) => {
  if (categoryId) {
    const [rows] = await pool.execute(
      'SELECT * FROM subcategories WHERE category_id = ? ORDER BY name ASC',
      [categoryId]
    );
    return rows;
  }
  const [rows] = await pool.execute(
    `SELECT s.*, c.name as category_name
     FROM subcategories s
     JOIN categories c ON c.id = s.category_id
     ORDER BY c.name ASC, s.name ASC`
  );
  return rows;
};

const getSubcategoryById = async (id) => {
  const [rows] = await pool.execute('SELECT * FROM subcategories WHERE id = ?', [id]);
  return rows[0];
};

const createSubcategory = async ({ category_id, name }) => {
  const [result] = await pool.execute(
    'INSERT INTO subcategories (category_id, name) VALUES (?, ?)',
    [category_id, name]
  );
  return { id: result.insertId, category_id, name };
};

const updateSubcategory = async (id, { category_id, name }) => {
  await pool.execute('UPDATE subcategories SET category_id = ?, name = ? WHERE id = ?', [
    category_id,
    name,
    id,
  ]);
  return { id, category_id, name };
};

const deleteSubcategory = async (id) => {
  await pool.execute('DELETE FROM subcategories WHERE id = ?', [id]);
};

module.exports = {
  getSubcategories,
  getSubcategoryById,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
};

