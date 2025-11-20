const { validationResult } = require('express-validator');
const productModel = require('../models/productModel');

const parseBoolean = (value) => {
  if (typeof value === 'undefined') return undefined;
  if (typeof value === 'string') {
    if (value.length === 0) return undefined;
    return value === 'true' || value === '1';
  }
  return Boolean(value);
};

const getProducts = async (req, res) => {
  const { category, minPrice, maxPrice, featured, subcategory, isNew, isBestSeller } = req.query;
  const filters = {
    categoryId: category,
    subCategory: subcategory,
    minPrice,
    maxPrice,
    isFeatured: parseBoolean(featured),
    isNew: parseBoolean(isNew),
    isBestSeller: parseBoolean(isBestSeller),
  };

  const products = await productModel.getProducts(filters);
  res.json(products);
};

const getProduct = async (req, res) => {
  const product = await productModel.getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
};

const createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const product = await productModel.createProduct(req.body);
  res.status(201).json(product);
};

const updateProduct = async (req, res) => {
  const product = await productModel.getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const updated = await productModel.updateProduct(req.params.id, req.body);
  res.json(updated);
};

const deleteProduct = async (req, res) => {
  const product = await productModel.getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  await productModel.deleteProduct(req.params.id);
  res.json({ message: 'Product removed' });
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};

