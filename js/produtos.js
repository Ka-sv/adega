// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = require('../config/dbConfig');

// const Produto = sequelize.define('Produto', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,  // Similar ao SERIAL no PostgreSQL
//   },
//   nome: {
//     type: DataTypes.STRING(100),
//     allowNull: false,
//   },
//   imagem: {
//     type: DataTypes.STRING(255),
//     allowNull: false,
//   },
//   preco: {
//     type: DataTypes.DECIMAL(10, 2), // Usando DECIMAL para preço
//     allowNull: false,
//   },
//   categoria: {
//     type: DataTypes.STRING(50),
//     allowNull: false,
//   }
// }, {
//   timestamps: false,  // Desabilitar os timestamps se não quiser que o Sequelize adicione `createdAt` e `updatedAt`
//   tableName: 'Produtos'  // Nome da tabela, para garantir que seja igual ao que você criou no banco
// });

// module.exports = Produto;
