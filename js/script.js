// Animação de fade-in ao scroll
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');       
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
});

//alteração  de linguagem

import {
    loadLanguage,
    toggleLanguage
} from './language.js';

document.addEventListener('DOMContentLoaded', () => {

    loadLanguage(
        localStorage.getItem('language') || 'pt'
    );

    const translateButton = document.getElementById('translate-btn');
    if (translateButton) {
        translateButton.addEventListener('click', toggleLanguage);
    }
});