// URL da API JSON Server
const API_URL = 'http://localhost:3000';

// Elementos do formulário
const form = document.querySelector('form');
const tabelaJogos = document.getElementById('tabelaJogos');

// Elementos de preview de imagem
const previewImagem = document.getElementById('previewImagem');
const inputImagem = document.getElementById('arquivoUpload');

// Variável para armazenar o jogo em edição
let jogoEmEdicao = null;

// Configurar preview da imagem principal
if (inputImagem) {
    inputImagem.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImagem.src = e.target.result;
                previewImagem.style.display = 'block';
                document.getElementById('imagemPrincipalBase64').value = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });
}

// Função para carregar os jogos
async function carregarJogos() {
    try {
        const response = await fetch(`${API_URL}/jogos`);
        const jogos = await response.json();
        
        // Limpa a tabela
        tabelaJogos.innerHTML = '';
        
        // Preenche a tabela com os jogos
        jogos.forEach(jogo => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${jogo.id}</td>
                <td>${jogo.nome}</td>
                <td>${jogo.categoria}</td>
                <td>${formatarData(jogo.dataLancamento)}</td>
                <td>
                    <button class="btn btn-sm btn-warning me-1" onclick="editarJogo(${jogo.id})">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="confirmarExclusao(${jogo.id})">Excluir</button>
                </td>
            `;
            tabelaJogos.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao carregar jogos:', error);
        alert('Erro ao carregar a lista de jogos.');
    }
}

// Função para formatar a data
function formatarData(dataString) {
    if (!dataString) return '';
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
}

// Função para inserir um novo jogo
async function inserirJogo() {
    const jogo = obterDadosFormulario();
    
    if (!validarJogo(jogo)) return;
    
    try {
        const response = await fetch(`${API_URL}/jogos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jogo)
        });
        
        if (response.ok) {
            limparFormulario();
            carregarJogos();
            alert('Jogo cadastrado com sucesso!');
        } else {
            throw new Error('Erro ao cadastrar jogo');
        }
    } catch (error) {
        console.error('Erro ao cadastrar jogo:', error);
        alert('Erro ao cadastrar o jogo. Tente novamente.');
    }
}

// Função para editar um jogo existente
async function editarJogo(id) {
    try {
        const response = await fetch(`${API_URL}/jogos/${id}`);
        const jogo = await response.json();
        
        if (jogo) {
            jogoEmEdicao = jogo;
            preencherFormulario(jogo);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    } catch (error) {
        console.error('Erro ao carregar jogo para edição:', error);
        alert('Erro ao carregar os dados do jogo para edição.');
    }
}

// Função para atualizar um jogo
async function alterarJogo() {
    if (!jogoEmEdicao) {
        alert('Nenhum jogo em edição. Selecione um jogo para editar.');
        return;
    }
    
    const jogoAtualizado = obterDadosFormulario();
    
    if (!validarJogo(jogoAtualizado)) return;
    
    try {
        const response = await fetch(`${API_URL}/jogos/${jogoEmEdicao.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jogoAtualizado)
        });
        
        if (response.ok) {
            limparFormulario();
            jogoEmEdicao = null;
            carregarJogos();
            alert('Jogo atualizado com sucesso!');
        } else {
            throw new Error('Erro ao atualizar jogo');
        }
    } catch (error) {
        console.error('Erro ao atualizar jogo:', error);
        alert('Erro ao atualizar o jogo. Tente novamente.');
    }
}

// Função para excluir um jogo
async function excluirJogo() {
    if (!jogoEmEdicao) {
        alert('Nenhum jogo selecionado para exclusão.');
        return;
    }
    
    if (!confirm(`Tem certeza que deseja excluir o jogo "${jogoEmEdicao.nome}"?`)) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/jogos/${jogoEmEdicao.id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            limparFormulario();
            jogoEmEdicao = null;
            carregarJogos();
            alert('Jogo excluído com sucesso!');
        } else {
            throw new Error('Erro ao excluir jogo');
        }
    } catch (error) {
        console.error('Erro ao excluir jogo:', error);
        alert('Erro ao excluir o jogo. Tente novamente.');
    }
}

// Função para confirmar exclusão
async function confirmarExclusao(id) {
    try {
        const response = await fetch(`${API_URL}/jogos/${id}`);
        const jogo = await response.json();
        
        if (jogo && confirm(`Tem certeza que deseja excluir o jogo "${jogo.nome}"?`)) {
            const deleteResponse = await fetch(`${API_URL}/jogos/${id}`, {
                method: 'DELETE'
            });
            
            if (deleteResponse.ok) {
                carregarJogos();
                alert('Jogo excluído com sucesso!');
            } else {
                throw new Error('Erro ao excluir jogo');
            }
        }
    } catch (error) {
        console.error('Erro ao excluir jogo:', error);
        alert('Erro ao excluir o jogo. Tente novamente.');
    }
}

// Função para obter os dados do formulário
function obterDadosFormulario() {
    // Obter todas as imagens da galeria
    const galeria = [];
    for (let i = 1; i <= 5; i++) {
        const foto = document.getElementById(`galeriaFotoBase64_${i}`).value;
        if (foto) {
            galeria.push(foto);
        }
    }

    return {
        id: document.getElementById('itemId').value || null,
        nome: document.getElementById('itemNome').value.trim(),
        categoria: document.getElementById('itemCategoria').value.trim(),
        avaliacao: document.getElementById('itemAvaliacao').value.trim(),
        dataLancamento: document.getElementById('itemDataLancamento').value,
        descricao: document.getElementById('itemDescricao').value.trim(),
        curiosidade: document.getElementById('itemCuriosidade').value.trim(),
        imagem_principal: document.getElementById('imagemPrincipalBase64').value,
        galeria: galeria,
        // Adicionar outros campos conforme necessário
    };
}

// Função para preencher o formulário com os dados de um jogo
function preencherFormulario(jogo) {
    document.getElementById('itemId').value = jogo.id || '';
    document.getElementById('itemNome').value = jogo.nome || '';
    document.getElementById('itemCategoria').value = jogo.categoria || '';
    document.getElementById('itemAvaliacao').value = jogo.avaliacao || '';
    document.getElementById('itemDataLancamento').value = jogo.dataLancamento || '';
    document.getElementById('itemDescricao').value = jogo.descricao || '';
    document.getElementById('itemCuriosidade').value = jogo.curiosidade || '';
    
    // Preencher imagem principal
    if (jogo.imagem_principal) {
        previewImagem.src = jogo.imagem_principal;
        previewImagem.style.display = 'block';
        document.getElementById('imagemPrincipalBase64').value = jogo.imagem_principal;
    }
    
    // Preencher galeria de imagens
    if (jogo.galeria && Array.isArray(jogo.galeria)) {
        jogo.galeria.forEach((imagem, index) => {
            const i = index + 1;
            const preview = document.getElementById(`previewFoto_${i}`);
            if (preview) {
                preview.src = imagem;
                preview.style.display = 'block';
                document.getElementById(`galeriaFotoBase64_${i}`).value = imagem;
            }
        });
    }
}

// Função para limpar o formulário
function limparFormulario() {
    if (form) form.reset();
    jogoEmEdicao = null;
    const itemIdInput = document.getElementById('itemId');
    if (itemIdInput) itemIdInput.value = '';
}

// Função para validar os dados do jogo
function validarJogo(jogo) {
    if (!jogo.nome) {
        alert('Por favor, informe o nome do jogo.');
        return false;
    }
    
    if (!jogo.categoria) {
        alert('Por favor, informe a categoria do jogo.');
        return false;
    }
    
    if (!jogo.dataLancamento) {
        alert('Por favor, informe a data de lançamento do jogo.');
        return false;
    }
    
    if (!jogo.imagem_principal) {
        alert('Por favor, informe a URL da imagem do jogo.');
        return false;
    }
    
    return true;
}

// Função para redirecionar para a página de cadastro de jogos
function irParaNovosJogos() {
    window.location.href = 'novos_jogos/';
}

// Função para voltar para a página inicial
function voltarParaHome() {
    window.location.href = 'index.html';
}

// Configurar eventos dos botões
document.addEventListener('DOMContentLoaded', function() {
    // Configurar botões de ação
    const btnInserir = document.getElementById('btnInserir');
    const btnAlterar = document.getElementById('btnAlterar');
    const btnExcluir = document.getElementById('btnExcluir');
    const btnLimpar = document.getElementById('btnLimpar');

    if (btnInserir) btnInserir.addEventListener('click', inserirJogo);
    if (btnAlterar) btnAlterar.addEventListener('click', alterarJogo);
    if (btnExcluir) btnExcluir.addEventListener('click', excluirJogo);
    if (btnLimpar) btnLimpar.addEventListener('click', limparFormulario);

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

    // Carregar lista de jogos
    if (window.location.pathname.includes('novos_jogos')) {
        carregarJogos();
    }
});
