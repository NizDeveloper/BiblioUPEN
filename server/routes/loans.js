const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

router.get('/', loanController.getAll);
router.post('/', loanController.create);
router.get('/student/:enrollment', loanController.getByStudent);
router.put('/:id/return', loanController.returnBook);
router.put('/:id/extend', loanController.extendDueDate);

module.exports = router;
