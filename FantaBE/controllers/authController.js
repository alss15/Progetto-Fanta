const { User } = require('../models');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
    const { nome, cognome, username, password, role } = req.body;
    // (1) Controlli base
    if (!username || !password || !role) {
    return res.status(400).json({ error: 'Tutti i campi sono richiesti' });
    }
    // (2) Verifica se utente esiste già
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
    return res.status(400).json({ error: 'Username già in uso' });
    }
  // (3) Hash password
   const hashedPassword = await bcrypt.hash(password, 10);
 // (4) Crea utente
   const newUser = await User.create({
     nome,
     cognome,
     username,
     password: hashedPassword,
     role });
  return res.status(201).json({ message: 'Utente creato', userId: newUser.id
 });
 } catch (err) {
 console.error('Errore register:', err);
 return res.status(500).json({ error: 'Errore server' });
 }
};


// Segreto per firmare i token. Meglio se in variabile d'ambiente
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

exports.login = async (req, res) => {
 try {
 const { username, password } = req.body;
 // (1) Validazioni base
 if (!username || !password ) {
    return res.status(400).json({ error: 'Tutti i campi sono richiesti' });
    }
    // (2) Trova utente
    const user = await User.findOne({ where: { username } });
    if (!user) {
    return res.status(401).json({ error: 'Credenziali non valide' });
    }
    // (3) Confronta password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
    return res.status(401).json({ error: 'Password errata' });
    }
    // (4) Genera token
    const payload = { userId: user.id, role: user.role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
    // (5) Risposta col token
    return res.json({ token, user});
    
    } catch (err) {
    console.error('Errore login:', err);
    return res.status(500).json({ error: 'Errore server' });
    }
};
   
