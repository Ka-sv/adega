document.addEventListener("DOMContentLoaded", function () {
    console.log("🔄 Iniciando admin.js...");

    // Obtendo os elementos do formulário e da lista de produtos
    const produtoForm = document.getElementById("produto-form");
    const listaProdutos = document.getElementById("lista-produtos");

    if (!produtoForm || !listaProdutos) {
        console.error("❌ Erro ao encontrar elementos necessários na página. Certifique-se de que está na página correta.");
        return;
    }

    console.log("✅ Elementos encontrados. Pronto para interações.");

    // 🛒 Função para cadastrar um novo produto
    produtoForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const imagem = document.getElementById("imagem").value.trim();
        const preco = parseFloat(document.getElementById("preco").value);
        const categoria = document.getElementById("categoria").value.trim();

        if (!nome || !imagem || isNaN(preco) || !categoria) {
            alert("⚠️ Preencha todos os campos corretamente!");
            return;
        }

        const produto = { nome, imagem, preco, categoria };

        console.log("📤 Enviando produto:", produto);

        fetch("https://adega-teste.onrender.com/produtos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(produto)
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text); });
            }
            return response.json();
        })
        .then(() => {
            alert("✅ Produto cadastrado com sucesso!");
            produtoForm.reset();
            carregarProdutos();
        })
        .catch(error => console.error("❌ Erro ao cadastrar produto:", error.message));
    });

    // 📦 Função para carregar os produtos
    function carregarProdutos() {
        console.log("🔄 Carregando produtos...");
        fetch("https://adega-teste.onrender.com/produtos")
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text); });
                }
                return response.json();
            })
            .then(produtos => {
                listaProdutos.innerHTML = "";

                if (produtos.length === 0) {
                    listaProdutos.innerHTML = "<p>⚠️ Nenhum produto cadastrado.</p>";
                    return;
                }

                produtos.forEach(produto => {
                    const li = document.createElement("li");
                    li.innerHTML = `
                        <strong>${produto.nome}</strong> - R$ ${produto.preco.toFixed(2)}
                        <button class="remover-btn" data-id="${produto.id}">🗑️ Remover</button>
                    `;
                    listaProdutos.appendChild(li);
                });

                console.log(`✅ ${produtos.length} produtos carregados.`);
                adicionarEventoRemover();
            })
            .catch(error => console.error("❌ Erro ao carregar produtos:", error.message));
    }

    // 🗑️ Função para adicionar evento de remoção aos botões
    function adicionarEventoRemover() {
        document.querySelectorAll(".remover-btn").forEach(botao => {
            botao.addEventListener("click", function () {
                const produtoId = botao.getAttribute("data-id");
                removerProduto(produtoId);
            });
        });
    }

    // 🚮 Função para remover um produto
    function removerProduto(produtoId) {
        console.log(`🗑️ Removendo produto ID: ${produtoId}`);
        fetch(`https://adega-teste.onrender.com/produtos${produtoId}`, {
            method: "DELETE"
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao remover produto.");
            }
            alert("✅ Produto removido com sucesso!");
            carregarProdutos();
        })
        .catch(error => console.error("❌ Erro ao remover produto:", error.message));
    }

    // 🔄 Carregar produtos ao abrir a página
    carregarProdutos();
});
