const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');

// Tutti gli utenti
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.get('/role/:role', userController.getUserByRole);

module.exports = router;