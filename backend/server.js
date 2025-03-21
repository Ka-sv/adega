const express = require('express');
const app = express();
const cors = require('cors'); // Importar o CORS
app.use(cors()); // Habilitar CORS para todas as rotas

require('dotenv').config(); // Carregar variáveis de ambiente do arquivo .env
const bodyParser = require('body-parser');
const sequelize = require('./config/dbConfig'); // Importa a conexão com o banco de dados

// Importa as rotas de produtos
const produtoRoutes = require('./rotas/produtoRoutes');

// Criando o servidor Express
app.use(bodyParser.json()); // Middleware para análise de JSON no corpo da requisição
app.use(express.json());  // Para processar o corpo das requisições JSON (já está sendo feito pelo bodyParser)

// Testando a conexão com o banco de dados
sequelize.authenticate()
  .then(() => console.log('✅ Conectado ao PostgreSQL'))
  .catch(err => console.error('❌ Erro ao conectar ao banco de dados:', err));

// Rotas
app.use('/produtos', produtoRoutes); // Define as rotas de produtos

// Rota de teste para verificar se o servidor está rodando
app.get('/', (req, res) => {
  res.send('Servidor está rodando!');
});

// Definindo a porta
const PORT = process.env.PORT || 3000; // Usa a porta do Render ou 3000 localmente
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
