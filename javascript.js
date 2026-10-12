import { paginaData } from './carroselData.js';
import { projetos } from './projectsData.js';

// --- GERENCIAMENTO DE TEMA (DARK/LIGHT) ---
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

if (currentTheme === 'light') {
    document.body.setAttribute('data-theme', 'light');
    if (themeToggle) themeToggle.classList.replace('bi-sun-fill', 'bi-moon-fill');
} else {
    document.body.removeAttribute('data-theme');
    if (themeToggle) themeToggle.classList.replace('bi-moon-fill', 'bi-sun-fill');
}

if (themeToggle) {
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
}

// --- ROLAGEM SUAVE NAS ÂNCORAS ---
document.querySelectorAll('header nav a, .buttons-sec-btn a, .arrow-down-container a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
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

// --- ANIMAÇÃO DA SETA NO HEADER ---
setInterval(() => {
    const arrow = document.querySelector(".logo i");
    if (arrow) arrow.classList.toggle("escondido");
}, 1000);

// --- LÓGICA DO CARROSSEL DE IMAGENS ---
let slideIndex = 0;

export function mudarSlide(direcao) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    if (totalSlides === 0) return;

    slideIndex += direcao;
    if (slideIndex >= totalSlides) slideIndex = 0;
    if (slideIndex < 0) slideIndex = totalSlides - 1;

    slides.forEach(slide => {
        const ehHorizontal = slide.classList.contains('horizontal');
        slide.className = 'slide';
        if (ehHorizontal) slide.classList.add('horizontal');
    });

    // Central e Vizinhos
    slides[slideIndex].classList.add('ativo');

    const indexEsquerda = (slideIndex - 1 + totalSlides) % totalSlides;
    slides[indexEsquerda].classList.add('esquerda');

    const indexDireita = (slideIndex + 1) % totalSlides;
    slides[indexDireita].classList.add('direita');

    const indexEsquerda2 = (slideIndex - 2 + totalSlides) % totalSlides;
    slides[indexEsquerda2].classList.add('esquerda-distante');

    const indexDireita2 = (slideIndex + 2) % totalSlides;
    slides[indexDireita2].classList.add('direita-distante');
}

// Torna a função acessível caso haja algum clique inline residual
window.mudarSlide = mudarSlide;

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

// --- RENDERIZAÇÃO DA GRID DE PROJETOS (HOME) ---
function renderizarProjetos() {
    const container = document.getElementById('projetos-grid');
    if (!container) return;

    let HTMLcontent = '';
    if (projetos && projetos.length > 0) {
        projetos.forEach(projeto => {
            HTMLcontent += `
            <div class="projeto-card" onclick="window.location.href='./projeto.html?id=${projeto.id}'">
                <div class="projeto-preview preview-financeai">
                    <img src="${projeto.imgPreview}" alt="${projeto.nome}" class="projeto-overlay-icon">
                    <div class="projeto-overlay"></div>
                </div>
                <div class="projeto-info">
                    <div class="projeto-titulo-linha">
                        <h3>${projeto.nome}</h3>
                        <a href="./projeto.html?id=${projeto.id}" class="projeto-link-icon" aria-label="Acessar ${projeto.nome}">
                            <i class="bi bi-arrow-right-circle"></i>
                        </a>
                    </div>
                    <p>${projeto.descricao}</p>
                    <div class="projeto-tags">
                        ${projeto.tags.map(tag => `<span>${tag}</span>`).join('')}
                    </div>
                </div>
            </div>`;
        });
        container.innerHTML = HTMLcontent;
    } else {
        container.innerHTML = `<p>Novos projetos em breve!</p>`;
    }
}

// --- RENDERIZAÇÃO DA PÁGINA DETALHADA DO PROJETO ---
function renderizarPaginaProjetos(pagina) {
    const container = document.getElementById('inicio');
    if (!container) return;

    document.title = `${pagina.Nome} - Simão.dev`;

    const galeriaHTML = pagina.galeriaCarrossel ? pagina.galeriaCarrossel.map(imgSrc => `
        <img class="slide" src="${imgSrc}" alt="Imagem do projeto ${pagina.Nome}">
    `).join('') : '';

    const funcionalidadesHTML = pagina.funcionalidadesCarrossel ? pagina.funcionalidadesCarrossel.map(func => `
        <li><span class="span-verde"><i class="bi bi-check-circle"></i></span> ${func}</li>
    `).join('') : '';

    const tecnologiasHTML = pagina.tecnologias ? pagina.tecnologias.map(tech => `
        <li class="detalhe-conteudo">${tech}</li>
    `).join('') : '';

    container.innerHTML = `
        <div class="section-projeto">
            <div class="extras">
                <div class="ponto"></div>
                <p class="disponivel">${pagina.status}</p>
            </div>
            <div class="nome">
                <h1 class="titulo-projeto" id="nome_projeto">${pagina.Nome}</h1>
            </div>
            <div class="sub-titulo-projeto">
                <p class="texto-cinza" id="descricao_projeto">${pagina.Descricao}</p>
                <a id="Link_GitHub" href="${pagina.link}" target="_blank" rel="noopener noreferrer"><button class="button2">GitHub</button></a>
                <a id="Link_Saiba_Mais" href="${pagina.linkoProjeto}" target="_blank" rel="noopener noreferrer"><button class="button1">Saiba mais</button></a>
            </div>
            <div class="carrossel-container">
                <div class="imagem-projeto" id="carrossel">
                    ${galeriaHTML}
                </div>
                <button class="carrossel-button" id="btn-prev" aria-label="Slide anterior">&#10094;</button>
                <button class="carrossel-button" id="btn-next" aria-label="Próximo slide">&#10095;</button>
            </div>
        </div>
        <div class="section-informacoes">
            <div class="container-Informacoes">
                <div class="Informacoes">
                    <p class="section-subtitle"><span class="span-verde">// 01 </span> VISÃO GERAL</p>
                    <div class="texto-sobre">
                        <p class="texto-cinza" id="visao_geral_projeto">${pagina.descricaoCarrossel}</p>
                    </div>
                </div>
                <div class="funcionalidades">
                    <p class="section-subtitle"><span class="span-verde">// 02 </span> FUNCIONALIDADES</p>
                    <ul class="lista-tecnologias" id="funcionalidades_projeto">
                        ${funcionalidadesHTML}
                    </ul>
                </div>
            </div>
            <div class="section-tecnologias">
                <div class="container-detalhes">
                    <p class="section-subtitle">DETALHES</p>
                    <div class="detalhes-funcao">
                        <p class="detalhe-titulo">FUNÇÃO</p>
                        <p class="detalhe-conteudo">Desenvolvedor Full-Stack</p>
                    </div>
                    <div class="detalhes-funcao">
                        <p class="detalhe-titulo">ANO</p>
                        <p class="detalhe-conteudo" id="ano_projeto">${pagina.ano}</p>
                    </div>
                    <div class="detalhes-funcao">
                        <p class="detalhe-titulo">STATUS</p>
                        <p class="detalhe-conteudo" id="status_projeto">${pagina.status}</p>
                    </div>
                </div>
                <div class="container-detalhes">
                    <p class="section-subtitle">TECNOLOGIAS</p>
                    <div class="detalhes-funcao">
                        <ul class="lista-linguagens" id="tecnologias_projeto">
                            ${tecnologiasHTML}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Event Listeners para controle do Carrossel
    document.getElementById('btn-prev')?.addEventListener('click', () => mudarSlide(-1));
    document.getElementById('btn-next')?.addEventListener('click', () => mudarSlide(1));

    ajustarFormatosDosCards();
    mudarSlide(0);
}

// --- INICIALIZAÇÃO CONTROLADA ---
document.addEventListener("DOMContentLoaded", () => {
    // 1. Caso esteja na página principal
    if (document.getElementById('projetos-grid')) {
        renderizarProjetos();
    }

    // 2. Caso esteja na página dinâmica de projetos
    if (window.location.pathname.includes('projeto.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const projetoId = urlParams.get('id');

        if (!projetoId) {
            console.warn("Nenhum ID de projeto fornecido na URL.");
            return;
        }

        const dadoProjeto = paginaData.find(p => p.id === parseInt(projetoId, 10));

        if (!dadoProjeto) {
            console.warn(`Projeto com o ID ${projetoId} não encontrado!`);
            return;
        }

        renderizarPaginaProjetos(dadoProjeto);
    }
});