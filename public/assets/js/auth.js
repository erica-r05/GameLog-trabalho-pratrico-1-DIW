/*checa se o usuário está autenticado*/
function isAuthenticated() {
    return !!localStorage.getItem('token');
}
/*pega os dados do usuário armazenados no localStorage*/
function getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}
/*redireciona para a página de login se o usuário não estiver autenticado*/
function requireAuth() {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}
/*atualiza a interface com base no estado de autenticação do usuário*/
function updateAuthUI() {
    const token = localStorage.getItem('token');
    /*Referências para os botões de LOGIN/CADASTRO (visíveis quando DESLOGADO)*/
    const authButtons = document.getElementById('authButtons'); 
    /*Referência para o novo grupo de ações do usuário (visível quando LOGADO)*/
    const userActions = document.getElementById('userActions'); 
    const favoritesLink = document.getElementById('favoritesLink');
    const protectedLinks = document.querySelectorAll('[data-protected]');
    if (token) {
        /* Usuário está logado*/
        /* Esconde o botão de Login/Cadastro*/
        if (authButtons) authButtons.style.display = 'none';
        /* mostra o grupo de ações logadas (Cadastrar Jogo, Favoritos, Logout)*/
        if (userActions) userActions.style.display = 'inline-block';
        if (favoritesLink) favoritesLink.style.display = 'inline-block';
        protectedLinks.forEach(link => {
            link.style.display = 'inline-block';
        });

    } else {
        /* Usuário não está logado*/
        // Mostra o botão de Login/Cadastro
        if (authButtons) authButtons.style.display = 'inline-block';
        // Esconde o grupo de ações logadas
        if (userActions) userActions.style.display = 'none';
        // Oculta links protegidos
        if (favoritesLink) favoritesLink.style.display = 'none';
        protectedLinks.forEach(link => {
            link.style.display = 'none';
        });
    }
}
function initAuth() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = 'index.html';
        });
    }
    updateAuthUI();
}
document.addEventListener('DOMContentLoaded', initAuth);
window.auth = {
    isAuthenticated,
    getCurrentUser,
    requireAuth,
    updateAuthUI
};
