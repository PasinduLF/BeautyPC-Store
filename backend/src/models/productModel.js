const pool = require('../config/db');

const buildFilterQuery = ({
  categoryId,
  subCategory,
  minPrice,
  maxPrice,
  isFeatured,
  isNew,
  isBestSeller,
}) => {
  const conditions = [];
  const params = [];

  if (categoryId) {
    conditions.push('category_id = ?');
    params.push(categoryId);
  }

  if (subCategory) {
    conditions.push('LOWER(subcategory) = ?');
    params.push(subCategory.toLowerCase());
  }

  if (typeof minPrice !== 'undefined' && minPrice !== '') {
    conditions.push('price >= ?');
    params.push(Number(minPrice));
  }

  if (typeof maxPrice !== 'undefined' && maxPrice !== '') {
    conditions.push('price <= ?');
    params.push(Number(maxPrice));
  }

  if (typeof isFeatured !== 'undefined') {
    conditions.push('is_featured = ?');
    params.push(isFeatured ? 1 : 0);
  }

  if (typeof isNew !== 'undefined') {
    conditions.push('is_new = ?');
    params.push(isNew ? 1 : 0);
  }

  if (typeof isBestSeller !== 'undefined') {
    conditions.push('is_best_seller = ?');
    params.push(isBestSeller ? 1 : 0);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  return { whereClause, params };
};

const parseGallery = (value) => {
  if (!value) return [];
  try {
    const parsed = typeof value === 'string' ? JSON.parse(value) : value;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const serializeGallery = (value) => {
  if (!value) return null;
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed) && parsed.length) return JSON.stringify(parsed);
    } catch {
      const manual = value
        .split(/[\n,]/)
        .map((url) => url.trim())
        .filter(Boolean);
      return manual.length ? JSON.stringify(manual) : null;
    }
  }
  if (Array.isArray(value)) {
    const cleaned = value.map((url) => url.trim()).filter(Boolean);
    return cleaned.length ? JSON.stringify(cleaned) : null;
  }
  return null;
};

const mapProductRow = (row) => ({
  ...row,
  is_featured: !!row.is_featured,
  is_new: !!row.is_new,
  is_best_seller: !!row.is_best_seller,
  gallery_images: parseGallery(row.gallery_images),
});

const getProducts = async (filters = {}) => {
  const { whereClause, params } = buildFilterQuery(filters);
  const [rows] = await pool.query(
    `SELECT p.*, c.name as category_name
     FROM products p
     LEFT JOIN categories c ON p.category_id = c.id
     ${whereClause}
     ORDER BY p.created_at DESC`,
    params
  );
  return rows.map(mapProductRow);
};

const getProductById = async (id) => {
  const [rows] = await pool.query(
    `SELECT p.*, c.name as category_name
     FROM products p
     LEFT JOIN categories c ON p.category_id = c.id
     WHERE p.id = ?`,
    [id]
  );
  return rows[0] ? mapProductRow(rows[0]) : null;
};

const createProduct = async (data) => {
  const {
    name,
    description,
    subcategory,
    usage_notes,
    price,
    stock_quantity,
    category_id,
    is_featured,
    is_new,
    is_best_seller,
    image_url,
    gallery_images,
  } = data;

  const [result] = await pool.execute(
    `INSERT INTO products 
      (name, description, subcategory, usage_notes, price, stock_quantity, category_id, is_featured, is_new, is_best_seller, image_url, gallery_images) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      description || '',
      subcategory || null,
      usage_notes || null,
      price,
      stock_quantity,
      category_id,
      is_featured ? 1 : 0,
      is_new ? 1 : 0,
      is_best_seller ? 1 : 0,
      image_url || null,
      serializeGallery(gallery_images),
    ]
  );

  return { id: result.insertId, ...data };
};

const updateProduct = async (id, data) => {
  const {
    name,
    description,
    subcategory,
    usage_notes,
    price,
    stock_quantity,
    category_id,
    is_featured,
    is_new,
    is_best_seller,
    image_url,
    gallery_images,
  } = data;

  await pool.execute(
    `UPDATE products SET 
      name = ?, description = ?, subcategory = ?, usage_notes = ?, price = ?, stock_quantity = ?, 
      category_id = ?, is_featured = ?, is_new = ?, is_best_seller = ?, image_url = ?, gallery_images = ?
     WHERE id = ?`,
    [
      name,
      description || '',
      subcategory || null,
      usage_notes || null,
      price,
      stock_quantity,
      category_id,
      is_featured ? 1 : 0,
      is_new ? 1 : 0,
      is_best_seller ? 1 : 0,
      image_url || null,
      serializeGallery(gallery_images),
      id,
    ]
  );

  return { id, ...data };
};

const deleteProduct = async (id) => {
  await pool.execute('DELETE FROM products WHERE id = ?', [id]);
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

