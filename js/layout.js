// Cabeçalho e rodapé compartilhados por todas as páginas.
// Cada página só declara <div id="site-header"> e <div id="site-footer">.
(function () {
    const isHome = document.body.dataset.page === 'home';
    const home = isHome ? '' : 'index.html';

    const header = document.getElementById('site-header');
    if (header) {
        header.outerHTML = `
    <header class="header" id="header">
        <a href="${isHome ? '#' : 'index.html'}" class="logo">
            <span class="logo-bracket">&lt;</span>MV<span class="logo-bracket">/&gt;</span>
        </a>
        <i id="burguer" class="fas fa-bars" role="button" tabindex="0" aria-label="Abrir menu" aria-expanded="false" aria-controls="menu-primario"></i>
        <nav>
            <ul class="navegacao-primaria" id="menu-primario">
                <li><a href="${home}#sobre-mim"><span data-i18n="nav_about">Sobre</span></a></li>
                <li><a href="${home}#projetos"><span data-i18n="nav_projects">Projetos</span></a></li>
                <li><a href="${home}#habilidades"><span data-i18n="nav_skills">Habilidades</span></a></li>
                <li><a href="${home}#contato"><span data-i18n="nav_contact">Contato</span></a></li>
                <li><a href="${home}#certificados"><span data-i18n="nav_certificates">Certificados</span></a></li>
            </ul>
        </nav>
        <button id="translate-btn" class="language-toggle" aria-label="Mudar para inglês">EN 🇺🇸</button>
    </header>`;
    }

    const footer = document.getElementById('site-footer');
    if (footer) {
        footer.outerHTML = `
    <footer class="footer">
        <p data-i18n="footer_text">&copy; 2026 Marcus Vincius. Todos os direitos reservados.</p>
        <div class="social-links">
            <a href="https://github.com/MarcusVinicius44" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i class="fab fa-github"></i></a>
            <a href="https://www.linkedin.com/in/marcus-vinicius44" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
            <a href="mailto:marcusesc44@gmail.com" aria-label="Email"><i class="fas fa-envelope"></i></a>
        </div>
    </footer>`;
    }
})();
