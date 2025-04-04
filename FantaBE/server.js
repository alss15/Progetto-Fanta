const app = require('./app');

const { sequelize } = require('./models');

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
 .then(() => {
 console.log('Database connesso con successo!');
 app.listen(PORT, () => {
 console.log(`Server in ascolto sulla porta ${PORT}`);
 });
 })
 .catch(err => {
 console.error('Errore di connessione al database:', err);
 });