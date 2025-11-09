const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/', studentController.getAll);
router.post('/', studentController.create);
router.put('/:enrollment', studentController.update);
router.delete('/:enrollment', studentController.delete);

module.exports = router;
