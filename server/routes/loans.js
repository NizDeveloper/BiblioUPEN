const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

router.get('/', loanController.getAll);
router.post('/', loanController.create);
router.put('/:id/extend', loanController.extendDueDate);
router.delete('/:id', loanController.delete);
router.get('/student/:enrollment', loanController.getByStudent);
router.put('/:id/return', loanController.returnBook);
router.get('/book/:bookId', loanController.getByBook);

module.exports = router;
