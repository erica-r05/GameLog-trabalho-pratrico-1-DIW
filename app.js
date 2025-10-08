const botoesEsquerda = document.querySelectorAll('.btn-esquerda');
const botoesDireita = document.querySelectorAll('.btn-direita');
function Rolagemcarrossel(quantidade) {
    const carrossel = document.getElementById('meuCarrossel');
            carrossel.scrollBy({
                left: quantidade,
                behavior: 'smooth'
            });
        }
        const carrossel = document.getElementById('meuCarrossel');
const btnPrev = document.querySelector('.carrossel-prev');
const btnNext = document.querySelector('.carrossel-next');

btnNext.addEventListener('click', () => {
    carrossel.scrollBy({
        left: 300, // Ajuste conforme a largura do card + gap
        behavior: 'smooth'
    });
});

btnPrev.addEventListener('click', () => {
    carrossel.scrollBy({
        left: -300,
        behavior: 'smooth'
    });
});
    