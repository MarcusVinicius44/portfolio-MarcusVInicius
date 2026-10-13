// Tradução PT/EN: textos fixos vêm de lang/*.json (via data-i18n); textos dinâmicos
// (projetos) vêm de data/projetos.js. Quem renderiza conteúdo dinâmico se registra
// com onLanguageChange para redesenhar quando o idioma mudar.
let translations = {};
let currentLanguage = localStorage.getItem('language') || 'pt';
const languageListeners = [];

// Texto traduzido, com fallback (em português) caso o JSON não tenha carregado
function t(key, fallback = '') {
    return translations[key] || fallback;
}

// Escolhe o texto do idioma atual em um objeto { pt, en }
function localized(obj) {
    return obj[currentLanguage] || obj.pt;
}

function onLanguageChange(fn) {
    languageListeners.push(fn);
}

function applyTranslations(root = document) {
    root.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.dataset.i18n;
        if (translations[key]) element.innerHTML = translations[key];
    });

    root.querySelectorAll('[data-i18n-alt]').forEach(element => {
        const key = element.dataset.i18nAlt;
        if (translations[key]) element.alt = translations[key];
    });
}

async function loadLanguage(language) {
    try {
        const response = await fetch(`lang/${language}.json`);
        translations = await response.json();

        document.title = translations[document.body.dataset.titleKey || 'page_title'] || document.title;
        applyTranslations();
        document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
    } catch (e) {
        // fetch falha via file://, conteúdo padrão do HTML é mantido
    }

    updateLangButton(language);
    localStorage.setItem('language', language);
    currentLanguage = language;
    startTyping();
    languageListeners.forEach(fn => fn(language));
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
