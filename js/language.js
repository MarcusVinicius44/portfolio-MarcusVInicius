let translations = {};
let currentLanguage = localStorage.getItem('language') || 'pt';

export async function loadLanguage(language) {

    const response = await fetch(`lang/${language}.json`);
    translations = await response.json();

    document.title = translations.page_title || document.title;

    document.querySelectorAll('[data-i18n]').forEach(element => {

        const key = element.dataset.i18n;

        if (translations[key]) {
            element.innerHTML = translations[key];
        }
    });

    document.querySelectorAll('[data-i18n-alt]').forEach(element => {
        const key = element.dataset.i18nAlt;
        if (translations[key]) {
            element.alt = translations[key];
        }
    });

    document.documentElement.lang =
        language === 'pt' ? 'pt-BR' : 'en';

    updateLanguageButton(language);

    localStorage.setItem('language', language);

    currentLanguage = language;
}

function updateLanguageButton(language) {
    const translateButton = document.getElementById('translate-btn');
    if (!translateButton) {
        return;
    }

    if (language === 'pt') {
        translateButton.innerHTML = 'EN 🇺🇸';
        translateButton.setAttribute('aria-label', 'Mudar para inglês');
    } else {
        translateButton.innerHTML = 'PT 🇧🇷';
        translateButton.setAttribute('aria-label', 'Switch to Portuguese');
    }
}

export function toggleLanguage() {
    loadLanguage(
        currentLanguage === 'pt'
            ? 'en'
            : 'pt'
    );
}