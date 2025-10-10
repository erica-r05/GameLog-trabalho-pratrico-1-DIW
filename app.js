let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const carrossel = document.getElementById('carrossel');

function mudarSlide(direction) {
    slides[currentSlide].classList.remove('active');
    
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    const slideWidth = carrossel.offsetWidth;
    carrossel.scrollTo({
        left: currentSlide * slideWidth,
        behavior: 'smooth'
    });
}

function irParaSlide(n) {
    const slideIndex = n - 1;
    if (slideIndex === currentSlide) return;

    slides[currentSlide].classList.remove('active');
    currentSlide = slideIndex;
    slides[currentSlide].classList.add('active');
    const slideWidth = carrossel.offsetWidth;
    carrossel.scrollTo({
        left: currentSlide * slideWidth,
        behavior: 'smooth'
    });
}