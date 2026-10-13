// Renderização dos projetos a partir de data/projetos.js:
//  - home: cards em destaque (#projetos-destaque)
//  - projetos.html: todos os cards + filtros por tecnologia (#projetos-lista)
//  - projeto.html: página de detalhe (#projeto-detalhe)

let activeFilter = new URLSearchParams(location.search).get('tech') || 'all';

function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function projectUrl(p) {
    return `projeto.html?id=${encodeURIComponent(p.id)}`;
}

// Capa do projeto: imagem real se existir, senão um bloco com o nome
function projectCover(p) {
    if (p.capa) {
        const src = escapeHtml(p.capa);
        return `<div class="project-cover-img" style="--capa:url('${new URL(p.capa, location.href).href}')"><img src="${src}" alt="${escapeHtml(p.nome)}" class="project-image"></div>`;
    }
    return `<div class="project-cover" role="img" aria-label="${escapeHtml(p.nome)}">${escapeHtml(p.nome)}</div>`;
}

// Vídeo: YouTube vira iframe, qualquer outro caminho vira <video> local
function videoEmbed(src) {
    const yt = src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/);
    if (yt) {
        return `<iframe src="https://www.youtube-nocookie.com/embed/${yt[1]}" title="Vídeo do projeto" allow="accelerometer; encrypted-media; picture-in-picture; fullscreen" allowfullscreen loading="lazy"></iframe>`;
    }
    return `<video src="${escapeHtml(src)}" controls preload="metadata" playsinline></video>`;
}

function techTag(tag) {
    return `<span><i class="${techIcon(tag)}" aria-hidden="true"></i>${escapeHtml(tag)}</span>`;
}

function projectCard(p) {
    const tags = p.tags.map(techTag).join('');
    const site = p.demo
        ? `<a href="${escapeHtml(p.demo)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(t('project_site', 'Ver site'))}" title="${escapeHtml(t('project_site', 'Ver site'))}"><i class="fas fa-arrow-up-right-from-square"></i></a>`
        : '';

    return `
            <article class="project-card">
                <a href="${projectUrl(p)}" class="project-img-wrap">
                    ${projectCover(p)}
                    <div class="project-overlay">
                        <span class="overlay-link">${escapeHtml(t('project_details', 'Ver detalhes'))}</span>
                    </div>
                </a>
                <div class="project-content">
                    <h3 class="project-title"><a href="${projectUrl(p)}">${escapeHtml(p.nome)}</a></h3>
                    <p class="project-description">${escapeHtml(localized(p).resumo)}</p>
                    <div class="project-tags">${tags}</div>
                    <div class="project-links">
                        <a href="${projectUrl(p)}" class="project-more">${escapeHtml(t('project_details', 'Ver detalhes'))} →</a>
                        <a href="${escapeHtml(p.repo)}" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub"><i class="fab fa-github"></i></a>
                        ${site}
                    </div>
                </div>
            </article>`;
}

// ── Home ──
function renderFeatured() {
    const el = document.getElementById('projetos-destaque');
    if (!el) return;
    el.innerHTML = PROJETOS.filter(p => p.destaque).map(projectCard).join('');
}

// ── Listagem com filtros ──
function allTechnologies() {
    const counts = {};
    PROJETOS.forEach(p => p.tags.forEach(tag => { counts[tag] = (counts[tag] || 0) + 1; }));
    return Object.keys(counts).sort((a, b) => counts[b] - counts[a] || a.localeCompare(b));
}

function renderProjectList() {
    const filters = document.getElementById('projetos-filtros');
    const list = document.getElementById('projetos-lista');
    if (!filters || !list) return;

    const techs = allTechnologies();
    if (activeFilter !== 'all' && !techs.includes(activeFilter)) activeFilter = 'all';

    const chip = (value, label) =>
        `<button type="button" class="filtro-chip${value === activeFilter ? ' active' : ''}" data-filter="${escapeHtml(value)}" aria-pressed="${value === activeFilter}">${escapeHtml(label)}</button>`;

    filters.innerHTML = chip('all', t('filter_all', 'Todos')) + techs.map(tech => chip(tech, tech)).join('');

    const visible = activeFilter === 'all' ? PROJETOS : PROJETOS.filter(p => p.tags.includes(activeFilter));
    list.innerHTML = visible.map(projectCard).join('');
}

function initProjectFilters() {
    const filters = document.getElementById('projetos-filtros');
    if (!filters) return;

    filters.addEventListener('click', (e) => {
        const btn = e.target.closest('.filtro-chip');
        if (!btn) return;
        activeFilter = btn.dataset.filter;

        const url = new URL(location.href);
        if (activeFilter === 'all') url.searchParams.delete('tech');
        else url.searchParams.set('tech', activeFilter);
        history.replaceState(null, '', url);

        renderProjectList();
    });
}

// ── Detalhe ──
function renderProjectDetail() {
    const el = document.getElementById('projeto-detalhe');
    if (!el) return;

    const id = new URLSearchParams(location.search).get('id');
    const p = PROJETOS.find(item => item.id === id);
    const back = `<a href="projetos.html" class="voltar-link"><i class="fas fa-arrow-left"></i> ${escapeHtml(t('back_to_projects', 'Voltar aos projetos'))}</a>`;

    if (!p) {
        document.title = t('page_title_projects', 'Projetos - Marcus Vincius');
        el.innerHTML = `${back}<p class="projeto-descricao">${escapeHtml(t('project_not_found', 'Projeto não encontrado.'))}</p>`;
        return;
    }

    const text = localized(p);
    document.title = `${p.nome} - Marcus Vincius`;

    const demo = p.demo
        ? `<a href="${escapeHtml(p.demo)}" target="_blank" rel="noopener noreferrer" class="btn-primary"><i class="fas fa-arrow-up-right-from-square"></i> ${escapeHtml(t('project_site', 'Ver site'))}</a>`
        : '';
    const features = text.funcionalidades.length
        ? `<div class="projeto-bloco">
                <h2>// ${escapeHtml(t('project_features', 'Funcionalidades'))}</h2>
                <ul class="projeto-lista">${text.funcionalidades.map(f => `<li>${escapeHtml(f)}</li>`).join('')}</ul>
            </div>`
        : '';
    const stack = `<div class="projeto-bloco">
                <h2>// ${escapeHtml(t('project_stack', 'Tecnologias'))}</h2>
                <ul class="skill-list">${p.tags.map(tag => `<li class="skill-chip"><i class="${techIcon(tag)}" aria-hidden="true"></i><span>${escapeHtml(tag)}</span></li>`).join('')}</ul>
            </div>`;
    const videos = p.videos.length
        ? `<div class="projeto-bloco">
                <h2>// ${escapeHtml(t('project_videos', 'Vídeos'))}</h2>
                <div class="projeto-videos">${p.videos.map(src => `<div class="projeto-video">${videoEmbed(src)}</div>`).join('')}</div>
            </div>`
        : '';
    const gallery = p.prints.length
        ? `<div class="projeto-bloco">
                <h2>// ${escapeHtml(t('project_gallery', 'Capturas de tela'))}</h2>
                <div class="projeto-galeria">${p.prints.map(src => `<a href="${escapeHtml(src)}" target="_blank" rel="noopener noreferrer"><img src="${escapeHtml(src)}" alt="${escapeHtml(p.nome)}" loading="lazy"></a>`).join('')}</div>
            </div>`
        : '';

    el.innerHTML = `
            ${back}
            <h1 class="projeto-titulo">${escapeHtml(p.nome)}</h1>
            <div class="projeto-acoes">
                ${demo}
                <a href="${escapeHtml(p.repo)}" target="_blank" rel="noopener noreferrer" class="btn-ghost"><i class="fab fa-github"></i> ${escapeHtml(t('project_repo', 'Repositório'))}</a>
            </div>
            ${videos}
            ${gallery}
            <div class="projeto-bloco">
                <h2>// ${escapeHtml(t('project_about', 'Sobre o projeto'))}</h2>
                ${text.descricao.map(par => `<p>${escapeHtml(par)}</p>`).join('')}
            </div>
            ${stack}
            ${features}`;
}

function renderProjects() {
    renderFeatured();
    renderProjectList();
    renderProjectDetail();
}
