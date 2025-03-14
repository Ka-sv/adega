const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig'); // Importa a conexão com o banco

// Definição do modelo Produto
const Produto = sequelize.define('Produto', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  imagem: {
    type: DataTypes.STRING, // URL da imagem
    allowNull: false
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false // Desativa os campos createdAt e updatedAt
});

// Sincronizando o modelo com o banco de dados
Produto.sync({ alter: true }) // Altera a tabela sem perder dados
  .then(() => console.log('✅ Tabela de produtos sincronizada'))
  .catch(err => console.error('❌ Erro ao sincronizar o modelo:', err));

module.exports = Produto;
