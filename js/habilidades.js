// Renderiza a seção de habilidades a partir de data/habilidades.js
function renderSkills() {
    const el = document.getElementById('habilidades-lista');
    if (!el) return;

    el.innerHTML = HABILIDADES.map(grupo => `
            <div class="skill-group">
                <h3 class="skill-group-title" data-i18n="${grupo.titulo}">${t(grupo.titulo, grupo.rotulo)}</h3>
                <ul class="skill-list">
                    ${grupo.itens.map(s => `<li class="skill-chip"><i class="${techIcon(s.nome)}" aria-hidden="true"></i><span${s.chave ? ` data-i18n="${s.chave}"` : ''}>${s.chave ? t(s.chave, s.nome) : s.nome}</span></li>`).join('')}
                </ul>
            </div>`).join('');

    // O card "Tecnologias" de Sobre Mim sempre reflete a lista real
    const stat = document.getElementById('stat-tecnologias');
    if (stat) stat.dataset.target = HABILIDADES.reduce((total, g) => total + g.itens.length, 0);
    const statProj = document.getElementById('stat-projetos');
    if (statProj && typeof PROJETOS !== 'undefined') statProj.dataset.target = PROJETOS.length;
}
