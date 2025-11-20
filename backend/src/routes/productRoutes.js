const express = require('express');
const { body } = require('express-validator');
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);

const productValidators = [
  body('name').notEmpty().withMessage('Name is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be positive'),
  body('stock_quantity').isInt({ min: 0 }).withMessage('Stock must be 0 or more'),
  body('category_id').isInt().withMessage('Category is required'),
  body('subcategory').optional({ checkFalsy: true }).isLength({ max: 120 }).withMessage('Subcategory must be under 120 characters'),
  body('usage_notes').optional({ checkFalsy: true }).isLength({ max: 255 }).withMessage('Usage notes too long'),
  body('image_url').optional({ checkFalsy: true }).isURL().withMessage('Image URL must be valid'),
  body('gallery_images')
    .optional({ checkFalsy: true })
    .custom((value) => Array.isArray(value) || typeof value === 'string')
    .withMessage('Gallery images must be an array or string list'),
  body('is_featured').optional().isBoolean(),
  body('is_new').optional().isBoolean(),
  body('is_best_seller').optional().isBoolean(),
];

router.post('/', authMiddleware, productValidators, productController.createProduct);
router.put('/:id', authMiddleware, productValidators, productController.updateProduct);
router.delete('/:id', authMiddleware, productController.deleteProduct);

module.exports = router;

