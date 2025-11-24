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

// FUNÇÕES DE CRUD (Página: novos_jogos.html)
// ------------------------------------

/**
 * Função auxiliar para obter os valores do formulário e construir os paths de imagem.
 * @returns {object} Objeto com os dados completos do formulário.
 */
async function obterDadosFormulario() {
    // Função para converter arquivo para base64
    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    // Obter imagem principal
    let imagemPrincipal = '';
    const fileInput = document.getElementById('arquivoUpload');
    if (fileInput && fileInput.files.length > 0) {
        try {
            imagemPrincipal = await fileToBase64(fileInput.files[0]);
        } catch (error) {
            console.error('Erro ao processar imagem principal:', error);
        }
    }
    
    // Obter dados básicos
    const id = document.getElementById('itemId')?.value || null;
    const nome = document.getElementById('itemNome')?.value || '';
    const categoria = document.getElementById('itemCategoria')?.value || '';
    const avaliacao = document.getElementById('itemAvaliacao')?.value || '';
    const dataLancamento = document.getElementById('itemDataLancamento')?.value || '';
    const descricao = document.getElementById('itemDescricao')?.value || '';
    const curiosidade = document.getElementById('itemCuriosidade')?.value || '';
    
    // Obter imagens da galeria
    const galeria = [];
    for (let i = 1; i <= 5; i++) {
        const fileInput = document.getElementById(`galeriaArquivoUpload_${i}`);
        if (fileInput && fileInput.files.length > 0) {
            try {
                const base64 = await fileToBase64(fileInput.files[0]);
                galeria.push(base64);
            } catch (error) {
                console.error(`Erro ao processar imagem ${i} da galeria:`, error);
            }
        }
    }
    
    return {
        id: id ? parseInt(id) : null,
        nome,
        categoria,
        avaliacao,
        dataLancamento,
        descricao,
        curiosidade,
        imagem: imagemPrincipal,
        galeria,
        // Adicionar outros campos conforme necessário
    };
}

/**
 * Limpa todos os campos do formulário e remove as pré-visualizações.
 */
function limparFormulario() {
    document.getElementById('itemId').value = '';
    document.getElementById('itemNome').value = '';
    document.getElementById('itemCategoria').value = '';
    document.getElementById('itemAvaliacao').value = '';
    document.getElementById('itemDataLancamento').value = '';
    document.getElementById('itemDescricao').value = '';
    document.getElementById('itemCuriosidade').value = '';

    // Limpa a Imagem Principal (Input e Preview)
    document.getElementById('arquivoUpload').value = ''; 
    const previewImagem = document.getElementById('previewImagem');
    if (previewImagem) {
        previewImagem.src = '';
        previewImagem.style.display = 'none';
    }

    // Limpa as 5 Imagens da Galeria
    for (let i = 1; i <= 5; i++) {
        const fileInput = document.getElementById(`galeriaArquivoUpload_${i}`);
        const previewImg = document.getElementById(`previewFoto_${i}`);
        const hiddenInput = document.getElementById(`galeriaFotoBase64_${i}`);
        
        if (fileInput) fileInput.value = '';
        if (previewImg) {
            previewImg.src = '';
            previewImg.style.display = 'none';
        }
        if (hiddenInput) hiddenInput.value = '';
    }
}

// C - CREATE (Inserir) - Lógica Corrigida para Inserção
async function inserirItem() {
    const btnInserir = document.querySelector('.btn-inserir');
    const originalText = btnInserir.innerHTML;
    
    try {
        // Mostrar feedback visual de carregamento
        btnInserir.disabled = true;
        btnInserir.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processando...';
        
        // Obter dados do formulário e remover o ID para que o servidor gere um novo
        const dados = await obterDadosFormulario();
        delete dados.id; // Garantir que não enviamos um ID
        
        console.log('Dados do formulário:', dados);
        
        // Validação básica
        if (!dados.nome || !dados.categoria || !dados.imagem) {
            const camposFaltando = [];
            if (!dados.nome) camposFaltando.push('Nome do Jogo');
            if (!dados.categoria) camposFaltando.push('Categoria');
            if (!dados.imagem) camposFaltando.push('Imagem Principal');
            
            alert(`Por favor, preencha os seguintes campos obrigatórios:\n${camposFaltando.join('\n')}`);
            return;
        }
        
        // Atualizar mensagem de carregamento
        btnInserir.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Salvando...';
        
        // Inserir na tabela de jogos
        const response = await fetch('http://localhost:3000/jogos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados)
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Erro na resposta do servidor:', response.status, errorData);
            throw new Error(`Erro ao cadastrar jogo (${response.status}): ${errorData.message || 'Tente novamente mais tarde'}`);
        }
        
        const novoJogo = await response.json();
        console.log('Jogo cadastrado com sucesso!', novoJogo);

        // Criar entrada em detalhesdoItem
        const detalhesItem = {
            id: novoJogo.id.toString(), // Usar o mesmo ID do jogo
            nome: dados.nome,
            categoria: dados.categoria,
            dataLancamento: dados.dataLancamento || 'Data não especificada',
            descricao: dados.descricao || 'Descrição não fornecida',
            curiosidade: dados.curiosidade || 'Curiosidade não fornecida',
            imagem_principal: dados.imagem,
            fotos: dados.galeria || []
        };

        // Inserir na tabela detalhesdoItem
        const detalhesResponse = await fetch('http://localhost:3000/detalhesdoItem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(detalhesItem)
        });

        if (!detalhesResponse.ok) {
            const errorData = await detalhesResponse.json().catch(() => ({}));
            console.error('Erro ao cadastrar detalhes do jogo:', detalhesResponse.status, errorData);
            throw new Error(`Erro ao cadastrar detalhes do jogo (${detalhesResponse.status}): ${errorData.message || 'Tente novamente mais tarde'}`);
        }

        console.log('Detalhes do jogo cadastrados com sucesso!');
        
        // Feedback de sucesso
        btnInserir.innerHTML = '<i class="bi bi-check-circle"></i> Cadastrado!';
        btnInserir.classList.remove('btn-primary');
        btnInserir.classList.add('btn-success');
        
        // Limpar formulário e lista
        limparFormulario();
        await carregarListagemCRUD();
        
        // Atualizar lista na página inicial se a função existir
        if (typeof carregarHome === 'function') {
            carregarHome();
        }
        
        // Resetar o botão após 2 segundos
        setTimeout(() => {
            btnInserir.disabled = false;
            btnInserir.innerHTML = originalText;
            btnInserir.classList.remove('btn-success');
            btnInserir.classList.add('btn-primary');
        }, 2000);
        
    } catch (error) {
        console.error('Erro ao cadastrar jogo:', error);
        alert(error.message || 'Erro ao cadastrar jogo. Verifique o console para mais detalhes.');
        
        // Reativar o botão em caso de erro
        btnInserir.disabled = false;
        btnInserir.innerHTML = 'Tentar Novamente';
    }
}
async function carregarListagemCRUD() {
    const listaCorpo = document.querySelector('.listagem-corpo'); 
    
    if (!listaCorpo) {
        console.error('Contêiner .listagem-corpo não encontrado.');
        return;
    }

    listaCorpo.innerHTML = '<p>Carregando...</p>';

    try {
        const response = await fetch('http://localhost:3000/jogos');
        if (!response.ok) throw new Error('Erro ao carregar jogos');
        
        const itens = await response.json();
        listaCorpo.innerHTML = ''; // Limpa a mensagem de carregamento
        
        if (itens.length === 0) {
            listaCorpo.innerHTML = '<p>Nenhum jogo cadastrado.</p>';
            return;
        }
        
        itens.forEach(item => {
            const row = document.createElement('div');
            row.className = 'listagem-row';
            
            // Garantir que o ID seja uma string
            const itemId = String(item.id || '');
            
            row.innerHTML = `
                <div class="listagem-col id">${itemId}</div>
                <div class="listagem-col">${item.nome || 'N/A'}</div> 
                <div class="listagem-col">${item.categoria || 'N/A'}</div> 
                <div class="listagem-col">${item.avaliacao || 'N/A'}</div>
                <div class="listagem-col actions">
                    <button class="btn btn-sm btn-alterar crud-btn" 
                            onclick="preencherFormularioParaEdicao('${itemId.replace(/'/g, "\\'")}')">
                        Editar
                    </button>
                    <button class="btn btn-sm btn-excluir crud-btn" 
                            onclick="excluirItem('${itemId.replace(/'/g, "\\'")}')" 
                            style="margin-left: 5px;">
                        Excluir
                    </button>
                </div>
            `;
            listaCorpo.appendChild(row);
        });

    } catch (error) {
        console.error('Erro ao carregar listagem:', error);
        listaCorpo.innerHTML = `
            <p style="color: red;">
                Erro ao carregar a listagem. 
                ${error.message || 'Verifique se o json-server está rodando.'}
            </p>`;
    }
}

// D - DELETE (Excluir)
window.excluirItem = async function(itemId) {
    if (!itemId) {
        console.error('ID do jogo não fornecido para exclusão');
        return;
    }
    
    if (!confirm('Tem certeza que deseja excluir este jogo?')) {
        return;
    }
    
    try {
        const response = await fetch(`http://localhost:3000/jogos/${itemId}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            alert('Jogo excluído com sucesso!');
            // Se estiver na página de listagem, atualiza a lista
            if (window.location.pathname.includes('novos_jogos.html')) {
                carregarListagemCRUD();
            }
            // Atualiza a home se estiver em outra página
            if (typeof carregarHome === 'function') {
                carregarHome();
            }
        } else {
            const errorData = await response.json().catch(() => ({}));
            console.error('Erro ao excluir jogo:', response.status, errorData);
            throw new Error('Erro ao excluir jogo. Verifique o console para mais detalhes.');
        }
    } catch (error) {
        console.error('Erro ao excluir jogo:', error);
        alert('Erro ao excluir jogo. Verifique o console para mais detalhes.');
    }
}

// R - READ para Edição - Usa Paths
async function preencherFormularioParaEdicao(itemId) {
    try {
        const response = await fetch(`http://localhost:3000/jogos/${itemId}`);
        const jogo = await response.json();
        
        if (jogo) {
            // Preencher campos do formulário
            if (document.getElementById('itemId')) document.getElementById('itemId').value = jogo.id;
            if (document.getElementById('itemNome')) document.getElementById('itemNome').value = jogo.nome || '';
            if (document.getElementById('itemCategoria')) document.getElementById('itemCategoria').value = jogo.categoria || '';
            if (document.getElementById('itemAvaliacao')) document.getElementById('itemAvaliacao').value = jogo.avaliacao || '';
            if (document.getElementById('itemDataLancamento')) document.getElementById('itemDataLancamento').value = jogo.dataLancamento || '';
            if (document.getElementById('itemDescricao')) document.getElementById('itemDescricao').value = jogo.descricao || '';
            if (document.getElementById('itemCuriosidade')) document.getElementById('itemCuriosidade').value = jogo.curiosidade || '';
            
            // Preencher imagem principal
            const previewImagem = document.getElementById('previewImagem');
            const imagemPrincipalInput = document.getElementById('imagemPrincipalBase64');
            if (jogo.imagem && previewImagem && imagemPrincipalInput) {
                previewImagem.src = jogo.imagem;
                previewImagem.style.display = 'block';
                imagemPrincipalInput.value = jogo.imagem;
            }
            
            // Preencher galeria de imagens
            if (jogo.galeria && Array.isArray(jogo.galeria)) {
                jogo.galeria.forEach((imagem, index) => {
                    const i = index + 1;
                    const preview = document.getElementById(`previewFoto_${i}`);
                    const input = document.getElementById(`galeriaFotoBase64_${i}`);
                    if (preview && input) {
                        preview.src = imagem;
                        preview.style.display = 'block';
                        input.value = imagem;
                    }
                });
            }
            
            // Rolar para o topo do formulário
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Atualizar o estado dos botões
            const btnInserir = document.getElementById('btnInserir');
            const btnAlterar = document.getElementById('btnAlterar');
            const btnExcluir = document.getElementById('btnExcluir');
            
            if (btnInserir) btnInserir.disabled = true;
            if (btnAlterar) btnAlterar.disabled = false;
            if (btnExcluir) btnExcluir.disabled = false;
        }
    } catch (error) {
        console.error('Erro ao carregar jogo para edição:', error);
        alert('Erro ao carregar os dados do jogo para edição.');
    }
}

// ------------------------------------
// EVENT LISTENER PRINCIPAL
// ------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    // Configurar eventos dos botões na página de cadastro
    if (window.location.pathname.includes('novos_jogos.html')) {
        const btnInserir = document.getElementById('btnInserir');
        const btnAlterar = document.getElementById('btnAlterar');
        const btnExcluir = document.getElementById('btnExcluir');
        const btnLimpar = document.getElementById('btnLimpar');
        const form = document.querySelector('form');
        
        // Configurar eventos dos botões
        if (btnInserir) {
            btnInserir.addEventListener('click', inserirItem);
            btnInserir.disabled = false;
        }
        
        if (btnAlterar) {
            btnAlterar.addEventListener('click', alterarItem);
            btnAlterar.disabled = true; // Inicialmente desabilitado
        }
        
        if (btnExcluir) {
            btnExcluir.addEventListener('click', function() {
                const itemId = document.getElementById('itemId')?.value;
                if (itemId) {
                    if (confirm('Tem certeza que deseja excluir este jogo?')) {
                        excluirItem(itemId);
                    }
                }
            });
            btnExcluir.disabled = true; // Inicialmente desabilitado
        }
        
        if (btnLimpar) {
            btnLimpar.addEventListener('click', function() {
                limparFormulario();
                // Habilita o botão de inserir e desabilita os outros
                if (btnInserir) btnInserir.disabled = false;
                if (btnAlterar) btnAlterar.disabled = true;
                if (btnExcluir) btnExcluir.disabled = true;
            });
        }
        
        // Configurar preview para as imagens da galeria
        for (let i = 1; i <= 5; i++) {
            const input = document.getElementById(`galeriaArquivoUpload_${i}`);
            if (input) {
                input.addEventListener('change', function(e) {
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            const preview = document.getElementById(`previewFoto_${i}`);
                            if (preview) {
                                preview.src = e.target.result;
                                preview.style.display = 'block';
                                document.getElementById(`galeriaFotoBase64_${i}`).value = e.target.result;
                            }
                        }
                        reader.readAsDataURL(file);
                    }
                });
            }
        }
        
        // Configurar preview da imagem principal
        const inputImagem = document.getElementById('arquivoUpload');
        if (inputImagem) {
            inputImagem.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const preview = document.getElementById('previewImagem');
                        if (preview) {
                            preview.src = e.target.result;
                            preview.style.display = 'block';
                            document.getElementById('imagemPrincipalBase64').value = e.target.result;
                        }
                    }
                    reader.readAsDataURL(file);
                }
            });
        }
        
        // Carregar lista de jogos
        carregarListagemCRUD();
        
        // Verificar se há um ID na URL para edição
        const urlParams = new URLSearchParams(window.location.search);
        const idParaEditar = urlParams.get('id');
        if (idParaEditar) {
            preencherFormularioParaEdicao(idParaEditar);
        }
    }
    // Verifica em qual página está e carrega o conteúdo apropriado
    else if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        carregarCarrossel();
        carregarHome();
    } 
    else if (window.location.pathname.includes('detalhes.html')) {
        carregarDetalhes();
    }
});