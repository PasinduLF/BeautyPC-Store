const express = require('express');
const { body } = require('express-validator');
const subcategoryController = require('../controllers/subcategoryController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', subcategoryController.listSubcategories);

const subcategoryValidators = [
  body('category_id').isInt().withMessage('Category is required'),
  body('name').notEmpty().withMessage('Name is required'),
];

router.post('/', authMiddleware, subcategoryValidators, subcategoryController.createSubcategory);
router.put(
  '/:id',
  authMiddleware,
  subcategoryValidators,
  subcategoryController.updateSubcategory
);
router.delete('/:id', authMiddleware, subcategoryController.deleteSubcategory);

module.exports = router;

