// Seleciona os elementos do formulário e da lista
const form = document.getElementById('produto-form');
const listaProdutos = document.getElementById('lista-produtos');

// Função para carregar os produtos do localStorage
function carregarProdutos() {
    if (!listaProdutos) return; // Evita erro se a lista não existir na página

    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    listaProdutos.innerHTML = '';

    produtos.forEach((produto, index) => {
        // Garante que o caminho da imagem comece com "img/"
        const caminhoImagem = produto.imagem.startsWith("img/") ? produto.imagem : `img/${produto.imagem}`;

        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${caminhoImagem}" alt="${produto.nome}" width="50">
            ${produto.nome} - R$ ${produto.preco.toFixed(2).replace('.', ',')}
            <button onclick="removerProduto(${index})">Remover</button>
        `;

        listaProdutos.appendChild(li);
    });
}

// Carregar bebidas dinamicamente do localStorage
function carregarBebidas(filtro = '') {
    const bebidas = JSON.parse(localStorage.getItem('produtos')) || [];
    const container = document.querySelector('.bebidas-container');

    container.innerHTML = '<h1 class="produtos">Confira as nossas ofertas</h1>';

    if (bebidas.length === 0) {
        container.innerHTML += '<p>Nenhuma bebida cadastrada ainda.</p>';
        return;
    }

    // Filtra os produtos pelo nome digitado
    const bebidasFiltradas = bebidas.filter(bebida => 
        bebida.nome.toLowerCase().includes(filtro)
    );

    if (bebidasFiltradas.length === 0) {
        // Se não encontrou nada, tentar sugerir produtos semelhantes
        const sugestoes = bebidas
            .map(bebida => bebida.nome)
            .filter(nome => verificarSimilaridade(nome, filtro));

        container.innerHTML += `<p>Nenhum produto encontrado.</p>`;

        if (sugestoes.length > 0) {
            container.innerHTML += `<p>Você quis dizer: <strong>${sugestoes.join(", ")}</strong>?</p>`;
        }

        return;
    }

    // Exibe apenas os produtos filtrados
    bebidasFiltradas.forEach(bebida => {
        const bebidaDiv = document.createElement('div');
        bebidaDiv.classList.add('bebida');
        bebidaDiv.innerHTML = `
            <img src="${bebida.imagem}" alt="${bebida.nome}">
            <h3>${bebida.nome}</h3>
            <p>R$ ${bebida.preco.toFixed(2).replace('.', ',')}</p>
            <button>Adicionar ao Carrinho</button>
        `;
        container.appendChild(bebidaDiv);
    });
}

// Função que verifica se há palavras semelhantes
function verificarSimilaridade(nomeProduto, termoDigitado) {
    // Transforma em minúsculas para comparação
    nomeProduto = nomeProduto.toLowerCase();
    termoDigitado = termoDigitado.toLowerCase();

    // Divide os nomes em palavras e verifica se alguma é parecida com o termo
    return nomeProduto.split(" ").some(palavra => 
        palavra.startsWith(termoDigitado) || palavra.includes(termoDigitado)
    );
}

// Função para adicionar um produto
if (form) { 
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const nome = document.getElementById('nome').value.trim();
        const imagem = document.getElementById('imagem').value.trim();
        const preco = parseFloat(document.getElementById('preco').value.replace(',', '.'));
        const categoria = document.getElementById('categoria').value.trim().toLowerCase(); // Pega a categoria escolhida

        if (!nome || !imagem || isNaN(preco) || !categoria) {
            alert('Preencha todos os campos corretamente!');
            return;
        }

        const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        produtos.push({ nome, imagem, preco, categoria }); // Agora salva com a categoria
        localStorage.setItem('produtos', JSON.stringify(produtos));

        form.reset();
        carregarProdutos(); // Atualiza no painel de administração
        carregarBebidas();  // Atualiza no index.html
    });
}
 else {
    console.warn("Elemento #produto-form não encontrado. O código de administração não será executado nesta página.");
}


// Função para remover um produto
function removerProduto(index) {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos.splice(index, 1);
    localStorage.setItem('produtos', JSON.stringify(produtos));
    carregarProdutos();  // Atualiza no painel de administração
    carregarBebidas();   // Atualiza no index.html
}


// Carregar os produtos ao iniciar a página
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.bebidas-container')) {
        console.log("Chamando carregarBebidas() no index.html...");
        carregarBebidas();
    }

    if (document.getElementById('produto-form')) {
        console.log("Chamando carregarProdutos() no administracao.html...");
        carregarProdutos();
    }
});
