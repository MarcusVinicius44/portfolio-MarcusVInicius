// Visualizador de imagens: as capturas de tela abrem por cima da página, sem sair do site.
// Setas (tela ou teclado) passam as fotos; Esc, o X ou um clique fora fecham.
(function () {
    let fotos = [], atual = 0, ultimoFoco = null;
    let el, img, contador, palco;

    function criar() {
        el = document.createElement('div');
        el.className = 'visualizador';
        el.setAttribute('role', 'dialog');
        el.setAttribute('aria-modal', 'true');
        el.setAttribute('aria-label', 'Visualizador de imagens');
        el.hidden = true;
        el.innerHTML = `
            <button class="visualizador-btn visualizador-fechar" aria-label="Fechar"><i class="fas fa-xmark"></i></button>
            <button class="visualizador-btn visualizador-ant" aria-label="Imagem anterior"><i class="fas fa-chevron-left"></i></button>
            <button class="visualizador-btn visualizador-prox" aria-label="Próxima imagem"><i class="fas fa-chevron-right"></i></button>
            <div class="visualizador-palco"><img class="visualizador-img" alt=""></div>
            <span class="visualizador-contador"></span>`;
        document.body.appendChild(el);
        img = el.querySelector('.visualizador-img');
        contador = el.querySelector('.visualizador-contador');
        palco = el.querySelector('.visualizador-palco');

        el.querySelector('.visualizador-fechar').addEventListener('click', fechar);
        el.querySelector('.visualizador-ant').addEventListener('click', () => mostrar(atual - 1));
        el.querySelector('.visualizador-prox').addEventListener('click', () => mostrar(atual + 1));
        // clique no fundo (fora da imagem) fecha
        el.addEventListener('click', e => {
            if (e.target === el || e.target === palco) fechar();
        });
    }

    function mostrar(i) {
        atual = (i + fotos.length) % fotos.length;
        img.classList.remove('entrou');
        img.src = fotos[atual].src;
        img.alt = fotos[atual].alt;
        palco.scrollTop = 0;
        contador.textContent = `${atual + 1} / ${fotos.length}`;
        const varias = fotos.length > 1;
        el.querySelector('.visualizador-ant').hidden = !varias;
        el.querySelector('.visualizador-prox').hidden = !varias;
        requestAnimationFrame(() => img.classList.add('entrou'));
    }

    function abrir(lista, i) {
        if (!el) criar();
        fotos = lista;
        ultimoFoco = document.activeElement;
        el.hidden = false;
        document.body.classList.add('visualizador-aberto');
        requestAnimationFrame(() => el.classList.add('aberto'));
        mostrar(i);
        el.querySelector('.visualizador-fechar').focus();
    }

    function fechar() {
        el.classList.remove('aberto');
        document.body.classList.remove('visualizador-aberto');
        setTimeout(() => { el.hidden = true; img.removeAttribute('src'); }, 250);
        if (ultimoFoco) ultimoFoco.focus();
    }

    document.addEventListener('click', e => {
        const link = e.target.closest && e.target.closest('.projeto-galeria a');
        if (!link || e.ctrlKey || e.metaKey || e.shiftKey) return; // Ctrl+clique continua abrindo em outra aba
        e.preventDefault();
        const links = [...link.closest('.projeto-galeria').querySelectorAll('a')];
        abrir(links.map(a => ({ src: a.getAttribute('href'), alt: a.querySelector('img')?.alt || '' })), links.indexOf(link));
    });

    document.addEventListener('keydown', e => {
        if (!el || el.hidden) return;
        if (e.key === 'Escape') fechar();
        else if (e.key === 'ArrowLeft' && fotos.length > 1) mostrar(atual - 1);
        else if (e.key === 'ArrowRight' && fotos.length > 1) mostrar(atual + 1);
    });
})();
