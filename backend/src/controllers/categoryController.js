const { validationResult } = require('express-validator');
const categoryModel = require('../models/categoryModel');

const listCategories = async (req, res) => {
  const categories = await categoryModel.getCategories();
  res.json(categories);
};

const createCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const category = await categoryModel.createCategory(req.body);
  res.status(201).json(category);
};

const updateCategory = async (req, res) => {
  const category = await categoryModel.getCategoryById(req.params.id);
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const updated = await categoryModel.updateCategory(req.params.id, req.body);
  res.json(updated);
};

const deleteCategory = async (req, res) => {
  const category = await categoryModel.getCategoryById(req.params.id);
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }

  await categoryModel.deleteCategory(req.params.id);
  res.json({ message: 'Category removed' });
};

module.exports = {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};

