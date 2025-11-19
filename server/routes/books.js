const express = require('express');
const router = express.Router();
const booksController = require('../controllers/bookController')

router.get('/', booksController.getAll);
router.post('/', booksController.create);
router.put('/:id', booksController.update);
router.delete('/:id', booksController.deleteBook);

module.exports = router;
