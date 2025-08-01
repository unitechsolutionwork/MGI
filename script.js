// Ficheiro: script.js (Versão com Tradução e Menu Mobile Melhorado)

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

    // --- Menu Mobile Melhorado ---
    const setupMobileMenu = () => {
        const nav = document.querySelector('nav');
        const mobileMenuButton = document.querySelector('.mobile-menu-button');
        const mobileMenuClose = document.querySelector('.mobile-menu-close');
        const body = document.body;
        
        // Criar overlay se não existir
        let overlay = document.querySelector('.mobile-menu-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.classList.add('mobile-menu-overlay');
            document.body.appendChild(overlay);
        }

        // Função para abrir o menu
        const openMobileMenu = () => {
            if (nav) {
                nav.classList.add('nav-active');
                overlay.classList.add('active');
                body.style.overflow = 'hidden'; // Previne scroll do body
            }
        };

        // Função para fechar o menu
        const closeMobileMenu = () => {
            if (nav) {
                nav.classList.remove('nav-active');
                overlay.classList.remove('active');
                body.style.overflow = ''; // Restaura scroll do body
            }
        };

        // Event listeners para botões do menu
        if (mobileMenuButton) {
            mobileMenuButton.addEventListener('click', openMobileMenu);
        }

        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', closeMobileMenu);
        }

        // Fechar menu ao clicar no overlay
        overlay.addEventListener('click', closeMobileMenu);

        // Fechar menu ao clicar em um link (navegação)
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Fechar menu ao redimensionar a janela (se passar para desktop)
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });

        // Prevenir scroll quando o menu estiver aberto (para dispositivos touch)
        document.addEventListener('touchmove', (e) => {
            if (nav && nav.classList.contains('nav-active')) {
                // Permite scroll apenas dentro do menu
                if (!nav.contains(e.target)) {
                    e.preventDefault();
                }
            }
        }, { passive: false });

        // Fechar menu com tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav && nav.classList.contains('nav-active')) {
                closeMobileMenu();
            }
        });
    };

    // --- Executa todas as funções do site ---
    setupLanguageSwitcher();
    setupMobileMenu();

    // Efeito do Header ao rolar a página
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            window.scrollY > 50 ? header.classList.add('scrolled') : header.classList.remove('scrolled');
        });
    }

    // Efeito de Transição de Página
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            const isLocalLink = href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:') && !href.startsWith('http');
            
            // Não aplica transição para links de língua, externos, ou âncoras
            if (isLocalLink && !link.classList.contains('lang-link') && !link.hasAttribute('target')) {
                e.preventDefault();
                
                // Fecha o menu mobile se estiver aberto
                const nav = document.querySelector('nav');
                if (nav && nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    document.querySelector('.mobile-menu-overlay')?.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                // Aplica o efeito fade-out e redireciona
                document.body.classList.add('fade-out');
                setTimeout(() => { 
                    window.location.href = href; 
                }, 500);
            }
        });
    });

    // Animação de Elementos ao Rolar
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px' // Ativa a animação um pouco antes do elemento aparecer
        });
        
        animatedElements.forEach(el => observer.observe(el));
    }

    // Smooth scroll para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Adiciona classe de carregamento inicial
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Preloader (se houver)
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});
