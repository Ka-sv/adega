const express = require('express');
const app = express();
const cors = require('cors'); 
app.use(cors()); 
require('dotenv').config(); 
const bodyParser = require('body-parser');
const sequelize = require('./config/dbConfig'); 

const produtoRoutes = require('./rotas/produtoRoutes');

app.use(bodyParser.json()); 

sequelize.authenticate()
  .then(() => console.log('✅ Conectado ao PostgreSQL'))
  .catch(err => console.error('❌ Erro ao conectar ao banco de dados:', err));


app.use('/produtos', produtoRoutes); 

app.get('/', (req, res) => {
  res.send('Servidor está rodando!');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
