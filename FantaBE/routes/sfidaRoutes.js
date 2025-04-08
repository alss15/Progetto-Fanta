const express = require("express");
const router = express.Router();
const sfidaController = require ('../controllers/sfidaController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', sfidaController.createSfida);
router.get('/', sfidaController.getAllSfide);
router.get('/:id', sfidaController.getSfidaById);
router.put('/:id', sfidaController.updateSfida);
router.delete('/:id', sfidaController.deleteSfida);

module.exports = router;
