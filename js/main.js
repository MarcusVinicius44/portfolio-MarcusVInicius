import { loadLanguage, toggleLanguage } from './language.js';

function initFadeInObserver() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadLanguage(localStorage.getItem('language') || 'pt');

    const translateButton = document.getElementById('translate-btn');
    if (translateButton) {
        translateButton.addEventListener('click', toggleLanguage);
    }

    initFadeInObserver();
});
