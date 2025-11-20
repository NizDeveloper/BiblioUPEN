const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

router.get('/', loanController.getAll);
router.get('/student/:enrollment', loanController.getByStudent);
router.post('/', loanController.create);
router.put('/:id/return', loanController.returnBook);

module.exports = router;