/*checa se o usuário está autenticado*/
function isAuthenticated() {
    return !!localStorage.getItem('token');
}
/*pega os dados do usuário armazenados no localStorage*/
function getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}
function requireAuth() {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}
function updateAuthUI() {
    const token = localStorage.getItem('token');
    const authButtons = document.getElementById('authButtons'); 
    const userActions = document.getElementById('userActions'); 
    const favoritesLink = document.getElementById('favoritesLink');
    const protectedLinks = document.querySelectorAll('[data-protected]');
    if (token) {
        if (authButtons) authButtons.style.display = 'none';
        if (userActions) userActions.style.display = 'inline-block';
        if (favoritesLink) favoritesLink.style.display = 'inline-block';
        protectedLinks.forEach(link => {
            link.style.display = 'inline-block';
        });

    } else {
        if (authButtons) authButtons.style.display = 'inline-block';
        if (userActions) userActions.style.display = 'none';
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
