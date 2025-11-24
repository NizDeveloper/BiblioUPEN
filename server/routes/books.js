const express = require('express');
const router = express.Router();
const booksController = require('../controllers/bookController')

router.get('/', booksController.getAll);
router.post('/', booksController.create);
router.put('/:isbn', booksController.update);
router.delete('/:isbn', booksController.delete);


module.exports = router;
