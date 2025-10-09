
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado - script externo funcionando!');
    
    let currentSlide = 0;
    let slides = [];
    let dots = [];

    // Inicializa o carrossel
    function inicializarCarrossel() {
        slides = document.querySelectorAll('.slide');
        dots = document.querySelectorAll('.dot');
        
        console.log('Slides encontrados:', slides.length);
        console.log('Dots encontrados:', dots.length);
        
        if (slides.length === 0) {
            console.error('Nenhum slide encontrado! Verifique as classes.');
            return;
        }
        
        // Adiciona eventos aos botões
        const btnPrev = document.querySelector('.prev-btn');
        const btnNext = document.querySelector('.next-btn');
        
        if (btnPrev) {
            btnPrev.addEventListener('click', function() {
                mudarSlide(-1);
            });
        }
        
        if (btnNext) {
            btnNext.addEventListener('click', function() {
                mudarSlide(1);
            });
        }
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                irParaSlide(index);
            });
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') mudarSlide(-1);
            if (e.key === 'ArrowRight') mudarSlide(1);
        });
    }

    function mudarSlide(direction) {
        console.log('Mudando slide, direção:', direction);
        
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = (currentSlide + direction + slides.length) % slides.length;

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        
        console.log('Slide atual:', currentSlide);
    }

    function irParaSlide(index) {
        console.log('Indo para slide:', index);
        
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = index;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    inicializarCarrossel();
});