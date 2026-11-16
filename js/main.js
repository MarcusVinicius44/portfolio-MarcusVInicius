// Ponto de entrada: liga os módulos. Ordem dos scripts em cada página:
// data/*.js (tecnologias, projetos, habilidades) → layout.js → i18n.js → hero.js → projetos.js → habilidades.js → menu.js → animacoes.js → efeitos.js → main.js
// (habilidades só é carregado na home)
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    onLanguageChange(renderProjects);
    if (typeof renderSkills === 'function') {
        renderSkills();
        onLanguageChange(renderSkills);
    }

    loadLanguage(localStorage.getItem('language') || 'pt');

    const btn = document.getElementById('translate-btn');
    if (btn) btn.addEventListener('click', toggleLanguage);

    initProjectFilters();
    initObserver();
    initHeaderScroll();
    initBurgerMenu();
    initEfeitos();
});
