/* Habilidades exibidas na home, agrupadas por categoria.
   Para adicionar uma, inclua { nome } no grupo certo (o ícone vem de data/tecnologias.js).
   titulo = chave de tradução em lang/*.json; rotulo = texto em português usado se o JSON não carregar. */
const HABILIDADES = [
    {
        titulo: 'skills_frontend',
        rotulo: 'Front-end',
        itens: [
            { nome: 'HTML' },
            { nome: 'CSS' },
            { nome: 'JavaScript' },
            { nome: 'TypeScript' },
            { nome: 'React' },
            { nome: 'Vite' }
        ]
    },
    {
        titulo: 'skills_backend',
        rotulo: 'Back-end',
        itens: [
            { nome: 'Python' },
            { nome: 'Django' },
            { nome: 'Django REST Framework' },
            { nome: 'Flask' }
        ]
    },
    {
        titulo: 'skills_databases',
        rotulo: 'Bancos de dados',
        itens: [
            { nome: 'MySQL' },
            { nome: 'PostgreSQL' },
            { nome: 'SQLite' }
        ]
    },
    {
        titulo: 'skills_ai',
        rotulo: 'IA generativa',
        itens: [
            { nome: 'Gemini API' },
            { nome: 'Pydantic' },
            { nome: 'Claude Code' }
        ]
    },
    {
        titulo: 'skills_tools',
        rotulo: 'Ferramentas',
        itens: [
            { nome: 'Git' },
            { nome: 'GitHub' },
            { nome: 'Vercel' }
        ]
    },
    {
        titulo: 'skills_basics',
        rotulo: 'Noções',
        itens: [
            { nome: 'Java' },
            { nome: 'Flutter' }
        ]
    }
];
