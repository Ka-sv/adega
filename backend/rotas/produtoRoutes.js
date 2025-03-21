const express = require('express');
const Produto = require('../models/produtos'); // Certifique-se de que o caminho para o arquivo 'produtos.js' esteja correto.
const router = express.Router();

// Rota para adicionar um produto
router.post('/', async (req, res) => {
  try {
    const { nome, imagem, preco, categoria } = req.body; // Desestruturando os dados do corpo da requisição
    const produto = await Produto.create({ nome, imagem, preco, categoria }); // Usando o método 'create' do Sequelize para criar o produto
    res.status(201).json(produto); // Retornando o produto criado como resposta
  } catch (error) {
    res.status(400).json({ error: error.message }); // Retornando erro se algo der errado
  }
});

// Rota para listar os produtos
router.get('/', async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    console.log('Produtos encontrados:', produtos);  // Adicionando um log para verificar os produtos
    if (produtos.length === 0) {
      console.log('Nenhum produto encontrado');
      return res.status(404).json({ error: 'Nenhum produto encontrado' });
    }
    res.json(produtos);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);  // Log do erro
    res.status(500).json({ error: error.message });
  }
});

router.get("/produtos", async (req, res) => {
  try {
      const produtos = await Produto.findAll();
      res.json(produtos);
  } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      res.status(500).json({ error: "Erro ao buscar produtos" });
  }
});

router.delete('/:id', async (req, res) => {
  const produtoId = req.params.id;
  try {
      const produto = await Produto.destroy({
          where: {
              id: produtoId
          }
      });
      
      if (produto) {
          res.status(200).json({ message: 'Produto removido com sucesso' });
      } else {
          res.status(404).json({ error: 'Produto não encontrado' });
      }
  } catch (error) {
      console.error('Erro ao remover produto:', error);
      res.status(500).json({ error: 'Erro ao remover produto' });
  }
});




module.exports = router;
