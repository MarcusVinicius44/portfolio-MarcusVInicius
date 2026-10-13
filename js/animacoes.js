// Animações de scroll: fade-in das seções e contadores

function animateCounters() {
    document.querySelectorAll('.stat-num').forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        let current = 0;
        const step = target / (1200 / 30);
        const timer = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = Math.floor(current);
            if (current >= target) { el.textContent = target; clearInterval(timer); }
        }, 30);
    });
}

function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        header.style.background = window.scrollY > 20
            ? 'rgba(5,5,5,0.96)'
            : 'rgba(5,5,5,0.75)';
    }, { passive: true });
}

function initObserver() {
    let countersAnimated = false;

    // threshold 0: seções muito altas nunca chegariam a uma fração visível
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');

            if (entry.target.classList.contains('sobre-mim') && !countersAnimated) {
                countersAnimated = true;
                animateCounters();
            }
        });
    }, { threshold: 0, rootMargin: '0px 0px -80px 0px' });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}
