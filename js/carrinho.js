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
            <button id="finalizar-compra">Finalizar Compra</button>
        </div>
    `;
    document.body.appendChild(modalCarrinho);
    modalCarrinho.style.display = "none";

    function atualizarCarrinho() {
        const listaCarrinho = document.getElementById("lista-carrinho");
        const totalPreco = document.getElementById("total-preco");
        listaCarrinho.innerHTML = "";
        let total = 0;

        carrinho.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${item.nome} (x${item.quantidade}) - R$ ${(item.preco * item.quantidade).toFixed(2)}
                <button class="diminuir-quantidade" data-index="${index}">-</button>
                <button class="aumentar-quantidade" data-index="${index}">+</button>
                <button class="remover-item" data-index="${index}">Remover</button>
            `;
            listaCarrinho.appendChild(li);
            total += item.preco * item.quantidade;
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
                
                const itemExistente = carrinho.find(item => item.nome === nome);
                if (itemExistente) {
                    itemExistente.quantidade++;
                } else {
                    carrinho.push({ nome, preco, quantidade: 1 });
                }
                atualizarCarrinho();
            });
        });
    }

    function carregarProdutos() {
        fetch("https://adega-teste.onrender.com/produtos")
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
        } else if (event.target.classList.contains("aumentar-quantidade")) {
            const index = event.target.getAttribute("data-index");
            carrinho[index].quantidade++;
            atualizarCarrinho();
        } else if (event.target.classList.contains("diminuir-quantidade")) {
            const index = event.target.getAttribute("data-index");
            if (carrinho[index].quantidade > 1) {
                carrinho[index].quantidade--;
            } else {
                carrinho.splice(index, 1);
            }
            atualizarCarrinho();
        }
    });

    document.getElementById("finalizar-compra").addEventListener("click", function () {
        if (carrinho.length === 0) {
            alert("Seu carrinho está vazio!");
            return;
        }
        let mensagem = "Pedido:\n";
        carrinho.forEach(item => {
            mensagem += `${item.nome} (x${item.quantidade}) - R$ ${(item.preco * item.quantidade).toFixed(2)}\n`;
        });
        mensagem += `\nTotal: R$ ${document.getElementById("total-preco").textContent}`;
        const numeroWhatsApp = "5511999999999"; // Substitua pelo número real
        const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
        window.open(url, "_blank");
    });

    carregarProdutos();
});
