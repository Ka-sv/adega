document.addEventListener("DOMContentLoaded", function () {
    let carrinho = [];
    const botaoCarrinho = document.getElementById("cart-btn-fixed");
    const modalCarrinho = document.createElement("div");
    modalCarrinho.id = "modal-carrinho";
    modalCarrinho.classList.add("modal");
    modalCarrinho.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h2>Seu Carrinho</h2>
            <ul id="lista-carrinho"></ul>
            <p><strong>Total:</strong> R$ <span id="total-preco">0.00</span></p>
        </div>
    `;
    document.body.appendChild(modalCarrinho);

    function atualizarCarrinho() {
        const listaCarrinho = document.getElementById("lista-carrinho");
        const totalPreco = document.getElementById("total-preco");
        listaCarrinho.innerHTML = "";
        let total = 0;

        carrinho.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${item.nome} - R$ ${item.preco.toFixed(2)}
                <button class="remover-item" data-index="${index}">Remover</button>
            `;
            listaCarrinho.appendChild(li);
            total += item.preco;
        });
        totalPreco.textContent = total.toFixed(2);
    }

    function adicionarEventosBotoes() {
        document.querySelectorAll(".bebidas-container button").forEach(botao => {
            botao.addEventListener("click", function () {
                const produtoDiv = botao.closest(".bebida");
                const nome = produtoDiv.querySelector("h3").textContent;
                const precoTexto = produtoDiv.querySelector("p").textContent;
                const preco = parseFloat(precoTexto.replace("R$ ", "").replace(",", "."));
                
                carrinho.push({ nome, preco });
                atualizarCarrinho();
            });
        });
    }

    function carregarProdutos() {
        fetch("http://localhost:3000/produtos")
            .then(response => response.json())
            .then(produtos => {
                const bebidasContainer = document.querySelector(".bebidas-container");
                bebidasContainer.innerHTML = "";
                produtos.forEach(produto => {
                    const divBebida = document.createElement("div");
                    divBebida.classList.add("bebida");
                    divBebida.innerHTML = `
                        <img src="${produto.imagem}" alt="${produto.nome}">
                        <h3>${produto.nome}</h3>
                        <p>R$ ${produto.preco.toFixed(2).replace(".", ",")}</p>
                        <button>Adicionar ao Carrinho</button>
                    `;
                    bebidasContainer.appendChild(divBebida);
                });
                adicionarEventosBotoes();
            })
            .catch(error => console.error("Erro ao carregar produtos:", error));
    }

    botaoCarrinho.addEventListener("click", () => {
        modalCarrinho.style.display = "flex";
    });

    modalCarrinho.querySelector(".close-btn").addEventListener("click", () => {
        modalCarrinho.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modalCarrinho) {
            modalCarrinho.style.display = "none";
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            modalCarrinho.style.display = "none";
        }
    });

    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("remover-item")) {
            const index = event.target.getAttribute("data-index");
            carrinho.splice(index, 1);
            atualizarCarrinho();
        }
    });

    carregarProdutos();
});

// CSS para a Modal
const estilo = document.createElement("style");
estilo.innerHTML = `
    .modal {
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .modal-content {
        background: white;
        padding: 20px;
        border-radius: 8px;
        width: 90%;
        max-width: 400px;
        text-align: center;
        position: relative;
    }
    .close-btn {
        position: absolute;
        top: 10px;
        right: 15px;
        font-size: 20px;
        cursor: pointer;
        background: none;
        border: none;
    }
    #lista-carrinho {
        list-style: none;
        padding: 0;
    }
    .remover-item {
        margin-left: 10px;
        background: red;
        color: white;
        border: none;
        cursor: pointer;
    }
`;
document.head.appendChild(estilo);
