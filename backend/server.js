const express = require('express');
const app = express();
const cors = require('cors'); // Importar o CORS
app.use(cors()); // Habilitar CORS para todas as rotas


require('dotenv').config();
const bodyParser = require('body-parser');

const sequelize = require('./config/dbConfig');


 // Importa a conexão do banco
const produtoRoutes = require('./rotas/produtoRoutes'); // Importa as rotas de produtos

// Criando o servidor Express

app.use(bodyParser.json());

// Testando a conexão com o banco
sequelize.authenticate()
  .then(() => console.log('✅ Conectado ao PostgreSQL'))
  .catch(err => console.error('❌ Erro ao conectar:', err));

// Rotas
app.use('/produtos', produtoRoutes); // Agora as rotas de produtos estão separadas

// Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor está rodando!');
});

// Definição da porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
