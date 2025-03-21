document.addEventListener("DOMContentLoaded", function () {
    const bebidasContainer = document.querySelector(".bebidas-container");

    async function carregarProdutos() {
        try {
            const resposta = await fetch("https://adega-xz4s.onrender.com/produtos");
            if (!resposta.ok) {
                const textoErro = await resposta.text();
                throw new Error(textoErro);
            }
            const produtos = await resposta.json();

            bebidasContainer.innerHTML = "";
            produtos.forEach(produto => {
                bebidasContainer.innerHTML += `
                    <div class="bebida">
                        <img src="${produto.imagem}" alt="${produto.nome}">
                        <h3>${produto.nome}</h3>
                        <p>R$ ${produto.preco.toFixed(2)}</p>
                    </div>
                `;
            });
        } catch (erro) {
            console.error("Erro ao carregar produtos:", erro.message);
        }
    }

    carregarProdutos();
});
