const express = require('express');
const { body } = require('express-validator');
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', categoryController.listCategories);

const categoryValidators = [body('name').notEmpty().withMessage('Name is required')];

router.post('/', authMiddleware, categoryValidators, categoryController.createCategory);
router.put('/:id', authMiddleware, categoryValidators, categoryController.updateCategory);
router.delete('/:id', authMiddleware, categoryController.deleteCategory);

module.exports = router;

