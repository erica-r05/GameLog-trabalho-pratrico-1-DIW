// Funções de Navegação
function voltarParaHome() {
    window.location.href = "index.html";
}

// Função para navegar para a página de detalhes
window.irParaDetalhe = function(itemId) {
    if (!itemId) {
        console.error('ID do jogo não fornecido');
        alert('Erro: ID do jogo não encontrado');
        return;
    }
    
    // Garantir que o ID seja uma string e não contenha caracteres inválidos
    const safeId = String(itemId).trim();
    if (!safeId) {
        console.error('ID do jogo inválido');
        return;
    }
    
    window.location.href = `detalhes.html?id=${encodeURIComponent(safeId)}`;
}

function irParaNovosJogos() {
    window.location.href = "novos_jogos.html";
}

// ------------------------------------
// HOME (Carregar Jogos e Carrossel) - Usa Paths
// ------------------------------------

async function carregarHome() {
    const entidades = {
        jogos: '.categoria-grid' 
    };
    for(const [entidade, containerId] of Object.entries(entidades)) {
        const container = document.querySelector(containerId); 
        
        if (!container) continue;

        try {
            const endpoint = `http://localhost:3000/${entidade}`;
            const response = await fetch(endpoint);
            
            if (response.ok) {
                const itens = await response.json();
                container.innerHTML = ''; 
                
                itens.forEach(item => {
                    // Item.imagem é o path (ex: assets/img/imgs/cards/Fornite logo 2024.jpg)
                    const imagemSrc = item.imagem || "assets/img/placeholder.jpg"; 
                    
                    const cardHTML = `
                        <div class="card-content">
                            <div class="image_content">
                                <img src="${imagemSrc}" alt="${item.nome}">
                            </div>
                            <div class="card_infos">
                                <div class="card_infos">
                                    <p>${item.nome}</p>
                                    <span>${item.categoria}</span>
                                    <span class="card-avaliacao">${item.avaliacao}</span>
                                </div>
                            </div>
                            <button class="btn-info" onclick="irParaDetalhe('${item.id}')"> 
                                <strong>More info</strong>
                            </button>
                        </div>
                    `;
                    container.innerHTML += cardHTML;
                });
            } else {
                container.innerHTML = `<p>Erro (${response.status}) ao carregar itens.</p>`;
            }
        } catch (error) {
            console.error(`Falha de conexão ou JSON inválido:`, error);
            container.innerHTML = '<p>Erro: Não foi possível conectar ao servidor da API.</p>';
        }
    }
}

async function carregarCarrossel() {
    const container = document.querySelector('.carousel-inner');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    const carrosselElement = document.getElementById('carouselExampleCaptions');

    if (!container || !indicatorsContainer || !carrosselElement) {
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
                const imagemSrc = item.imagem || "assets/img/placeholder.jpg"; 

                const indicatorHTML = `
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="${index}" 
                        class="${isActive}" aria-current="${index === 0}" aria-label="Slide ${index + 1}"></button>
                `;
                indicatorsContainer.innerHTML += indicatorHTML;
                const carouselItemHTML = `
                    <div class="carousel-item${isActive}">
                        <img src="${imagemSrc}" class="d-block w-100" alt="${item.nome}">
                        <div class="carousel-caption">
                            <h2>${item.nome}</h2>
                            <p>Sua Imaginação é o Limite. Explore mundos e crie sua própria aventura...</p>
                            <button class="btn btn-primary" onclick="irParaDetalhe('${item.id}')">
                                <strong>More info</strong>
                            </button>
                        </div>
                    </div>
                `;
                container.innerHTML += carouselItemHTML;
            });
            // Inicializa o carrossel do Bootstrap
            if (typeof bootstrap !== 'undefined' && bootstrap.Carousel) {
                new bootstrap.Carousel(carrosselElement, {
                    interval: 5000, 
                    wrap: true
                });
            }


        } else {
            console.error(`Erro (${response.status}) ao carregar destaques.`);
        }
    } catch (error) {
        console.error(`Falha de conexão ou JSON inválido ao carregar destaques:`, error);
    }
}

// ------------------------------------
// DETALHES (Read - Individual) - Usa Paths
// ------------------------------------
async function carregarDetalhes() {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id');
    const detalhesContainer = document.getElementById('informacoes_gerais');
    
    if (!detalhesContainer || !itemId) {
        if (!detalhesContainer) console.warn("Elemento 'informacoes_gerais' não encontrado.");
        return;
    }

    try {
        const endpoint = `http://localhost:3000/detalhesdoItem/${itemId}`;
        const response = await fetch(endpoint);

        if (response.ok) {
            const item = await response.json(); 
            
            if (!item || !item.nome || item.id === undefined) { 
                detalhesContainer.innerHTML = '<p>Erro: Item não encontrado na API ou dados incompletos.</p>';
                return;
            }
            
            const imagemPrincipalSrc = item.imagem_principal || "assets/img/placeholder.jpg"; 

            // Inserção do HTML principal
            detalhesContainer.innerHTML = `
                <section class="informacoes_gerais">
                    <h2>${item.nome}</h2>
                    <div class="conteudo_principal">
                        <div class="imagem_representativa">
                            <img id="imagem-principal" src="${imagemPrincipalSrc}" alt="${item.nome}">
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
            // Inserção das fotos associadas (que agora são Paths)
            const galeriaContainer = document.getElementById('galeria-thumbnails-container');
            if (galeriaContainer && item.fotos && Array.isArray(item.fotos)) {
                item.fotos.forEach(fotoPath => {
                    // O valor é o path, usado como o src da imagem
                    galeriaContainer.innerHTML += `<img src="${fotoPath}" alt="Foto de ${item.nome}" class="thumbnail">`;
                });
            }

        } else if (response.status === 404) {
             detalhesContainer.innerHTML = `<p>Erro 404: Item não encontrado (ID: ${itemId}).</p>`;
        } else {
            detalhesContainer.innerHTML = `<p>Erro: Não foi possível carregar o item (Status ${response.status}).</p>`;
        }
    } catch (error) {
        console.error(`Falha ao carregar detalhes do item ${itemId}:`, error);
        detalhesContainer.innerHTML = '<p>Erro: Falha na conexão com o servidor da API.</p>';
    }
}

// Run page-specific initializers when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        carregarCarrossel();
        carregarHome();
    } 
    else if (window.location.pathname.includes('detalhes.html')) {
        carregarDetalhes();
    }
});