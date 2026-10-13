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
            { nome: 'Next.js' }
        ]
    },
    {
        titulo: 'skills_backend',
        rotulo: 'Back-end',
        itens: [
            { nome: 'Python' },
            { nome: 'Django' },
            { nome: 'Flask' },
            { nome: 'Node.js' }
        ]
    },
    {
        titulo: 'skills_data_tools',
        rotulo: 'Dados e ferramentas',
        itens: [
            { nome: 'PostgreSQL' },
            { nome: 'MySQL' },
            { nome: 'Git' },
            { nome: 'GitHub' }
        ]
    }
];
