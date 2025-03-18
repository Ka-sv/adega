document.addEventListener('DOMContentLoaded', function () {
    const produtoForm = document.getElementById("produto-form");
    const listaProdutos = document.getElementById("lista-produtos");

    if (!produtoForm) {
        console.error("Formulário não encontrado. Verifique se existe um elemento com id='produto-form'.");
        return;
    }

    if (!listaProdutos) {
        console.error("Lista de produtos não encontrada. Verifique se existe um elemento com id='lista-produtos'.");
        return;
    }

    produtoForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const imagem = document.getElementById("imagem").value;
        const preco = document.getElementById("preco").value;
        const categoria = document.getElementById("categoria").value;

        const produto = { nome, imagem, preco, categoria };

        fetch("http://localhost:3000/produtos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(produto)
        })
        .then(response => response.json())
        .then(data => {
            alert("Produto cadastrado com sucesso!");
            produtoForm.reset();
            carregarProdutos();
        })
        .catch(error => console.error("Erro ao cadastrar produto:", error));
    });

    function carregarProdutos() {
        fetch("http://localhost:3000/produtos")
            .then(response => response.json())
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
            .catch(error => console.error("Erro ao carregar produtos:", error));
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
        fetch(`http://localhost:3000/produtos/${produtoId}`, {
            method: "DELETE"
        })
        .then(response => {
            if (response.ok) {
                alert("Produto removido com sucesso!");
                carregarProdutos();
            } else {
                alert("Erro ao remover produto.");
            }
        })
        .catch(error => console.error("Erro ao remover produto:", error));
    }

    carregarProdutos();
});
