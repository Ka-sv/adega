document.addEventListener('DOMContentLoaded', function () {
    const produtoForm = document.getElementById("produto-form");
    const listaProdutos = document.getElementById("lista-produtos");

    if (!produtoForm || !listaProdutos) {
        console.error("Erro ao encontrar elementos necessários na página.");
        return;
    }

    produtoForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const imagem = document.getElementById("imagem").value;
        const preco = document.getElementById("preco").value;
        const categoria = document.getElementById("categoria").value;

        const produto = { nome, imagem, preco, categoria };

        fetch("https://adega-xz4s.onrender.com/produtos", {
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
            alert("Produto cadastrado com sucesso!");
            produtoForm.reset();
            carregarProdutos();
        })
        .catch(error => console.error("Erro ao cadastrar produto:", error.message));
    });

    function carregarProdutos() {
        fetch("https://adega-xz4s.onrender.com/produtos")
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text); });
                }
                return response.json();
            })
            .then(produtos => {
                listaProdutos.innerHTML = "";
                produtos.forEach(produto => {
                    const li = document.createElement("li");
                    li.innerHTML = `<strong>${produto.nome}</strong> - R$ ${produto.preco.toFixed(2)}
                        <button class="remover-btn" data-id="${produto.id}">Remover</button>`;
                    listaProdutos.appendChild(li);
                });

                adicionarEventoRemover();
            })
            .catch(error => console.error("Erro ao carregar produtos:", error.message));
    }

    function adicionarEventoRemover() {
        document.querySelectorAll(".remover-btn").forEach(botao => {
            botao.addEventListener("click", function () {
                const produtoId = botao.getAttribute("data-id");
                removerProduto(produtoId);
            });
        });
    }

    function removerProduto(produtoId) {
        fetch(`https://adega-xz4s.onrender.com/produtos/${produtoId}`, {
            method: "DELETE"
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao remover produto.");
            }
            alert("Produto removido com sucesso!");
            carregarProdutos();
        })
        .catch(error => console.error("Erro ao remover produto:", error.message));
    }

    carregarProdutos();
});
