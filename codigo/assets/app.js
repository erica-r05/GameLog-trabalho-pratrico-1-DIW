// Funções de Navegação
function voltarParaHome() {
    window.location.href = "index.html";
}

function irParaDetalhe(itemId) {
    window.location.href = "detalhes.html?id=" + itemId;
}
async function carregarDetalhes() {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id');
    const detalhesContainer = document.getElementById('informacoes_gerais');
    if (!detalhesContainer) {
        console.warn("Elemento 'informacoes_gerais' não encontrado.");
        return;
    }
    if (!itemId) {
        detalhesContainer.innerHTML = '<p>Erro: ID do item faltando na URL.</p>';
        return;
    }

    try {
        const endpoint = `http://localhost:3000/detalhesdoItem?id=${itemId}`;
        const response = await fetch(endpoint);

        if (response.ok) {
            const itens = await response.json(); 
            const item = itens[0];
            if (!item || !item.nome) {
                detalhesContainer.innerHTML = '<p>Erro: Item não encontrado na API.</p>';
                return;
            }
            // Inserção do HTML principal
            detalhesContainer.innerHTML = `
                <section class="informacoes_gerais">
                    <h2>${item.nome}</h2>
                    <div class="conteudo_principal">
                        <div class="imagem_representativa">
                            <img id="imagem-principal" src="${item.imagem_principal}" alt="${item.nome}">
                        </div>
                        <div class="detalhes_texto">
                            <ul>
                                <li><span class="label">Nome do jogo:</span> ${item.nome}<br></li>
                                <li><span class="label">Data de Lançamento:</span> ${item.dataLancamento}<br></li>
                                <li><span class="label">Categoria:</span> ${item.categoria}<br></li>
                                <li><span class="label"><br>Descrição:<br></span> ${item.descricao}<br></li>
                                <li><span class="label"><br>Curiosidade:<br></span> ${item.curiosidade}<br></li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section class="fotos_associadas">
                    <h3>Mais fotos</h3>
                    <div class="galeria-thumbnails" id="galeria-thumbnails-container">
                        </div>
                </section>
            `;
            // Inserção das fotos associadas
            const galeriaContainer = document.getElementById('galeria-thumbnails-container');
            if (galeriaContainer && item.fotos && Array.isArray(item.fotos)) {
                item.fotos.forEach(fotoUrl => {
                    galeriaContainer.innerHTML += `<img src="${fotoUrl}" alt="Foto de ${item.nome}" class="thumbnail">`;
                });
            }

        } else {
            detalhesContainer.innerHTML = `<p>Erro: Não foi possível carregar o item (Status ${response.status}).</p>`;
        }
    } catch (error) {
        console.error(`Falha ao carregar detalhes do item ${itemId}:`, error);
        detalhesContainer.innerHTML = '<p>Erro: Falha na conexão com o servidor da API.</p>';
    }
}
async function carregarHome() {
    const entidades = {
        jogos: '.categoria-grid' 
    };
    for(const [entidade, containerId] of Object.entries(entidades)) {
        const container = document.querySelector(containerId); 
        
        if (!container) {
            console.error(`Contêiner ${containerId} não encontrado.`);
            continue;
        }

        try {
            const endpoint = `http://localhost:3000/${entidade}`;
            const response = await fetch(endpoint);
            
            if (response.ok) {
                const itens = await response.json();
                container.innerHTML = ''; // Limpa o contêiner antes de adicionar novos itens
                // Gera o HTML para cada item
                itens.forEach(item => {
                    const cardHTML = `
                        <div class="card-content">
                            <div class="image_content">
                                <img src="${item.imagem}" alt="${item.nome}">
                            </div>
                            <div class="card_infos">
                                <div class="card_infos">
                                    <p>${item.nome}</p>
                                    <span>${item.categoria}</span>
                                    <span class="card-avaliacao">${item.avaliacao}</span>
                                </div>
                            </div>
                            <button class="btn-info" onclick="irParaDetalhe(${item.id})">
                                <strong>More info</strong>
                            </button>
                        </div>
                    `;
                    container.innerHTML += cardHTML;
                });
            } else {
                container.innerHTML = `<p>Erro (${response.status}) ao carregar itens de /${entidade}.</p>`;
            }
        } catch (error) {
            console.error(`Falha de conexão ou JSON inválido ao carregar /${entidade}:`, error);
            container.innerHTML = '<p>Erro: Não foi possível conectar ao servidor da API.</p>';
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        carregarHome();
    } 
    else if (window.location.pathname.includes('detalhes.html')) {
        carregarDetalhes();
    }
});
async function carregarCarrossel() {
    const container = document.querySelector('.carousel-inner');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    const carrosselElement = document.getElementById('carouselExampleCaptions'); // NOVO: Pega o elemento PAI do carrossel

    if (!container || !indicatorsContainer || !carrosselElement) {
        console.error("Contêiner do carrossel ou indicadores não encontrado.");
        return;
    }
    try {
        const endpoint = `http://localhost:3000/destaques`; 
        const response = await fetch(endpoint);
        
        if (response.ok) {
            const jogos = await response.json();
            container.innerHTML = '';
            indicatorsContainer.innerHTML = '';
            container.innerHTML += '<div class="slide-overlay"></div>'; 

            jogos.forEach((item, index) => {
                const isActive = index === 0 ? ' active' : '';
                const indicatorHTML = `
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="${index}" 
                        class="${isActive}" aria-current="${index === 0}" aria-label="Slide ${index + 1}"></button>
                `;
                indicatorsContainer.innerHTML += indicatorHTML;
                const carouselItemHTML = `
                    <div class="carousel-item${isActive}">
                        <img src="${item.imagem}" class="d-block w-100" alt="${item.nome}">
                        <div class="carousel-caption">
                            <h2>${item.nome}</h2>
                            <p>Sua Imaginação é o Limite. Explore mundos e crie sua própria aventura...</p>
                            <button class="btn btn-primary" onclick="irParaDetalhe(${item.id})">
                                <strong>More info</strong>
                            </button>
                        </div>
                    </div>
                `;
                container.innerHTML += carouselItemHTML;
            });
            // Inicializa o carrossel do Bootstrap
            new bootstrap.Carousel(carrosselElement, {
                interval: 5000, 
                wrap: true
            });


        } else {
            console.error(`Erro (${response.status}) ao carregar destaques.`);
        }
    } catch (error) {
        console.error(`Falha de conexão ou JSON inválido ao carregar destaques:`, error);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        carregarCarrossel();
        carregarHome();
    } 
    else if (window.location.pathname.includes('detalhes.html')) {
        carregarDetalhes();
    }
});