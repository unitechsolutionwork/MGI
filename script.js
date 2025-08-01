// Ficheiro: script.js (Versão com Tradução)

document.addEventListener('DOMContentLoaded', () => {
    
    const translatePage = (lang) => {
        // Altera o atributo 'lang' da tag <html>
        document.documentElement.lang = lang;
        
        // Percorre todos os elementos que têm o atributo 'data-key'
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            // Procura a tradução no objeto 'translations'
            if (translations[lang] && translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });
    };

    const setupLanguageSwitcher = () => {
        const langLinks = document.querySelectorAll('.lang-link');
        let currentLang = localStorage.getItem('lang') || 'pt'; // Padrão: Português

        // Aplica a tradução inicial ao carregar a página
        translatePage(currentLang);

        langLinks.forEach(link => {
            // Marca o link da língua ativa
            if (link.getAttribute('data-lang') === currentLang) {
                link.classList.add('active');
            }

            link.addEventListener('click', (e) => {
                e.preventDefault();
                const selectedLang = link.getAttribute('data-lang');
                
                // Guarda a língua escolhida no localStorage
                localStorage.setItem('lang', selectedLang);

                // Remove a classe 'active' de todos os links
                langLinks.forEach(l => l.classList.remove('active'));
                // Adiciona a classe 'active' ao link clicado
                link.classList.add('active');

                // Traduz a página
                translatePage(selectedLang);
            });
        });
    };

    // --- Executa todas as funções do site ---
    setupLanguageSwitcher();

    // Efeito do Header ao rolar a página
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            window.scrollY > 50 ? header.classList.add('scrolled') : header.classList.remove('scrolled');
        });
    }

    // Lógica do Menu Mobile
    const nav = document.querySelector('nav');
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenuCloseButton = document.querySelector('.mobile-menu-close');
    if (nav && mobileMenuButton && mobileMenuCloseButton) {
        mobileMenuButton.addEventListener('click', () => nav.classList.add('nav-active'));
        mobileMenuCloseButton.addEventListener('click', () => nav.classList.remove('nav-active'));
    }

    // Efeito de Transição de Página
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            const isLocalLink = href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:');
            if (isLocalLink && !link.classList.contains('lang-link')) {
                e.preventDefault();
                document.body.classList.add('fade-out');
                setTimeout(() => { window.location.href = href; }, 500);
            }
        });
    });

    // Animação de Elementos ao Rolar
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { threshold: 0.1 });
        animatedElements.forEach(el => observer.observe(el));
    }
});
