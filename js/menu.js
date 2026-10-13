// Menu hamburguer (mobile/tablet)
function initBurgerMenu() {
    const burger = document.getElementById('burguer');
    const menu = document.getElementById('menu-primario');
    if (!burger || !menu) return;

    function closeMenu() {
        menu.classList.remove('active');
        burger.classList.remove('fa-times');
        burger.classList.add('fa-bars');
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Abrir menu');
    }

    function toggleMenu() {
        const isOpen = menu.classList.toggle('active');
        burger.classList.toggle('fa-bars', !isOpen);
        burger.classList.toggle('fa-times', isOpen);
        burger.setAttribute('aria-expanded', String(isOpen));
        burger.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    }

    burger.addEventListener('click', toggleMenu);
    burger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });

    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

    document.addEventListener('click', (e) => {
        if (menu.classList.contains('active') && !menu.contains(e.target) && e.target !== burger) {
            closeMenu();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) closeMenu();
    });
}
