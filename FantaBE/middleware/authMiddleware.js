const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
    return res.status(401).json({ error: 'Token assente' });
    }
    // authHeader di solito è "Bearer <token>"
    const token = authHeader.split(' ')[1];
    if (!token) {
    return res.status(401).json({ error: 'Token malformato' });
    }
    try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Salviamo le info decode sul req per usarle dopo
    req.user = decoded;
    next(); // passa al controller successivo
    } catch (err) {
    console.error('authMiddleware error:', err);
    return res.status(403).json({ error: 'Token non valido' });
    }
   };
   