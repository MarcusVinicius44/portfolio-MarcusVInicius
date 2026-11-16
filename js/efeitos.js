// Efeitos visuais: rede neural do hero, títulos com letras que sobem, entrada em sequência,
// cards com inclinação 3D e brilho, botões magnéticos, barra de progresso e brilho do cursor.
// Quem pede menos movimento no sistema (prefers-reduced-motion) vê o site sem essas animações.

const FX_REDUZIDO = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const FX_MOUSE = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// A classe .fx liga as animações de entrada no CSS. É aplicada já aqui (antes do primeiro
// desenho da página) para não haver "pisca": sem JS, tudo aparece normalmente.
if (!FX_REDUZIDO) document.documentElement.classList.add('fx');

// Letras sobem uma a uma, saindo de um leve desfoque. Ao terminar, o texto volta a ser
// texto simples (assim a troca de idioma continua funcionando normalmente).
function revealLetters(el, passo = 28) {
    if (FX_REDUZIDO || !el || el.dataset.fxRevelando) return;
    const final = el.textContent;
    if (!final.trim()) return;
    el.dataset.fxRevelando = '1';
    el.setAttribute('aria-label', final);
    el.innerHTML = [...final].map((c, i) =>
        c === ' ' ? ' ' : `<span class="fx-letra" aria-hidden="true" style="animation-delay:${i * passo}ms">${c}</span>`
    ).join('');
    setTimeout(() => {
        if (el.querySelector('.fx-letra')) el.textContent = final;
        el.removeAttribute('aria-label');
        delete el.dataset.fxRevelando;
    }, final.length * passo + 700);
}

// ── Rede neural do hero ──
function initNeuralNet() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'hero-neural';
    canvas.setAttribute('aria-hidden', 'true');
    const grade = hero.querySelector('.hero-grid-bg');
    hero.insertBefore(canvas, grade ? grade.nextSibling : hero.firstChild);
    const ctx = canvas.getContext('2d');

    let w = 0, h = 0, dpr = 1, nos = [], pulsos = [];
    const mouse = { x: -9999, y: -9999, ativo: false };
    const DIST = 150, DIST_MOUSE = 200;

    function criarNos() {
        const qtd = Math.max(28, Math.min(95, Math.round((w * h) / 15000)));
        nos = Array.from({ length: qtd }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            r: Math.random() * 1.6 + 0.8
        }));
        pulsos = [];
    }

    function redimensionar() {
        const rect = hero.getBoundingClientRect();
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = rect.width; h = rect.height;
        canvas.width = w * dpr; canvas.height = h * dpr;
        canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        criarNos();
    }

    function vizinhos(i) {
        const a = nos[i], lista = [];
        for (let j = 0; j < nos.length; j++) {
            if (j === i) continue;
            const dx = a.x - nos[j].x, dy = a.y - nos[j].y;
            if (dx * dx + dy * dy < DIST * DIST) lista.push(j);
        }
        return lista;
    }

    // "Sinal" percorrendo uma conexão, como um dado passando pela rede
    function dispararPulso(origem) {
        const i = origem ?? ((Math.random() * nos.length) | 0);
        const v = vizinhos(i);
        if (!v.length) return;
        pulsos.push({ a: i, b: v[(Math.random() * v.length) | 0], t: 0, vel: 0.012 + Math.random() * 0.012, saltos: 3 });
    }

    function desenhar() {
        ctx.clearRect(0, 0, w, h);

        for (const n of nos) {
            if (!FX_REDUZIDO) {
                // atração suave para o mouse
                if (mouse.ativo) {
                    const dx = mouse.x - n.x, dy = mouse.y - n.y;
                    const d2 = dx * dx + dy * dy;
                    if (d2 < DIST_MOUSE * DIST_MOUSE && d2 > 400) { n.vx += dx * 0.00003; n.vy += dy * 0.00003; }
                }
                n.vx *= 0.995; n.vy *= 0.995;
                const vel = Math.hypot(n.vx, n.vy);
                if (vel < 0.12) { n.vx += (Math.random() - 0.5) * 0.04; n.vy += (Math.random() - 0.5) * 0.04; }
                if (vel > 1.6) { n.vx *= 0.9; n.vy *= 0.9; }
                n.x += n.vx; n.y += n.vy;
                if (n.x < 0 || n.x > w) n.vx *= -1;
                if (n.y < 0 || n.y > h) n.vy *= -1;
                n.x = Math.max(0, Math.min(w, n.x)); n.y = Math.max(0, Math.min(h, n.y));
            }
        }

        // conexões entre nós próximos
        ctx.lineWidth = 1;
        for (let i = 0; i < nos.length; i++) {
            const a = nos[i];
            for (let j = i + 1; j < nos.length; j++) {
                const b = nos[j];
                const dx = a.x - b.x, dy = a.y - b.y;
                const d2 = dx * dx + dy * dy;
                if (d2 < DIST * DIST) {
                    const alpha = (1 - Math.sqrt(d2) / DIST) * 0.22;
                    ctx.strokeStyle = `rgba(11, 212, 0, ${alpha})`;
                    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
                }
            }
            // conexões com o cursor
            if (mouse.ativo) {
                const dx = a.x - mouse.x, dy = a.y - mouse.y;
                const d = Math.hypot(dx, dy);
                if (d < DIST_MOUSE) {
                    ctx.strokeStyle = `rgba(11, 212, 0, ${(1 - d / DIST_MOUSE) * 0.55})`;
                    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
                }
            }
        }

        // nós
        for (const n of nos) {
            ctx.fillStyle = 'rgba(11, 212, 0, 0.75)';
            ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
        }

        // pulsos
        for (let k = pulsos.length - 1; k >= 0; k--) {
            const p = pulsos[k];
            const a = nos[p.a], b = nos[p.b];
            p.t += p.vel;
            const x = a.x + (b.x - a.x) * p.t, y = a.y + (b.y - a.y) * p.t;
            const g = ctx.createRadialGradient(x, y, 0, x, y, 10);
            g.addColorStop(0, 'rgba(180, 255, 170, 0.95)');
            g.addColorStop(1, 'rgba(11, 212, 0, 0)');
            ctx.fillStyle = g;
            ctx.beginPath(); ctx.arc(x, y, 10, 0, Math.PI * 2); ctx.fill();
            if (p.t >= 1) {
                pulsos.splice(k, 1);
                // o sinal continua para o próximo neurônio
                if (p.saltos > 0) {
                    const v = vizinhos(p.b).filter(j => j !== p.a);
                    if (v.length) pulsos.push({ a: p.b, b: v[(Math.random() * v.length) | 0], t: 0, vel: p.vel, saltos: p.saltos - 1 });
                }
            }
        }
    }

    redimensionar();

    if (FX_REDUZIDO) { desenhar(); window.addEventListener('resize', () => { redimensionar(); desenhar(); }); return; }

    let visivel = true, rodando = false, ultimoPulso = 0;
    function loop(t) {
        if (!visivel || document.hidden) { rodando = false; return; }
        if (t - ultimoPulso > 450 && pulsos.length < 14) { dispararPulso(); ultimoPulso = t; }
        desenhar();
        requestAnimationFrame(loop);
    }
    function iniciar() { if (!rodando) { rodando = true; requestAnimationFrame(loop); } }

    new IntersectionObserver(([e]) => { visivel = e.isIntersecting; if (visivel) iniciar(); }).observe(hero);
    document.addEventListener('visibilitychange', iniciar);

    let resizeTimer;
    window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(redimensionar, 150); });

    hero.addEventListener('pointermove', e => {
        const r = hero.getBoundingClientRect();
        mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.ativo = true;
        hero.style.setProperty('--mx', mouse.x + 'px');
        hero.style.setProperty('--my', mouse.y + 'px');
    });
    hero.addEventListener('pointerleave', () => { mouse.ativo = false; });

    // clique: onda de choque que empurra os nós e dispara sinais a partir do ponto
    hero.addEventListener('pointerdown', e => {
        if (e.target.closest('a, button')) return;
        const r = hero.getBoundingClientRect();
        const cx = e.clientX - r.left, cy = e.clientY - r.top;
        let maisPerto = 0, menor = Infinity;
        nos.forEach((n, i) => {
            const dx = n.x - cx, dy = n.y - cy, d = Math.hypot(dx, dy) || 1;
            if (d < 260) { const f = (260 - d) / 260 * 3.2; n.vx += dx / d * f; n.vy += dy / d * f; }
            if (d < menor) { menor = d; maisPerto = i; }
        });
        for (let i = 0; i < 4; i++) dispararPulso(maisPerto);
        const onda = document.createElement('span');
        onda.className = 'hero-onda';
        onda.style.left = cx + 'px'; onda.style.top = cy + 'px';
        hero.appendChild(onda);
        onda.addEventListener('animationend', () => onda.remove());
    });

    iniciar();
}

// ── Entrada em sequência dos itens de cada seção ──
const FX_GRUPOS = [
    '.sobre-text', '.sobre-stats .stat-card',
    '.experiencia-card',
    '.projetos-grid .project-card', '.projetos-mais', '.projetos-filtros',
    '.skill-group-title', '.skill-chip',
    '.contato-intro', '.contato-card',
    '.certificado-card'
];

function marcarItens(raiz = document) {
    if (FX_REDUZIDO) return;
    raiz.querySelectorAll('.fade-in').forEach(secao => {
        let i = 0;
        secao.querySelectorAll(FX_GRUPOS.join(',')).forEach(el => {
            el.classList.add('fx-item');
            el.style.setProperty('--i', Math.min(i++, 14));
        });
    });
}

// Títulos das seções aparecem letra a letra quando a seção entra na tela
function initTitulos() {
    if (FX_REDUZIDO) return;
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            obs.unobserve(e.target);
            revealLetters(e.target.querySelector('.section-title'));
        });
    }, { rootMargin: '0px 0px -80px 0px' });
    document.querySelectorAll('.fade-in').forEach(s => obs.observe(s));
}

// ── Cards: inclinação 3D + brilho que segue o cursor ──
const FX_CARDS = '.project-card, .stat-card, .contato-card, .certificado-card, .experiencia-card, .skill-chip';
const FX_TILT = { 'project-card': 7, 'stat-card': 12, 'contato-card': 10, 'certificado-card': 4, 'experiencia-card': 2, 'skill-chip': 14 };

function initCards() {
    if (FX_REDUZIDO || !FX_MOUSE) return;
    let atual = null, pendente = null;

    function soltar(card) {
        card.classList.remove('fx-tilting');
        card.style.removeProperty('--rx');
        card.style.removeProperty('--ry');
    }

    document.addEventListener('pointermove', e => {
        pendente = e;
        requestAnimationFrame(() => {
            if (!pendente) return;
            const ev = pendente; pendente = null;
            const card = ev.target.closest ? ev.target.closest(FX_CARDS) : null;
            if (atual && atual !== card) soltar(atual);
            atual = card;
            if (!card) return;
            const r = card.getBoundingClientRect();
            const px = (ev.clientX - r.left) / r.width, py = (ev.clientY - r.top) / r.height;
            const max = FX_TILT[[...card.classList].find(c => FX_TILT[c])] || 6;
            card.classList.add('fx-glow', 'fx-tilting');
            card.style.setProperty('--gx', (px * 100) + '%');
            card.style.setProperty('--gy', (py * 100) + '%');
            card.style.setProperty('--rx', ((0.5 - py) * max).toFixed(2) + 'deg');
            card.style.setProperty('--ry', ((px - 0.5) * max).toFixed(2) + 'deg');
        });
    }, { passive: true });

    document.addEventListener('pointerleave', () => { if (atual) soltar(atual); atual = null; });
}

// ── Botões magnéticos ──
function initMagneticos() {
    if (FX_REDUZIDO || !FX_MOUSE) return;
    document.addEventListener('pointermove', e => {
        const btn = e.target.closest && e.target.closest('.btn-primary, .btn-ghost, .social-links a');
        document.querySelectorAll('.fx-magnet').forEach(b => {
            if (b !== btn) { b.classList.remove('fx-magnet'); b.style.removeProperty('--tx'); b.style.removeProperty('--ty'); }
        });
        if (!btn) return;
        const r = btn.getBoundingClientRect();
        btn.classList.add('fx-magnet');
        btn.style.setProperty('--tx', ((e.clientX - r.left - r.width / 2) * 0.25).toFixed(1) + 'px');
        btn.style.setProperty('--ty', ((e.clientY - r.top - r.height / 2) * 0.35).toFixed(1) + 'px');
    }, { passive: true });
}

// ── Barra de progresso de leitura ──
function initProgresso() {
    const barra = document.createElement('div');
    barra.className = 'fx-progresso';
    barra.setAttribute('aria-hidden', 'true');
    document.body.appendChild(barra);
    const atualizar = () => {
        const max = document.documentElement.scrollHeight - innerHeight;
        barra.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    };
    addEventListener('scroll', atualizar, { passive: true });
    addEventListener('resize', atualizar);
    atualizar();
}

// ── Brilho suave que acompanha o cursor pela página ──
function initCursorGlow() {
    if (FX_REDUZIDO || !FX_MOUSE) return;
    const glow = document.createElement('div');
    glow.className = 'fx-cursor-glow';
    glow.setAttribute('aria-hidden', 'true');
    document.body.appendChild(glow);
    let x = innerWidth / 2, y = innerHeight / 2, gx = x, gy = y, ligado = false;
    addEventListener('pointermove', e => {
        x = e.clientX; y = e.clientY;
        if (!ligado) { ligado = true; glow.classList.add('on'); requestAnimationFrame(seguir); }
    }, { passive: true });
    function seguir() {
        gx += (x - gx) * 0.12; gy += (y - gy) * 0.12;
        glow.style.transform = `translate(${gx}px, ${gy}px)`;
        requestAnimationFrame(seguir);
    }
}

// Foto e selos do hero se movem levemente com o mouse (profundidade)
function initParallaxHero() {
    if (FX_REDUZIDO || !FX_MOUSE) return;
    const hero = document.querySelector('.hero');
    const area = document.querySelector('.hero-image-area');
    if (!hero || !area) return;
    hero.addEventListener('pointermove', e => {
        const r = hero.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
        area.style.setProperty('--px', px.toFixed(3));
        area.style.setProperty('--py', py.toFixed(3));
    });
    hero.addEventListener('pointerleave', () => { area.style.setProperty('--px', 0); area.style.setProperty('--py', 0); });
}

function initEfeitos() {
    initProgresso();
    initNeuralNet();
    marcarItens();
    // projetos e habilidades são redesenhados quando o idioma carrega: marca de novo
    if (typeof onLanguageChange === 'function') onLanguageChange(() => marcarItens());
    initTitulos();
    initCards();
    initMagneticos();
    initCursorGlow();
    initParallaxHero();
}
