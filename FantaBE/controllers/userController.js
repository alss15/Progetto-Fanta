const db = require('../models');
const User = db.User;

exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id); 
      if (!user) {
        return res.status(404).json({ message: "Utente non trovato" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error("Errore nel recupero dell'utente:", error);
      res.status(500).json({ message: "Errore interno del server" });
    }
  }

exports.getUserByRole = async (req, res) => {
    const { role } = req.params;
    try {
        const users = await User.findAll({ where: { role } });
      if (users.length === 0) {
        return res.status(404).json({ message: `Nessun utente con ruolo: ${role}` });
      }

      res.status(200).json(users);
    } catch (error) {
      console.error("Errore nel recupero degli utenti per ruolo:", error);
      res.status(500).json({ message: "Errore interno del server" });
    }
  };
