const express = require('express');
const router = express.Router();
const booksController = require('../controllers/bookController')

router.get('/', booksController.getAll);
router.delete('/:id', booksController.deleteBook);


module.exports = router;
