document.addEventListener("DOMContentLoaded", function () {
    const bebidasContainer = document.querySelector(".bebidas-container");
    const categoriaContainer = document.getElementById("categoria-container");

    if (!bebidasContainer) {
        console.error("Erro: O elemento .bebidas-container não foi encontrado.");
        return;
    }

    if (!categoriaContainer) {
        console.error("Erro: O elemento #categoria-container não foi encontrado.");
        return;
    }

    console.log("✅ Elementos encontrados. Carregando produtos e categorias...");

    async function carregarProdutos(categoriaSelecionada = null) {
        try {
            const resposta = await fetch("https://adega-teste.onrender.com/produtos");
                                        
            if (!resposta.ok) {
                const textoErro = await resposta.text();
                throw new Error(textoErro);
            }
            const produtos = await resposta.json();

            bebidasContainer.innerHTML = "";

            const produtosFiltrados = categoriaSelecionada
                ? produtos.filter(produto => produto.categoria === categoriaSelecionada)
                : produtos;

            if (produtosFiltrados.length === 0) {
                bebidasContainer.innerHTML = "<p>Nenhum produto encontrado.</p>";
                return;
            }

            produtosFiltrados.forEach(produto => {
                bebidasContainer.innerHTML += `
                    <div class="bebida">
                        <img src="${produto.imagem}" alt="${produto.nome}">
                        <h3>${produto.nome}</h3>
                        <p>R$ ${produto.preco.toFixed(2)}</p>
                    </div>
                `;
            });

            console.log(`✅ Produtos carregados (${produtosFiltrados.length})`);
        } catch (erro) {
            console.error("❌ Erro ao carregar produtos:", erro.message);
        }
    }

    async function carregarCategorias() {
        try {
            const resposta = await fetch("https://adega-teste.onrender.com/produtos");
            if (!resposta.ok) {
                const textoErro = await resposta.text();
                throw new Error(textoErro);
            }
            const produtos = await resposta.json();

            categoriaContainer.innerHTML = "";
            let categorias = new Set(produtos.map(produto => produto.categoria));

            categorias.forEach(categoria => {
                const button = document.createElement("button");
                button.textContent = categoria;
                button.classList.add("categoria-btn");
                button.addEventListener("click", () => {
                    console.log(`🔍 Filtrando por categoria: ${categoria}`);
                    carregarProdutos(categoria);
                });
                categoriaContainer.appendChild(button);
            });

            console.log("✅ Categorias carregadas:", categorias);
        } catch (erro) {
            console.error("❌ Erro ao carregar categorias:", erro.message);
        }
    }

    carregarProdutos();
    carregarCategorias();
});
