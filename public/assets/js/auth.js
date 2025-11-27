// auth.js - Shared authentication functions

// Check if user is authenticated
function isAuthenticated() {
    return !!localStorage.getItem('token');
}

// Get current user data
function getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

// Redirect to login if not authenticated
function requireAuth() {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Update UI based on authentication status
function updateAuthUI() {
    const token = localStorage.getItem('token');
    
    // 1. Referências para os botões de LOGIN/CADASTRO (visíveis quando DESLOGADO)
    const authButtons = document.getElementById('authButtons'); 
    
    // 2. Referência para o novo grupo de ações do usuário (visível quando LOGADO)
    const userActions = document.getElementById('userActions'); 

    // Referências antigas que não usaremos mais para mostrar o nome (mas mantemos para o resto)
    const favoritesLink = document.getElementById('favoritesLink');
    const protectedLinks = document.querySelectorAll('[data-protected]');

    if (token) {
        // Usuário está logado
        
        // Esconde o botão de Login/Cadastro
        if (authButtons) authButtons.style.display = 'none';
        
        // MOSTRA o grupo de ações logadas (Cadastrar Jogo, Favoritos, Logout)
        if (userActions) userActions.style.display = 'inline-block';
        
        // Não é mais necessário: userName.textContent = user.firstName || 'Usuário';

        // Mantém a exibição de outros links protegidos (se existirem)
        if (favoritesLink) favoritesLink.style.display = 'inline-block';
        protectedLinks.forEach(link => {
            link.style.display = 'inline-block';
        });

    } else {
        // Usuário não está logado
        
        // MOSTRA o botão de Login/Cadastro
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

// Initialize authentication
function initAuth() {
    // Add event listener for logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = 'index.html';
        });
    }
    
    // Update UI on page load
    updateAuthUI();
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', initAuth);

// Export functions for use in other modules
window.auth = {
    isAuthenticated,
    getCurrentUser,
    requireAuth,
    updateAuthUI
};
