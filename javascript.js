

const themeToggle = document.getElementById('theme-toggle');
// Verifica preferência salva ou do sistema
const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

if (currentTheme === 'light') {
    document.body.setAttribute('data-theme', 'light');
    themeToggle.classList.replace('bi-sun-fill', 'bi-moon-fill');
} else {
    document.body.removeAttribute('data-theme');
    themeToggle.classList.replace('bi-moon-fill', 'bi-sun-fill');
}

// Alternador de tema no clique
themeToggle.addEventListener('click', () => {
    if (document.body.getAttribute('data-theme') === 'light') {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
        themeToggle.classList.replace('bi-moon-fill', 'bi-sun-fill');
    } else {
        document.body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeToggle.classList.replace('bi-sun-fill', 'bi-moon-fill');
    }
});

// Rolagem suave nas âncoras da página
document.querySelectorAll('header nav a, .buttons-sec-btn a, .arrow-down-container a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});


//função responsável por fazer o ícone de seta piscar
setInterval(function() {
    const arrow = document.getElementsByTagName("i")[0];
    arrow.classList.toggle("escondido");
},1000);



//função responsável por fazer o carrossel de imagens do projeto 1

let slideIndex = 0;

function mudarSlide(direcao) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    if (totalSlides === 0) return;

    // Atualiza o índice tratando os limites
    slideIndex += direcao;
    if (slideIndex >= totalSlides) slideIndex = 0;
    if (slideIndex < 0) slideIndex = totalSlides - 1;

    //Mantém a classe 'horizontal' se ela existir!
    slides.forEach(slide => {
        const ehHorizontal = slide.classList.contains('horizontal');
        slide.className = 'slide';
        if (ehHorizontal) {
            slide.classList.add('horizontal');
        }
    });

    // 1. CARD CENTRAL 
    slides[slideIndex].classList.add('ativo');

    // 2. PRIMEIROS VIZINHOS 
    const indexEsquerda = (slideIndex - 1 + totalSlides) % totalSlides;
    slides[indexEsquerda].classList.add('esquerda');

    const indexDireita = (slideIndex + 1) % totalSlides;
    slides[indexDireita].classList.add('direita');

    // 3. SEGUNDOS VIZINHOS 
    const indexEsquerda2 = (slideIndex - 2 + totalSlides) % totalSlides;
    slides[indexEsquerda2].classList.add('esquerda-distante');

    const indexDireita2 = (slideIndex + 2) % totalSlides;
    slides[indexDireita2].classList.add('direita-distante');
}


setInterval(() => {
    mudarSlide(1);
}, 4000); 

// DETECTOR AUTOMÁTICO DE FORMATO (VERTICAL / HORIZONTAL)
function ajustarFormatosDosCards() {
    const slides = document.querySelectorAll('.slide');

    slides.forEach(slide => {
        if (slide.tagName === 'IMG') {
            const verificarDimensoes = () => {
                if (slide.naturalWidth > slide.naturalHeight) {
                    slide.classList.add('horizontal');
                }
            };

            if (slide.complete) {
                verificarDimensoes();
            } else {
                slide.addEventListener('load', verificarDimensoes);
            }
        }
    });
}

// INICIALIZADOR UNIFICADO
document.addEventListener("DOMContentLoaded", () => {
    ajustarFormatosDosCards(); 
    mudarSlide(0);             
});



