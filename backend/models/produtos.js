const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

// Definição do modelo Produto
const produto = sequelize.define('produto', {
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
  tableName: 'produtos', // Força o Sequelize a usar o nome correto da tabela
  timestamps: false
});

// Sincronizando o modelo com o banco de dados
produto.sync() // Removendo `alter: true` para evitar conflitos no Render
  .then(() => console.log('✅ Tabela de produtos sincronizada'))
  .catch(err => console.error('❌ Erro ao sincronizar o modelo:', err));

module.exports = produto;
