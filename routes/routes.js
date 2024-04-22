const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.js');

router.get('/api/cards', controller.getAllKittens);
router.post('/api/cards', controller.createKitten);
router.get('/', controller.getIndex);
router.delete('/api/cards/:id', controller.deleteKitten);

module.exports = router;
