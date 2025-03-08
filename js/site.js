function carregarBebidas(categoriaFiltro = '') {
    const bebidas = JSON.parse(localStorage.getItem('produtos')) || [];
    const container = document.querySelector('.bebidas-container');

    container.innerHTML = '<h1 class="produtos">Confira as nossas ofertas</h1>';

    if (bebidas.length === 0) {
        container.innerHTML += '<p>Nenhuma bebida cadastrada ainda.</p>';
        return;
    }

    // Filtra os produtos pela categoria se um filtro for aplicado
    const bebidasFiltradas = categoriaFiltro
        ? bebidas.filter(bebida => bebida.categoria === categoriaFiltro)
        : bebidas;

    if (bebidasFiltradas.length === 0) {
        container.innerHTML += `<p>Nenhum produto encontrado na categoria "${categoriaFiltro}".</p>`;
        return;
    }

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

document.getElementById('limpar-pesquisa').addEventListener('click', () => {
    document.getElementById('pesquisa-input').value = '';
    carregarBebidas(); // Recarrega todos os produtos
});

document.addEventListener('DOMContentLoaded', () => {
    carregarBebidas(); // Carrega os produtos inicialmente

    const pesquisaInput = document.getElementById('pesquisa-input');
    const limparBtn = document.getElementById('limpar-pesquisa');

    if (pesquisaInput) {
        pesquisaInput.addEventListener('input', () => {
            const termo = pesquisaInput.value.trim().toLowerCase();
            carregarBebidas(termo); // Atualiza a lista conforme o usuário digita
        });
    }

    if (limparBtn) {
        limparBtn.addEventListener('click', () => {
            pesquisaInput.value = ''; // Limpa o campo de pesquisa
            carregarBebidas(); // Recarrega todos os produtos
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    carregarBebidas(); // Carrega todos os produtos inicialmente

    // Captura todos os botões da seção opções
    const botoesFiltro = document.querySelectorAll('.filter-btn');

    botoesFiltro.forEach(botao => {
        botao.addEventListener('click', () => {
            const categoria = botao.getAttribute('data-category'); // Pega a categoria do botão
            carregarBebidas(categoria); // Filtra os produtos com base na categoria clicada
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.logo');

    if (window.innerWidth <= 767) { // Apenas para telas menores
        logo.addEventListener('click', () => {
            logo.classList.add('animacao-toque');

            // Remove a animação após 1 segundo
            setTimeout(() => {
                logo.classList.remove('animacao-toque');
            }, 1000);
        });
    }
});
