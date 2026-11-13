// Efeito de digitação do hero (só roda na home, onde #typing-text existe)
const TYPING_ROLES = {
    pt: ['Desenvolvedor Full Stack', 'IA Generativa', 'Estudante de C.C.'],
    en: ['Full Stack Developer', 'Generative AI', 'C.S. Student']
};

let typingTimer = null;
let roleIdx = 0;
let charIdx = 0;
let isDeleting = false;

function startTyping() {
    const el = document.getElementById('typing-text');
    if (!el) return;
    if (typingTimer) clearTimeout(typingTimer);

    const roles = TYPING_ROLES[currentLanguage] || TYPING_ROLES.pt;
    roleIdx = 0; charIdx = 0; isDeleting = false;
    el.textContent = '';

    function tick() {
        const role = roles[roleIdx % roles.length];

        if (!isDeleting) {
            charIdx++;
            el.textContent = role.substring(0, charIdx);
            if (charIdx === role.length) {
                isDeleting = true;
                typingTimer = setTimeout(tick, 2200);
                return;
            }
            typingTimer = setTimeout(tick, 80);
        } else {
            charIdx--;
            el.textContent = role.substring(0, charIdx);
            if (charIdx === 0) {
                isDeleting = false;
                roleIdx++;
                typingTimer = setTimeout(tick, 350);
                return;
            }
            typingTimer = setTimeout(tick, 45);
        }
    }

    tick();
}
