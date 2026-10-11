

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


//módulo responsavel por renderizar os cards de projetos

import { projetos } from './projectsData.js';

function renderizarProjetos() {

    const container =  document.getElementById('projetos-grid');
    let HTMLcontent = '';
     
    
    if(projetos && projetos.length > 0){

        projetos.forEach(projeto =>{

            HTMLcontent += `
            <div class="projeto-card" onclick="window.location.href='./projeto.html?id=${projeto.id}'">
                <div class="projeto-preview preview-financeai">
                    <img src=${projeto.imgPreview} alt=${projeto.nome} class="projeto-overlay-icon">
                    <div class="projeto-overlay">
                    </div>
                </div>
                <div class="projeto-info">
                    <div class="projeto-titulo-linha">
                        <h3>${projeto.nome}</h3>
                        <a href=${projeto.link} class="projeto-link-icon" aria-label="Acessar ${projeto.nome}"><i class="bi bi-arrow-right-circle"></i></a>
                    </div>
                    <p>${projeto.descricao}</p>
                    <div class="projeto-tags">
                        ${projeto.tags.map(tag => `<span>${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
             
        container.innerHTML = HTMLcontent;  
    });

     }else{
        container.innerHTML = `<p>Novos projeto em breve!.</p>`;
    }
}

renderizarProjetos();

//CRIA PAGINA GENERICA DE PROJETO QUE MUDA DE ACORDO COM O ID PASSADO NA URL
/*

import { projetos } from './carroselData.js';

function montaPaginaProjeto() {
    const container = document.getElementById('inicio');

    const urlParams = new URLSearchParams(window.location.search);
    
    const projetoId = urlParams.get('id');

    const projetoidlink = detalhesProjeto.find(projeto => projeto.id === parseInt(projetoId));

   if (projetoidlink) {
        HTMLcontent = `
         <div class="section-projeto">
                <div class="extras">
                    <div class="ponto"></div>
                    <p class="disponivel"> Concluído.</p>
                </div>
                <div class="nome">
                    <h1 class="titulo-projeto" id="nome_projeto">
                        ${projetoidlink.nome}
                    </h1>
                </div>
                <div class="sub-titulo-projeto">
                    <p class="texto-cinza" id="descricao_projeto">
                        ${projetoidlink.descricao}
                    </p>
                    <a id ="Link_GitHub"href="${projetoidlink.link}" target="_blank"><button class="button2">GitHub</button></a>
                    <a id="Link_Saiba_Mais"href="${projetoidlink.linkoProjeto}" target="_blank"><button class="button1">Saiba mais</button></a>
                </div>
                <div class="carrossel-container">
                    <div class="imagem-projeto" id="carrossel">

                    </div>
                    <button class="carrossel-button" onclick="mudarSlide(-1)" >&#10094;</button>
                    <button class="carrossel-button" onclick="mudarSlide(1)" >&#10095;</button>
                </div>
            </div>

            <div class="section-informacoes">
                <div class="container-Informacoes">
                    <div class="Informacoes">
                         <p class="section-subtitle"><span class="span-verde">// 01 </span> VISÃO GERAL</p>
                        <div class="texto-sobre">
                            <p class="texto-cinza" id="visao_geral_projeto">
                                
                            </p>
                        </div>
                    </div>
                    <div class="funcionalidades">
                        <p class="section-subtitle"><span class="span-verde">// 02 </span> FUNCIONALIDADES</p>
                        <ul class="lista-tecnologias" id="funcionalidades_projeto">
                            
                        </ul>
                    </div>
                </div>
                <div class="section-tecnologias">
                    <div class="container-detalhes">
                        <p class="section-subtitle"> DETALHES</p>
                        <div class="detalhes-funcao">
                            <p class="detalhe-titulo">FUNÇÃO</p>
                            <P class="detalhe-conteudo">Desenvolverdor full-stack</P>
                        </div>
                        <div class="detalhes-funcao">
                            <p class="detalhe-titulo">ANO</p>
                            <P class="detalhe-conteudo" id="ano_projeto">

                            </P>
                        </div>
                            <div class="detalhes-funcao">
                            <p class="detalhe-titulo">STATUS</p>
                            <P class="detalhe-conteudo" id="status_projeto">

                            </P>
                        </div>
                    </div>
                    <div class="container-detalhes">
                        <p class="section-subtitle"> TECNOLOGIAS</p>
                        <div class="detalhes-funcao">
                           <ul class="lista-linguagens" id="tecnologias_projeto">
                              
                           </ul>
                        </div>
                    </div>
                </div>
            </div>
        `
    }else{

    
}}*/