const express = require('express');
const router = express.Router();
const sfidaController = require ('../controllers/sfidaController');
const authMiddleware = require('../middleware/authMiddleware')

router.post('/',authMiddleware, sfidaController.createSfida);
router.get('/', sfidaController.getAllSfide);
router.get('/:id', sfidaController.getSfidaById);
router.put('/:id',authMiddleware,  sfidaController.updateSfida);
router.delete('/:id', authMiddleware, sfidaController.deleteSfida);

module.exports = router;
