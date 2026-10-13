/* Ícone de cada tecnologia, usado nos projetos e nas habilidades.
   Chave = nome exibido (igual ao usado em `tags` de projetos.js e em habilidades.js).
   Valor = classe do Devicon (https://devicon.dev) ou do Font Awesome.
   Tecnologia nova? Adicione uma linha aqui e use o nome nos outros arquivos. */
const TECNOLOGIAS = {
    'HTML': 'devicon-html5-plain',
    'CSS': 'devicon-css3-plain',
    'JavaScript': 'devicon-javascript-plain',
    'TypeScript': 'devicon-typescript-plain',
    'React': 'devicon-react-original',
    'Next.js': 'devicon-nextjs-plain',
    'Vite': 'devicon-vite-original',
    'Python': 'devicon-python-plain',
    'Django': 'devicon-django-plain',
    'Flask': 'devicon-flask-original',
    'Node.js': 'devicon-nodejs-plain',
    'PostgreSQL': 'devicon-postgresql-plain',
    'C#': 'devicon-csharp-plain',
    'ASP.NET': 'devicon-dotnetcore-plain',
    'Tailwind CSS': 'devicon-tailwindcss-original',
    'MySQL': 'devicon-mysql-plain',
    'SQLite': 'devicon-sqlite-plain',
    'Git': 'devicon-git-plain',
    'GitHub': 'devicon-github-original',
    'GitHub API': 'devicon-github-original',
    'Chrome Extension': 'devicon-chrome-plain',
    'REST API': 'fas fa-plug'
};

function techIcon(nome) {
    return TECNOLOGIAS[nome] || 'fas fa-code';
}
