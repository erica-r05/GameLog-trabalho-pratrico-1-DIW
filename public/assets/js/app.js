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
function irParaJogosFavoritos() {
    window.location.href = "favoritos.html";
}
function irParaLogin() {
    window.location.href = "login.html";
}
async function carregarHome() {
    const user = window.auth.getCurrentUser();
    const userId = user ? user.id : null;
    let favoritosDoUsuario = new Set();

    if (userId) {
        try {
            const favResponse = await fetch(`http://localhost:3000/favorites?userId=${userId}`);
            if (favResponse.ok) {
                const favs = await favResponse.json();
                favoritosDoUsuario = new Set(favs.map(fav => String(fav.gameId)));
            }
        } catch (error) {
            console.warn("Não foi possível carregar favoritos. Continuando sem favoritos.", error);
        }
    }

    const entidades = {
        jogos: '.categoria-grid'
    };
    for (const [entidade, containerId] of Object.entries(entidades)) {
        const container = document.querySelector(containerId);
        if (!container) continue;
        try {
            const endpoint = `http://localhost:3000/${entidade}`;
            const response = await fetch(endpoint);
            if (response.ok) {
                const itens = await response.json();
                container.innerHTML = '';
                itens.forEach(item => {
                    const imagemSrc = item.imagem || "assets/img/placeholder.jpg";
                    const isFavorito = favoritosDoUsuario.has(String(item.id));
                    const classeFavorito = isFavorito ? 'favorited' : '';
                    const cliqueFavoritar = `adicionarAosFavoritos('${item.id}')`;
                    const cardHTML = `
                        <div class="card-content"> 
                            <i 
                                class="fas fa-heart favorite-icon ${classeFavorito}" 
                                data-game-id="${item.id}"
                                id="fav-${item.id}" 
                                onclick="${cliqueFavoritar}"
                            ></i>
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
async function adicionarAosFavoritos(gameId) {
    const user = window.auth.getCurrentUser();
    
    if (!user) {
        alert("Você precisa estar logado para adicionar um jogo aos favoritos!");
        return;
    }
    
    const userId = user.id; 
    const selectedGameId = String(gameId).trim();
    
    if (!selectedGameId || parseInt(selectedGameId, 10) <= 0) {
        console.error("Tentativa de favoritar com ID de jogo inválido:", gameId);
        alert("Erro: ID do jogo inválido.");
        return;
    }
    try {
        const checkResponse = await fetch(`http://localhost:3000/favorites?userId=${userId}&gameId=${selectedGameId}`);
        const existingFavorites = await checkResponse.json();

        if (existingFavorites.length > 0) {
            alert("Este jogo já está na sua lista de favoritos.");
            return;
        }
    } catch (error) {
        console.error("Erro ao verificar favoritos:", error);
        alert("Erro ao verificar o status de favorito.");
        return;
    }
    const novoFavorito = {
        userId: userId,
        gameId: selectedGameId 
    };
    try {
        const response = await fetch('http://localhost:3000/favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoFavorito)
        });
        if (response.ok) {
            alert(`Jogo ID ${selectedGameId} adicionado aos favoritos com sucesso!`);
            
            const iconElement = document.getElementById(`fav-${selectedGameId}`);
            if (iconElement) {
                iconElement.classList.add('favorited');
            }
            if (typeof carregarMeusFavoritos === 'function') carregarMeusFavoritos(); 
            
        } else {
            const data = await response.json();
            alert(data.message || 'Erro ao adicionar aos favoritos.');
        }

    } catch (error) {
        console.error('Erro ao conectar ao servidor:', error);
        alert('Erro de conexão ao adicionar aos favoritos.');
    }
}
async function carregarMeusFavoritos() {
    const user = window.auth.getCurrentUser();
    const container = document.getElementById('favoritosContainer');
    const loadingMessage = document.getElementById('loadingMessage');
    
    if (!container) return;
    if (!user) {
        container.innerHTML = '<p class="alert alert-warning">Você precisa estar logado para ver seus favoritos.</p>';
        return;
    }
    const userId = user.id; 
    if (loadingMessage) loadingMessage.textContent = 'Buscando sua lista de favoritos...';
    try {
        const favsResponse = await fetch(`http://localhost:3000/favorites?userId=${userId}`);
        if (!favsResponse.ok) throw new Error('Falha ao buscar a lista de favoritos do usuário.');
        const favoritos = await favsResponse.json();
        if (favoritos.length === 0) {
            container.innerHTML = '<p class="alert alert-info">Você ainda não tem jogos favoritados. Vá para a Home e adicione alguns!</p>';
            return;
        }
        const idDosMeusFavoritos = new Set(favoritos.map(fav => String(fav.gameId))); 
        const todosJogosResponse = await fetch(`http://localhost:3000/jogos`);
        if (!todosJogosResponse.ok) throw new Error('Falha ao buscar todos os jogos.');
        const todosOsJogos = await todosJogosResponse.json();
        const jogosFavoritos = todosOsJogos.filter(jogo => 
            idDosMeusFavoritos.has(String(jogo.id))
        );
        container.innerHTML = ''; 
        if (jogosFavoritos.length === 0) {
            container.innerHTML = '<p class="alert alert-warning">Seus favoritos foram salvos, mas os jogos não foram encontrados na lista principal. Verifique se os IDs dos jogos batem com os gameId em favorites.</p>';
            return;
        }
        jogosFavoritos.forEach(item => {
            const imagemSrc = item.imagem || "assets/img/placeholder.jpg";
            const cardHTML = `
                <div class="card-content"> 
                    <i 
                        class="fas fa-heart favorite-icon favorited" 
                        data-game-id="${item.id}"
                        id="fav-${item.id}" 
                        onclick="removerDosFavoritos('${item.id}')"
                    ></i>
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
    } catch (error) {
        console.error("ERRO CRÍTICO ao carregar favoritos:", error);
        container.innerHTML = `<p class="alert alert-danger">ERRO CRÍTICO: Não foi possível carregar os favoritos. Detalhes no console.</p>`;
    }
    if (loadingMessage) loadingMessage.textContent = ''; 
}
async function removerDosFavoritos(gameId) {
    const user = window.auth.getCurrentUser();
    if (!user) return alert("Erro: Usuário não autenticado.");
    
    const userId = user.id;
    const safeGameId = String(gameId).trim();
    try {
        const checkResponse = await fetch(`http://localhost:3000/favorites?userId=${userId}&gameId=${safeGameId}`);
        if (!checkResponse.ok) throw new Error("Falha ao buscar o registro de favorito.");
        const existingFavorites = await checkResponse.json();
        
        if (existingFavorites.length === 0) {
            alert("Jogo não encontrado na sua lista de favoritos para remoção.");
            if (typeof carregarMeusFavoritos === 'function') carregarMeusFavoritos(); 
            return;
        }
        const favoriteRecordId = existingFavorites[0].id;
        const safeFavoriteRecordId = String(favoriteRecordId); 
        const deleteResponse = await fetch(`http://localhost:3000/favorites/${safeFavoriteRecordId}`, {
            method: 'DELETE'
        });
        if (deleteResponse.ok) {
            alert("Jogo removido dos favoritos com sucesso!");
            const iconElement = document.getElementById(`fav-${safeGameId}`);
            if (iconElement) {
                iconElement.classList.remove('favorited');
                console.log(`Ícone do jogo ID ${safeGameId} atualizado.`);
            }
            if (typeof carregarMeusFavoritos === 'function') {
                carregarMeusFavoritos(); 
            }
            if (typeof atualizarGraficoJogos === 'function') {
                atualizarGraficoJogos();
            }
        } else {
            console.error("Erro ao deletar:", deleteResponse.status, deleteResponse.statusText);
            alert(`Erro ao remover dos favoritos. Status: ${deleteResponse.status}`);
        }
    } catch (error) {
        console.error('Erro ao remover dos favoritos:', error);
        alert('Erro de conexão ou sintaxe ao tentar remover o jogo.');
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
            // Inserção das fotos associadas
            const galeriaContainer = document.getElementById('galeria-thumbnails-container');
            if (galeriaContainer && item.fotos && Array.isArray(item.fotos)) {
                item.fotos.forEach(fotoPath => {
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
async function carregarGraficoCategorias() {
    //Buscar todos os jogos da plataforma (sem filtrar)
    const response = await fetch("http://localhost:3000/jogos");
    const jogos = await response.json();

    if (jogos.length === 0) {
        console.log("Nenhum jogo encontrado na plataforma.");
        return;
    }
    const categoriasCount = {};

    jogos.forEach(jogo => {
        const categoria = jogo.categoria || "Sem categoria";

        if (!categoriasCount[categoria]) {
            categoriasCount[categoria] = 0;
        }
        categoriasCount[categoria]++;
    });

    // Preparar dados para o gráfico
    const labels = Object.keys(categoriasCount);
    const data = Object.values(categoriasCount);
    // Criar o gráfico
    const ctx = document.getElementById("graficoCategorias").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Jogos por categoria (plataforma inteira)",
                data: data,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { precision: 0 }
                }
            }
        }
    });
}
/**
 * Filtra os cards de jogos visíveis com base no texto inserido no campo de pesquisa.
 * Deve ser chamada no evento 'onkeyup' do campo de pesquisa.
 */
function filterGames() {
    // 1. Pega o texto de pesquisa e o normaliza
    const input = document.getElementById('searchInput');
    // Se o campo de pesquisa não existir, não faz nada
    if (!input) {
        console.warn("Elemento 'searchInput' não encontrado.");
        return;
    }
    const filterText = input.value.toLowerCase().trim();

    // 2. Pega todos os cards de jogos.
    // O seletor '.card-content' corresponde à div que encapsula cada jogo em carregarHome().
    const gameCards = document.querySelectorAll('.categoria-grid .card-content'); 

    // 3. Itera sobre cada card para verificar se corresponde ao filtro
    gameCards.forEach(card => {
        // As classes do HTML gerado em carregarHome() são:
        // Título: <p>${item.nome}</p> - Usaremos o texto de todos os parágrafos (<p>) dentro de '.card_infos'.
        // Categoria/Descrição: <span>${item.categoria}</span> - Usaremos o texto de todos os spans (<span>) dentro de '.card_infos'.
        
        // Vamos extrair todo o texto relevante do card
        const cardInfos = card.querySelector('.card_infos');
        let textToSearch = '';

        if (cardInfos) {
            // Pega todo o texto dos parágrafos e spans (onde estão nome e categoria)
            const elements = cardInfos.querySelectorAll('p, span');
            elements.forEach(el => {
                textToSearch += el.textContent.toLowerCase() + ' ';
            });
        }
        
        // *OPCIONAL: Adicionar a descrição completa do jogo ao card na função carregarHome
        // Para incluir a descrição, você precisaria carregar a descrição completa do jogo
        // e adicioná-la a um atributo `data-description` no `.card-content` em `carregarHome`.
        const dataDescription = card.getAttribute('data-description');
        if (dataDescription) {
            textToSearch += dataDescription.toLowerCase();
        }


        // 4. Aplica o filtro
        if (filterText === '' || textToSearch.includes(filterText)) {
            card.style.display = ''; // Volta a exibir (usa o display padrão: 'grid'/'flex'/'block', dependendo do CSS)
        } else {
            card.style.display = 'none'; // Esconde o card
        }
    });
}
carregarGraficoCategorias();
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        carregarCarrossel();
        carregarHome();
    } 
    else if (window.location.pathname.includes('detalhes.html')) {
        carregarDetalhes();
    }
});