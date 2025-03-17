
document.addEventListener("DOMContentLoaded", function () {
    const bebidasContainer = document.querySelector(".bebidas-container");
    const pesquisaInput = document.getElementById("pesquisa-input");
    const pesquisaBtn = document.getElementById("pesquisa-btn");
    const limparBtn = document.getElementById("limpar-pesquisa");

    // Função para buscar produtos
    async function buscarProdutos(termo) {
        try {
            const resposta = await fetch("http://localhost:3000/produtos"); // Ajuste a URL
            const produtos = await resposta.json();

            // Normaliza os nomes para comparar melhor
            const termoNormalizado = termo.toLowerCase().trim();
            let resultados = produtos.filter(produto =>
                produto.nome.toLowerCase().includes(termoNormalizado)
            );

            if (resultados.length === 0) {
                resultados = encontrarMaisProximo(termoNormalizado, produtos);
            }

            exibirResultados(resultados);
        } catch (erro) {
            console.error("Erro ao buscar produtos:", erro);
        }
    }

    // Função para encontrar produtos mais próximos (Distância de Levenshtein)
    function calcularDistanciaLevenshtein(a, b) {
        const matrix = [];

        for (let i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }

        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1, // Substituição
                        Math.min(
                            matrix[i][j - 1] + 1, // Inserção
                            matrix[i - 1][j] + 1 // Remoção
                        )
                    );
                }
            }
        }

        return matrix[b.length][a.length];
    }

    function encontrarMaisProximo(termo, produtos) {
        return produtos.sort((a, b) => {
            return calcularDistanciaLevenshtein(termo, a.nome) - calcularDistanciaLevenshtein(termo, b.nome);
        }).slice(0, 3); // Retorna os 3 mais próximos
    }

    function exibirResultados(produtos) {
        bebidasContainer.innerHTML = '<h1 class="produtos">Resultados da Busca</h1>';
        if (produtos.length === 0) {
            bebidasContainer.innerHTML += "<p>Nenhum produto encontrado.</p>";
            return;
        }

        produtos.forEach(produto => {
            const produtoHTML = `
                <div class="bebida">
                    <img src="${produto.imagem}" alt="${produto.nome}">
                    <h3>${produto.nome}</h3>
                    <p>R$ ${produto.preco.toFixed(2)}</p>
                    <button>Adicionar ao Carrinho</button>
                </div>
            `;
            bebidasContainer.innerHTML += produtoHTML;
        });
    }

    // Adicionando debounce na pesquisa
    let debounceTimer;
    pesquisaInput.addEventListener("input", () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            if (pesquisaInput.value.trim()) {
                buscarProdutos(pesquisaInput.value);
            }
        }, 300); // Aguarda 300ms antes de disparar a requisição
    });

    pesquisaBtn.addEventListener("click", () => {
        buscarProdutos(pesquisaInput.value);
    });

    pesquisaInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            if (pesquisaInput.value.trim()) {
                buscarProdutos(pesquisaInput.value);
            } else {
                carregarProdutos(); // Apenas chama a função existente
            }
        }
    });
    
    limparBtn.addEventListener("click", () => {
        pesquisaInput.value = ""; // Limpa o campo de pesquisa
        buscarProdutos(""); // Chama a função de busca sem um termo, retornando todos os produtos
    });

    // Carregar produtos ao carregar a página
    fetch("http://localhost:3000/produtos")
        .then(response => response.json())
        .then(produtos => {
            produtos.forEach(produto => {
                const bebidaDiv = document.createElement("div");
                bebidaDiv.classList.add("bebida");

                bebidaDiv.innerHTML = `
                    <img src="${produto.imagem}" alt="${produto.nome}">
                    <h3>${produto.nome}</h3>
                    <p>R$ ${produto.preco.toFixed(2)}</p>
                    <button>Adicionar ao Carrinho</button>
                `;

                bebidasContainer.appendChild(bebidaDiv);
            });
        })
        .catch(error => console.error("Erro ao carregar produtos:", error));
});

document.addEventListener("DOMContentLoaded", async function () {
    const categoriaContainer = document.getElementById("categoria-container");

    // Definição das categorias com imagem ilustrativa
    const categorias = [
        { nome: "Cervejas", valor: "cerveja", imagem: "img/cervejas.webp" },
        { nome: "Vinhos", valor: "vinho", imagem: "img/vinhos.Webp" },
        { nome: "Destilados", valor: "destilados", imagem: "img/destilados.png" },
        { nome: "Refrigerantes", valor: "refrigerante", imagem: "img/refrigerante.webp" },
        { nome: "Sucos", valor: "suco", imagem: "img/sucos.jpg" },
        { nome: "Combos", valor: "Combos", imagem: "img/combo-jack-n7.png" },
        { nome: "Churrasco", valor: "Churrasco", imagem: "img/Churrasco.png" },
        { nome: "Ofertas", valor: "Ofertas", imagem: "img/desconto.png" }
    ];

    // Criando os botões de categorias dinamicamente
    categorias.forEach(categoria => {
        const button = document.createElement("button");
        button.classList.add("filter-btn");
        button.setAttribute("data-category", categoria.valor);

        // Estrutura do botão com imagem e nome da categoria
        button.innerHTML = `
            <div class="categoria-card">
                <img src="${categoria.imagem}" alt="${categoria.nome}">
                <span class="categoria-nome">${categoria.nome}</span>
            </div>
        `;

        // Adiciona evento de clique para filtrar produtos
        button.addEventListener("click", () => filtrarProdutos(categoria.valor));

        categoriaContainer.appendChild(button);
    });
});


// Função para filtrar produtos pela categoria selecionada
async function filtrarProdutos(categoriaSelecionada) {
    try {
        const response = await fetch("http://localhost:3000/produtos");
        const produtos = await response.json();

        const produtosFiltrados = produtos.filter(produto => produto.categoria.toLowerCase() === categoriaSelecionada.toLowerCase());

        const produtosContainer = document.querySelector(".bebidas-container");
        produtosContainer.innerHTML = "";

        if (produtosFiltrados.length === 0) {
            produtosContainer.innerHTML = "<p>Nenhum produto encontrado para essa categoria.</p>";
            return;
        }

        produtosFiltrados.forEach(produto => {
            produtosContainer.innerHTML += `
                <div class="bebida">
                    <img src="${produto.imagem}" alt="${produto.nome}">
                    <h3>${produto.nome}</h3>
                    <p>R$ ${produto.preco}</p>
                    <button>Adicionar ao Carrinho</button>
                </div>
            `;
        });

    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
    }
}
