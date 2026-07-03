

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
