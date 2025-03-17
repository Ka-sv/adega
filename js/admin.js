
// Função para buscar e renderizar os produtos da API
async function buscarProdutos() {
    try {
        const response = await fetch('http://localhost:3000/produtos');
        if (response.ok) {
            const produtos = await response.json();
            renderizarProdutos(produtos);
        } else {
            alert('Erro ao buscar produtos.');
        }
    } catch (error) {
        console.error('Erro de conexão:', error);
        alert('Erro ao conectar à API.');
    }
}

// Função para renderizar os produtos na página de administração
function renderizarProdutos(produtos) {
    const bebidasContainer = document.querySelector('.bebidas-container');
    bebidasContainer.innerHTML = ''; // Limpa a container antes de renderizar

    produtos.forEach(produto => {
        const divBebida = document.createElement('div');
        divBebida.classList.add('bebida');
        divBebida.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <p>R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
            <button class="remover-btn" data-id="${produto.id}">Remover</button>
        `;
        bebidasContainer.appendChild(divBebida);
    });

    adicionarEventoRemover(); // Adiciona eventos aos botões de remover
}

// Função para carregar produtos e exibi-los na lista
function carregarProdutos() {
    fetch("http://localhost:3000/produtos")
        .then(response => response.json())
        .then(produtos => {
            const lista = document.getElementById("lista-produtos");
            lista.innerHTML = ""; // Limpa a lista antes de recarregar

            produtos.forEach(produto => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <strong>${produto.nome}</strong> - R$ ${produto.preco.toFixed(2)}
                    <button class="remover-btn" data-id="${produto.id}">Remover</button>
                `;
                lista.appendChild(li);
            });

            adicionarEventoRemover(); // Adiciona eventos aos botões de remover
        })
        .catch(error => console.error("Erro ao carregar produtos:", error));
}

// Função para remover um produto da API
function removerProduto(produtoId) {
    fetch(`http://localhost:3000/produtos/${produtoId}`, {
        method: "DELETE"
    })
    .then(response => {
        if (response.ok) {
            alert("Produto removido com sucesso!");
            carregarProdutos(); // Atualiza a lista após remover
        } else {
            alert("Erro ao remover produto.");
        }
    })
    .catch(error => console.error("Erro ao remover produto:", error));
}

// Função para adicionar eventos de clique aos botões de remover
function adicionarEventoRemover() {
    document.querySelectorAll(".remover-btn").forEach(botao => {
        botao.addEventListener("click", () => {
            const produtoId = botao.getAttribute("data-id");
            removerProduto(produtoId);
        });
    });
}

// Chama a função carregarProdutos() quando a página de administração é carregada
document.addEventListener('DOMContentLoaded', function () {
    const produtoForm = document.getElementById("produto-form");

    if (produtoForm) {  // Verifica se o formulário existe na página
        produtoForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const nome = document.getElementById("nome").value;
            const imagem = document.getElementById("imagem").value;
            const preco = document.getElementById("preco").value;
            const categoria = document.getElementById("categoria").value;

            const produto = { nome, imagem, preco, categoria };

            // Enviar o produto via API
            fetch("http://localhost:3000/produtos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(produto)
            })
            .then(response => response.json())
            .then(data => {
                alert("Produto cadastrado com sucesso!");
                produtoForm.reset(); // Limpar o formulário após o envio
                carregarProdutos(); // Atualizar a lista de produtos cadastrados
            })
            .catch(error => console.error("Erro ao cadastrar produto:", error));
        });
    } else {
        console.error("Formulário não encontrado.");
    }

    carregarProdutos(); // Carregar os produtos na inicialização da página
});

function atualizarProdutosPeriodicamente() {
    setInterval(() => {
        carregarProdutos(); // Chama a função que carrega os produtos da API
    }, 5000); // Atualiza a cada 5 segundos
}

// Chama a função assim que a página carrega
document.addEventListener('DOMContentLoaded', () => {
    atualizarProdutosPeriodicamente();
});
