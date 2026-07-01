// Typing animation roles por idioma
const TYPING_ROLES = {
    pt: ['Desenvolvedor Web', 'Front-end Developer', 'Estudante de C.C.'],
    en: ['Web Developer', 'Front-end Developer', 'C.S. Student']
};

let translations = {};
let currentLanguage = localStorage.getItem('language') || 'pt';

// ── Typing animation ──
let typingTimer = null;
let roleIdx = 0;
let charIdx = 0;
let isDeleting = false;

function startTyping() {
    const el = document.getElementById('typing-text');
    if (!el) return;
    if (typingTimer) clearTimeout(typingTimer);

    const roles = TYPING_ROLES[currentLanguage] || TYPING_ROLES.pt;
    roleIdx = 0; charIdx = 0; isDeleting = false;
    el.textContent = '';

    function tick() {
        const role = roles[roleIdx % roles.length];

        if (!isDeleting) {
            charIdx++;
            el.textContent = role.substring(0, charIdx);
            if (charIdx === role.length) {
                isDeleting = true;
                typingTimer = setTimeout(tick, 2200);
                return;
            }
            typingTimer = setTimeout(tick, 80);
        } else {
            charIdx--;
            el.textContent = role.substring(0, charIdx);
            if (charIdx === 0) {
                isDeleting = false;
                roleIdx++;
                typingTimer = setTimeout(tick, 350);
                return;
            }
            typingTimer = setTimeout(tick, 45);
        }
    }

    tick();
}

// ── Language loading ──
async function loadLanguage(language) {
    try {
        const response = await fetch(`lang/${language}.json`);
        translations = await response.json();

        document.title = translations.page_title || document.title;

        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.dataset.i18n;
            if (translations[key]) element.innerHTML = translations[key];
        });

        document.querySelectorAll('[data-i18n-alt]').forEach(element => {
            const key = element.dataset.i18nAlt;
            if (translations[key]) element.alt = translations[key];
        });

        document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
    } catch (e) {
        // fetch falha via file://, conteúdo padrão do HTML é mantido
    }

    updateLangButton(language);
    localStorage.setItem('language', language);
    currentLanguage = language;
    startTyping();
}

function updateLangButton(lang) {
    const btn = document.getElementById('translate-btn');
    if (!btn) return;
    if (lang === 'pt') {
        btn.innerHTML = 'EN 🇺🇸';
        btn.setAttribute('aria-label', 'Mudar para inglês');
    } else {
        btn.innerHTML = 'PT 🇧🇷';
        btn.setAttribute('aria-label', 'Switch to Portuguese');
    }
}

function toggleLanguage() {
    loadLanguage(currentLanguage === 'pt' ? 'en' : 'pt');
}

// ── Counter animation ──
function animateCounters() {
    document.querySelectorAll('.stat-num').forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        let current = 0;
        const step = target / (1200 / 30);
        const timer = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = Math.floor(current);
            if (current >= target) { el.textContent = target; clearInterval(timer); }
        }, 30);
    });
}

// ── Skill bar animation ──
function animateSkillBars() {
    document.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = (bar.dataset.width || 0) + '%';
    });
}

// ── Menu hamburguer (mobile/tablet) ──
function initBurgerMenu() {
    const burger = document.getElementById('burguer');
    const menu = document.getElementById('menu-primario');
    if (!burger || !menu) return;

    function closeMenu() {
        menu.classList.remove('active');
        burger.classList.remove('fa-times');
        burger.classList.add('fa-bars');
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Abrir menu');
    }

    function toggleMenu() {
        const isOpen = menu.classList.toggle('active');
        burger.classList.toggle('fa-bars', !isOpen);
        burger.classList.toggle('fa-times', isOpen);
        burger.setAttribute('aria-expanded', String(isOpen));
        burger.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    }

    burger.addEventListener('click', toggleMenu);
    burger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });

    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

    document.addEventListener('click', (e) => {
        if (menu.classList.contains('active') && !menu.contains(e.target) && e.target !== burger) {
            closeMenu();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) closeMenu();
    });
}

// ── Header scroll effect ──
function initHeaderScroll() {
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.style.background = window.scrollY > 20
            ? 'rgba(5,5,5,0.96)'
            : 'rgba(5,5,5,0.75)';
    }, { passive: true });
}

// ── Intersection Observer ──
function initObserver() {
    let countersAnimated = false;
    let skillsAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');

            if (entry.target.classList.contains('sobre-mim') && !countersAnimated) {
                countersAnimated = true;
                animateCounters();
            }

            if (entry.target.classList.contains('section-habilidades') && !skillsAnimated) {
                skillsAnimated = true;
                animateSkillBars();
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
    loadLanguage(localStorage.getItem('language') || 'pt');

    const btn = document.getElementById('translate-btn');
    if (btn) btn.addEventListener('click', toggleLanguage);

    initObserver();
    initHeaderScroll();
    initBurgerMenu();
});
