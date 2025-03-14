const { Sequelize } = require('sequelize');
require('dotenv').config(); // Carrega variáveis do .env

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false, // Desativa logs no console
});

sequelize.authenticate()
    .then(() => console.log('✅ Conectado ao PostgreSQL'))
    .catch(err => console.error('❌ Erro ao conectar:', err));

module.exports = sequelize;
