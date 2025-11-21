const { validationResult } = require('express-validator');
const subcategoryModel = require('../models/subcategoryModel');
const categoryModel = require('../models/categoryModel');

const listSubcategories = async (req, res) => {
  const { category_id } = req.query;
  const subcategories = await subcategoryModel.getSubcategories(category_id);
  res.json(subcategories);
};

const createSubcategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const category = await categoryModel.getCategoryById(req.body.category_id);
  if (!category) {
    return res.status(400).json({ message: 'Category not found' });
  }

  const subcategory = await subcategoryModel.createSubcategory(req.body);
  res.status(201).json(subcategory);
};

const updateSubcategory = async (req, res) => {
  const subcategory = await subcategoryModel.getSubcategoryById(req.params.id);
  if (!subcategory) {
    return res.status(404).json({ message: 'Subcategory not found' });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const category = await categoryModel.getCategoryById(req.body.category_id);
  if (!category) {
    return res.status(400).json({ message: 'Category not found' });
  }

  const updated = await subcategoryModel.updateSubcategory(req.params.id, req.body);
  res.json(updated);
};

const deleteSubcategory = async (req, res) => {
  const subcategory = await subcategoryModel.getSubcategoryById(req.params.id);
  if (!subcategory) {
    return res.status(404).json({ message: 'Subcategory not found' });
  }

  await subcategoryModel.deleteSubcategory(req.params.id);
  res.json({ message: 'Subcategory removed' });
};

module.exports = {
  listSubcategories,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
};

