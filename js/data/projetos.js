/* Lista de projetos do portfólio.
   Para adicionar um projeto, copie um bloco abaixo e preencha os campos.

   id            slug usado na URL (projeto.html?id=<id>)
   destaque      true = aparece na home (recomendado: 3 projetos)
   tags          tecnologias/linguagens, com ícone (nomes em data/tecnologias.js) — também viram os filtros
   emDesenvolvimento  true = mostra o selo "Em desenvolvimento" (opcional)
   emDestaque    true = mostra o selo "Em destaque" (opcional)
   repo / demo   links (demo pode ser null)
   capa          imagem de capa do card (qualquer proporção: é ajustada sem cortar), ex.: 'assets/projetos/cleangit/capa.png'
                 — null usa uma capa gerada com o nome do projeto
   prints        capturas de tela (aparecem no topo da página do projeto), ex.: ['assets/projetos/cleangit/print1.png']
   videos        gravações (aparecem no topo da página do projeto): arquivo local ('assets/projetos/cleangit/demo.mp4')
                 ou link do YouTube ('https://www.youtube.com/watch?v=XXXX')
                 ou de uma publicação pública do LinkedIn (link do post ou do "Incorporar esta publicação");
                 se o post do LinkedIn ficar cortado, use { src: '<link>', altura: 650 } (altura em px; padrão 560)
   Coloque os arquivos em assets/projetos/<id>/ (a pasta de cada projeto já existe).
   pt / en       textos: resumo (card), descricao (parágrafos), funcionalidades (lista) */
const PROJETOS = [
    {
        id: 'lucrafood',
        nome: 'LucraFood',
        destaque: true,
        emDestaque: true,
        tags: ['Python', 'Django', 'REST API', 'React', 'TypeScript', 'Vite', 'Gemini API', 'Pydantic'],
        repo: 'https://github.com/MarcusVinicius44/LucraFood',
        demo: 'https://lucrafood.vercel.app',
        capa: 'assets/projetos/lucrafood/capa.png',
        prints: [
            'assets/projetos/lucrafood/landing.png',
            'assets/projetos/lucrafood/demo-1-cardapio.png',
            'assets/projetos/lucrafood/demo-2-revisao-ia.png',
            'assets/projetos/lucrafood/demo-3-painel.png',
            'assets/projetos/lucrafood/demo-4-receita.png',
            'assets/projetos/lucrafood/demo-5-resultado.png',
            'assets/projetos/lucrafood/por-dentro.png'
        ],
        videos: [],
        pt: {
            resumo: 'Plataforma com IA generativa para pequenos restaurantes: tire uma foto do cardápio e descubra quais pratos dão lucro e quais dão prejuízo no delivery.',
            descricao: [
                'Pequenos restaurantes costumam definir preços sem saber o custo real de cada prato, e a taxa do aplicativo de delivery pode transformar lucro em prejuízo sem que o dono perceba. O LucraFood usa IA generativa e modelos de visão para ler o cardápio por foto e entender receitas escritas em texto livre ("pão, hambúrguer de 150 g, 2 fatias de queijo"), e devolve o custo, a margem no balcão e no delivery, um semáforo e o preço sugerido de cada prato.',
                'O princípio do projeto é: a IA lê e conversa, mas nunca faz conta. A saída da IA é JSON validado com Pydantic, com nova tentativa quando vem inválida e tratamento de erros do provedor (limite de taxa e sobrecarga). O que é incerto fica marcado para o dono conferir, nada é gravado sem confirmação, e todos os cálculos ficam em Python com Decimal, separados da IA.',
                'A IA é avaliada com gabarito em dados reais: em 8 cardápios reais, 251 de 254 pratos e 251 de 251 preços lidos corretamente, e na ficha técnica 42 de 42 ingredientes em 5 rodadas seguidas. Essas medições guiaram decisões, como trocar o Groq pelo Gemini e parar de recomprimir as fotos em JPEG, que fazia o modelo errar dígitos escritos à mão. O projeto tem 185 testes no back-end e 90 no front-end, e foi desenvolvido com auxílio do Claude Code.'
            ],
            funcionalidades: [
                'Leitura do cardápio por foto (inclusive preço escrito à mão), com revisão antes de salvar',
                'Ficha técnica por texto livre: a IA liga cada item a um ingrediente cadastrado e marca o que precisa de atenção',
                'Conversa que pergunta o que faltou ("quanto dá 1 fatia de queijo?") e lembra as medidas do restaurante',
                'Diagnóstico por prato: custo, margem, conta do pedido no delivery linha por linha, semáforo e preço sugerido',
                'Provedor de IA trocável (Gemini ou Groq) por variável de ambiente',
                'Landing com demo interativa sem back-end, usando respostas reais da IA gravadas',
                'Avaliação com gabarito em cardápios e frases reais, 185 testes no back-end e 90 no front-end'
            ]
        },
        en: {
            resumo: 'Generative AI platform for small restaurants: take a photo of the menu and find out which dishes make a profit and which lose money on delivery.',
            descricao: [
                'Small restaurants often set prices without knowing the real cost of each dish, and the delivery app’s fee can turn profit into loss without the owner noticing. LucraFood uses generative AI and vision models to read the menu from a photo and understand recipes written in free text ("bun, 150 g burger, 2 slices of cheese"), and returns each dish’s cost, counter and delivery margin, a traffic light and a suggested price.',
                'The project’s principle is: the AI reads and talks, but never does math. The AI output is JSON validated with Pydantic, retried when invalid, with provider error handling (rate limits and overload). Anything uncertain is flagged for the owner to check, nothing is saved without confirmation, and all calculations live in Python with Decimal, separate from the AI.',
                'The AI is evaluated against an answer key on real data: on 8 real menus, 251 of 254 dishes and 251 of 251 prices read correctly, and in the recipe sheet 42 of 42 ingredients across 5 runs in a row. These measurements drove decisions, such as switching from Groq to Gemini and no longer recompressing photos as JPEG, which made the model misread handwritten digits. The project has 185 back-end and 90 front-end tests, and was built with the help of Claude Code.'
            ],
            funcionalidades: [
                'Menu reading from a photo (including handwritten prices), with review before saving',
                'Recipe sheet from free text: the AI links each item to a registered ingredient and flags what needs attention',
                'A conversation that asks what is missing ("how much is 1 slice of cheese?") and remembers the restaurant’s measures',
                'Per-dish diagnosis: cost, margin, line-by-line delivery order breakdown, traffic light and suggested price',
                'Swappable AI provider (Gemini or Groq) via environment variable',
                'Landing page with an interactive demo that runs without a back-end, using real recorded AI responses',
                'Answer-key evaluation on real menus and sentences, 185 back-end and 90 front-end tests'
            ]
        }
    },
    {
        id: 'mentormatch',
        nome: 'DevFest Mentor Match',
        destaque: true,
        tags: ['JavaScript', 'Next.js', 'React', 'Tailwind CSS', 'Firebase', 'Gemini API'],
        repo: 'https://github.com/MarcusVinicius44/MentorMatch',
        demo: 'https://mentormatchgdg.web.app',
        capa: 'assets/projetos/mentormatch/capa.png',
        prints: [],
        videos: ['https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7523479905179934720?collapsed=1'],
        pt: {
            resumo: 'App que conecta quem está começando com devs experientes no mesmo evento para um café de 15 minutos, com a IA do Gemini explicando por que cada par combina.',
            descricao: [
                'Muita gente nova vai ao DevFest sem conhecer ninguém e sai sem criar contato. O Mentor Match conecta iniciantes e devs experientes que estão no mesmo evento: o app ranqueia as pessoas com assuntos complementares, o Gemini explica por que o par combina e sugere um tema de conversa, e os dois combinam o café em um chat em tempo real.',
                'O ranking é determinístico e não depende da IA: assuntos que eu quero aprender e a outra pessoa ensina valem mais, e pares iniciante e experiente ganham bônus. Se o Gemini ficar indisponível, os cards continuam mostrando os assuntos em comum. A chamada à IA acontece só no servidor, depois de validar o login.'
            ],
            funcionalidades: [
                'Login com Google (Firebase Authentication) e perfil em 4 passos',
                'Ranking de matches por assuntos complementares, com selo de força do match',
                'Explicação e tema de conversa gerados pelo Gemini, chamado apenas no servidor',
                'Convites para o café, com aceite ou recusa',
                'Chat em tempo real entre quem aceitou, com contato liberado só nesse momento',
                'Regras de segurança do Firestore e deploy no Firebase App Hosting'
            ]
        },
        en: {
            resumo: 'App that connects beginners with experienced devs at the same event for a 15-minute coffee, with Gemini AI explaining why each pair fits.',
            descricao: [
                'Many newcomers go to DevFest without knowing anyone and leave without making contacts. Mentor Match connects beginners and experienced devs attending the same event: the app ranks people with complementary topics, Gemini explains why the pair fits and suggests a conversation topic, and the two arrange the coffee in a real-time chat.',
                'The ranking is deterministic and does not depend on AI: topics I want to learn and the other person teaches weigh more, and beginner and experienced pairs get a bonus. If Gemini is unavailable, the cards still show the topics in common. The AI call happens only on the server, after checking the login.'
            ],
            funcionalidades: [
                'Google sign-in (Firebase Authentication) and a 4-step profile',
                'Match ranking by complementary topics, with a match-strength badge',
                'Explanation and conversation topic generated by Gemini, called only on the server',
                'Coffee invitations, with accept or decline',
                'Real-time chat between people who accepted, with contact info revealed only then',
                'Firestore security rules and deployment on Firebase App Hosting'
            ]
        }
    },
    {
        id: 'lanche-coletivo',
        nome: 'Lanche Coletivo',
        destaque: true,
        tags: ['TypeScript', 'React', 'Vite', 'Tailwind CSS', 'Firebase'],
        repo: 'https://github.com/MarcusVinicius44/GDG-LancheColetivo',
        demo: 'https://gdg-lanche-coletivo.web.app',
        capa: 'assets/projetos/lanche-coletivo/capa.png',
        prints: [],
        videos: ['assets/projetos/lanche-coletivo/demo.mp4'],
        pt: {
            resumo: 'App usado nos eventos do GDG Aracaju para organizar o coffee break feito por todos: cada pessoa escolhe o que leva e vê em tempo real o que ainda falta, sem planilha nem grupo de WhatsApp.',
            descricao: [
                'O Lanche Coletivo substitui as listas soltas e as mensagens perdidas do coffee break dos eventos do GDG Aracaju. A pessoa entra com a conta Google, escolhe um item, a quantidade e o sabor, e acompanha ao vivo o que ainda falta. Teve o primeiro uso no Coding Jam de Halloween, em 31/10/2026.',
                'O desafio central era a concorrência: várias pessoas disputando a última unidade ao mesmo tempo, sem servidor próprio e sem custo fixo. O app roda no navegador e fala direto com o Firestore. A regra de negócio fica nas Security Rules, que impedem estourar a meta, burlar contadores ou mexer na contribuição de outra pessoa, e cada regra tem teste contra o emulador do Firebase.'
            ],
            funcionalidades: [
                'Login com Google e atualização em tempo real do que falta levar',
                'Contribuições com transações e revalidação nas Security Rules, com testes de disputa pela última unidade',
                'Limites por pessoa e por sabor, prazo e regras diferentes depois do prazo',
                'Painel da organização: eventos a partir de template, itens editáveis, painel de lacunas e exportação para WhatsApp e CSV',
                'Detecção de navegador embutido (WhatsApp/Instagram) e layout pensado para o celular',
                'Testes de segurança contra o emulador (Vitest) e lógica de domínio pura testada à parte'
            ]
        },
        en: {
            resumo: 'App used at GDG Aracaju events to organize the community-made coffee break: each person picks what to bring and sees in real time what is still missing, with no spreadsheet or messy WhatsApp group.',
            descricao: [
                'Lanche Coletivo replaces the loose lists and lost messages of the GDG Aracaju events’ coffee break. People sign in with Google, pick an item, a quantity and a flavor, and follow live what is still missing. It was first used at the Halloween Coding Jam on 10/31/2026.',
                'The core challenge was concurrency: many people competing for the last unit at the same time, with no server of its own and no fixed cost. The app runs in the browser and talks straight to Firestore. The business rules live in the Security Rules, which prevent exceeding the target, tampering with counters or touching someone else’s contribution, and every rule is tested against the Firebase emulator.'
            ],
            funcionalidades: [
                'Google sign-in and real-time update of what is still missing',
                'Contributions using transactions and revalidation in the Security Rules, with tests for the race to the last unit',
                'Per-person and per-flavor limits, a deadline and different rules after it',
                'Organizer panel: events from templates, editable items, gap panel and export to WhatsApp and CSV',
                'In-app browser detection (WhatsApp/Instagram) and a mobile-first layout',
                'Security tests against the emulator (Vitest) and pure domain logic tested separately'
            ]
        }
    },
    {
        id: 'sabios',
        nome: 'Sábios',
        destaque: false,
        emDesenvolvimento: true,
        tags: ['JavaScript', 'React', 'Vite', 'Tailwind CSS'],
        repo: null,
        demo: null,
        capa: 'assets/projetos/sabios/capa.png',
        prints: ['assets/projetos/sabios/home.png', 'assets/projetos/sabios/perfil-especialista.png'],
        videos: [],
        pt: {
            resumo: 'Plataforma em desenvolvimento que conecta empreendedores a profissionais com mais de 50 anos de experiência, para sessões de mentoria agendadas e pagas pelo próprio site.',
            descricao: [
                'O Sábios conecta donos de pequenos negócios a profissionais experientes, com mais de 50 anos, que já passaram pelos mesmos desafios. O empreendedor busca pelo problema que quer resolver (fluxo de caixa, vendas, liderança), conhece o especialista, escolhe um horário e agenda uma conversa por vídeo. Quem tem experiência também pode se cadastrar como mentor e definir seus horários e valores.',
                'O projeto está em desenvolvimento por uma equipe de 3 pessoas, com React, Vite e Tailwind CSS no front-end. Como boa parte do público é mais velha, a acessibilidade é prioridade: o site tem um painel com texto maior, alto contraste, modo simples e leitura da página em voz alta. Por enquanto os dados são de exemplo, enquanto a API é construída, e o repositório é privado.'
            ],
            funcionalidades: [
                'Página inicial com busca por desafio, como funciona, especialistas em destaque e chamada para mentores',
                'Perfil do especialista com trajetória, avaliações e cartão de agendamento (dia e horário)',
                'Painel de acessibilidade: texto maior, alto contraste e modo simples',
                'Leitura da página em voz alta com a voz do próprio navegador (Web Speech API)',
                'Escolha de perfil no cadastro: cliente ou conselheiro',
                'Rotas com React Router e componentes compartilhados'
            ]
        },
        en: {
            resumo: 'Platform under development that connects entrepreneurs with professionals over 50, for mentoring sessions booked and paid through the site.',
            descricao: [
                'Sábios connects small business owners with experienced professionals over 50 who have already faced the same challenges. The entrepreneur searches for the problem they want to solve (cash flow, sales, leadership), meets the expert, picks a time slot and books a video call. Experienced people can also sign up as mentors and set their own hours and prices.',
                'The project is being built by a team of 3, with React, Vite and Tailwind CSS on the front-end. Since much of the audience is older, accessibility is a priority: the site has a panel with larger text, high contrast, a simple mode and reading the page aloud. For now the data is sample data while the API is being built, and the repository is private.'
            ],
            funcionalidades: [
                'Home page with search by challenge, how it works, featured experts and a call for mentors',
                'Expert profile with career history, reviews and a booking card (day and time)',
                'Accessibility panel: larger text, high contrast and simple mode',
                'Reading the page aloud with the browser’s own voice (Web Speech API)',
                'Profile choice at sign-up: client or mentor',
                'Routing with React Router and shared components'
            ]
        }
    },
    {
        id: 'profort-erp',
        nome: 'Profort ERP',
        destaque: false,
        tags: ['Python', 'Django', 'Django REST Framework', 'React', 'TypeScript', 'MySQL'],
        repo: null,
        demo: null,
        capa: 'assets/projetos/profort-erp/capa.svg',
        prints: [],
        videos: [],
        pt: {
            resumo: 'ERP para supermercados em que trabalho como desenvolvedor Full Stack no estágio: estoque, vendas, fiscal, PDV e, hoje, precificação e promoções.',
            descricao: [
                'O Profort ERP é o sistema de gestão para supermercados em que atuo como desenvolvedor Full Stack (estágio) desde fevereiro de 2026. O back-end é feito com Python, Django e Django REST Framework, o front-end com React e TypeScript, e o banco é MySQL.',
                'Trabalho em funcionalidades de vários módulos, implementando regras de negócio que envolvem o relacionamento entre eles, com atenção à integridade e à consistência dos dados em processos transacionais. O código é da empresa, por isso o repositório não é público.'
            ],
            funcionalidades: [
                'Módulos de estoque, vendas, fiscal (NF-e/NFC-e), PDV, usuários e permissões',
                'Precificação e promoções (módulo em que trabalho hoje)',
                'Desenvolvimento e integração de APIs REST',
                'Modelagem de banco de dados e migrations',
                'Uso do Claude Code como apoio, com documentação de contexto e subagentes por módulo'
            ]
        },
        en: {
            resumo: 'Supermarket ERP where I work as a Full Stack developer intern: inventory, sales, tax, POS and, currently, pricing and promotions.',
            descricao: [
                'Profort ERP is the supermarket management system where I have worked as a Full Stack developer intern since February 2026. The back-end is built with Python, Django and Django REST Framework, the front-end with React and TypeScript, and the database is MySQL.',
                'I work on features across several modules, implementing business rules that involve the relationships between them, with attention to data integrity and consistency in transactional processes. The code belongs to the company, so the repository is not public.'
            ],
            funcionalidades: [
                'Inventory, sales, tax (NF-e/NFC-e), POS, users and permissions modules',
                'Pricing and promotions (the module I currently work on)',
                'Building and integrating REST APIs',
                'Database modeling and migrations',
                'Using Claude Code as support, with project context docs and per-module subagents'
            ]
        }
    },
    {
        id: 'elopay',
        nome: 'EloPay',
        destaque: false,
        tags: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'TypeScript', 'Next.js', 'Tailwind CSS'],
        repo: null,
        demo: null,
        capa: 'assets/projetos/elopay/capa.svg',
        prints: [],
        videos: [],
        pt: {
            resumo: 'Protótipo de carteira digital feito para um cliente: o lojista usa um saldo interno para pagar fornecedores por Pix e boleto, com o administrador controlando cada liberação.',
            descricao: [
                'O EloPay é um protótipo de carteira digital desenvolvido para um cliente que instala maquininhas em pequenos comércios. Em vez de repassar o dinheiro por transferências manuais, o cliente libera um saldo interno para cada lojista, que usa esse saldo pelo celular para pagar fornecedores por Pix ou boleto.',
                'Como envolve dinheiro, o foco foi a segurança das operações: contabilidade de partidas dobradas com histórico que não pode ser alterado, idempotência para nunca enviar o mesmo pagamento duas vezes, saldo que nunca fica negativo mesmo com pagamentos simultâneos e devolução automática quando o banco recusa. A integração bancária fica isolada e hoje roda em modo simulado. O repositório é privado por ser um projeto de cliente.'
            ],
            funcionalidades: [
                'Saldo, extrato e comprovantes para o lojista, com acesso pelo celular',
                'Pagamento por Pix (com conferência do dono da chave) e por boleto (validação da linha digitável)',
                'Fila de autorização do administrador, com aprovação ou recusa em lote e auditoria',
                'Ledger de partidas dobradas, idempotência e proteção contra saldo negativo',
                'Envio ao banco por worker em segundo plano (Redis), com limite de chamadas e conferência de status',
                'Testes de ponta a ponta contra a stack real (API, worker, PostgreSQL e Redis), rodando em Docker'
            ]
        },
        en: {
            resumo: 'Digital wallet prototype built for a client: merchants use an internal balance to pay suppliers via Pix and bank slips, with the administrator controlling each release.',
            descricao: [
                'EloPay is a digital wallet prototype built for a client who installs card machines in small shops. Instead of passing money on through manual transfers, the client releases an internal balance to each merchant, who uses it from the phone to pay suppliers via Pix or bank slip (boleto).',
                'Since it handles money, the focus was operation safety: double-entry bookkeeping with a history that cannot be changed, idempotency so a payment is never sent twice, a balance that never goes negative even with simultaneous payments, and automatic refunds when the bank rejects. The bank integration is isolated and currently runs in simulated mode. The repository is private because it is a client project.'
            ],
            funcionalidades: [
                'Balance, statement and receipts for the merchant, accessible from the phone',
                'Payment via Pix (checking the key owner) and bank slip (validating the barcode line)',
                'Administrator approval queue, with batch approve or reject and auditing',
                'Double-entry ledger, idempotency and protection against a negative balance',
                'Bank dispatch through a background worker (Redis), with rate limiting and status checks',
                'End-to-end tests against the real stack (API, worker, PostgreSQL and Redis), running on Docker'
            ]
        }
    },
    {
        id: 'cleangit',
        nome: 'CleanGit',
        destaque: false,
        tags: ['JavaScript', 'React', 'Vite', 'Chrome Extension', 'GitHub API'],
        repo: 'https://github.com/MarcusVinicius44/CleanGit',
        demo: null,
        capa: 'assets/projetos/cleangit/CapaCleanGit.jpeg',
        prints: [],
        videos: [],
        pt: {
            resumo: 'Extensão do Chrome para quem tem muitos repositórios no GitHub: mostra métricas e permite mudar a visibilidade ou apagar vários de uma vez, sem abrir um por um.',
            descricao: [
                'O CleanGit é uma extensão para Google Chrome (Manifest V3) feita para organizar e limpar a conta do GitHub. Ela reúne em uma única interface ações de gestão de repositórios que normalmente ficam espalhadas pelo site.',
                'Ela conversa direto com a GitHub REST API usando um Personal Access Token gerado pelo próprio usuário. O token fica salvo apenas no armazenamento local do navegador, sem servidor intermediário, telemetria ou coleta de dados.'
            ],
            funcionalidades: [
                'Dashboard com métricas gerais e gráfico de distribuição por linguagem',
                'Tabela de repositórios com busca, filtros de visibilidade e linguagem, ordenação e paginação',
                'Ações em massa: baixar, tornar público ou privado e apagar',
                'Validação do token contra a API antes de salvar, distinguindo token inválido, falta de permissão e erro de rede'
            ]
        },
        en: {
            resumo: 'Chrome extension for people with many GitHub repositories: it shows metrics and lets you change visibility or delete several at once, without opening them one by one.',
            descricao: [
                'CleanGit is a Google Chrome extension (Manifest V3) built to organize and clean up a GitHub account. It brings repository management actions usually scattered across the site into a single interface.',
                'It talks directly to the GitHub REST API using a Personal Access Token generated by the user. The token is stored only in the browser’s local storage, with no intermediary server, telemetry or data collection.'
            ],
            funcionalidades: [
                'Dashboard with overall metrics and a language distribution chart',
                'Repository table with search, visibility and language filters, sorting and pagination',
                'Bulk actions: download, make public or private, and delete',
                'Token validation against the API before saving, telling apart invalid token, missing permission and network error'
            ]
        }
    },
    {
        id: 'laura-comissao',
        nome: 'Agenda & Comissão',
        destaque: false,
        tags: ['Python', 'Django', 'JavaScript', 'React', 'Vite', 'Tailwind CSS', 'PostgreSQL', 'REST API'],
        repo: 'https://github.com/MarcusVinicius44/LauraComissao',
        demo: 'https://laura-comissao.vercel.app',
        capa: null,
        prints: [],
        videos: ['https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7499100349937541120?collapsed=1'],
        pt: {
            resumo: 'Sistema de gestão para um salão de unhas: organiza a agenda, evita horários conflitantes, confirma atendimentos por e-mail e calcula a comissão da profissional.',
            descricao: [
                'É um sistema de gestão sob medida para o salão Laura Fabiana Nails, em uso real. Serve para organizar a agenda e saber quanto a profissional ganhou de comissão, substituindo o controle manual por um fluxo único: cadastrar clientes e serviços, marcar horários, registrar o que foi realizado e conferir a comissão do período.',
                'A agenda calcula o horário de término pela duração do serviço e recusa horários que se cruzam. Um dia antes, a cliente recebe um e-mail com botão de confirmação e a profissional é avisada quando ela confirma. Está no ar com API Django no Render, PostgreSQL no Neon e frontend React na Vercel.'
            ],
            funcionalidades: [
                'Agenda com bloqueio automático de conflitos e cálculo do horário de término',
                'Clientes e serviços, com valor, % de comissão e duração padrão',
                'Atendimentos com valor e comissão editáveis, recalculados no servidor',
                'Confirmação por e-mail um dia antes, com status na agenda',
                'Relatório por período, com filtro por cliente ou serviço',
                'Login por token e interface responsiva para uso no celular'
            ]
        },
        en: {
            resumo: 'Management system for a nail salon: it organizes the schedule, avoids conflicting time slots, confirms appointments by email and calculates the professional’s commission.',
            descricao: [
                'It is a management system built for the Laura Fabiana Nails salon, in real use. It organizes the schedule and shows how much commission the professional earned, replacing manual tracking with a single flow: register clients and services, book time slots, log what was done and check the period’s commission.',
                'The schedule calculates the end time from the service duration and rejects overlapping bookings. One day ahead, the client gets an email with a confirm button and the professional is notified when she confirms. It is live with a Django API on Render, PostgreSQL on Neon and a React frontend on Vercel.'
            ],
            funcionalidades: [
                'Scheduling that blocks conflicts automatically and calculates the end time',
                'Clients and services, with price, commission % and default duration',
                'Appointments with editable price and commission, recalculated on the server',
                'Email confirmation one day ahead, with status on the schedule',
                'Report by period, filterable by client or service',
                'Token login and a responsive interface for phone use'
            ]
        }
    },
    {
        id: 'neuroguia',
        nome: 'NeuroGuia',
        destaque: false,
        tags: ['Dart', 'Flutter', 'Firebase', 'Gemini API', 'Node.js'],
        repo: 'https://github.com/MarcusVinicius44/NeuroGuia',
        demo: null,
        capa: 'assets/projetos/neuroguia/icon.png',
        prints: [],
        videos: [],
        pt: {
            resumo: 'App mobile de apoio a pessoas neurodivergentes, feito em equipe com Flutter: rotina, modo foco e um chat com IA.',
            descricao: [
                'O NeuroGuia é um app mobile de apoio a neurodivergentes, proposto pela faculdade para aplicar os conhecimentos de desenvolvimento mobile e Node.js. Foi desenvolvido em equipe, com Flutter e Dart.',
                'O app tem login, organização de rotina, um modo foco com técnica pomodoro e um chat com IA (Gemini), com tema configurável e interface responsiva.'
            ],
            funcionalidades: [
                'Login e perfil de usuário com preferências',
                'Organização de rotina com tarefas',
                'Modo foco com pomodoro',
                'Chat com IA (Gemini)',
                'Tema configurável e interface responsiva'
            ]
        },
        en: {
            resumo: 'Mobile app supporting neurodivergent people, built by a team with Flutter: routine, focus mode and an AI chat.',
            descricao: [
                'NeuroGuia is a mobile app supporting neurodivergent people, proposed by the university to apply what was learned about mobile development and Node.js. It was built by a team with Flutter and Dart.',
                'The app has login, routine organization, a focus mode with the pomodoro technique and an AI chat (Gemini), with a configurable theme and a responsive interface.'
            ],
            funcionalidades: [
                'Login and user profile with preferences',
                'Routine organization with tasks',
                'Focus mode with pomodoro',
                'AI chat (Gemini)',
                'Configurable theme and responsive interface'
            ]
        }
    },
    {
        id: 'vitalmen',
        nome: 'VitalMen',
        destaque: false,
        tags: ['Python', 'Flask', 'PostgreSQL', 'HTML', 'CSS', 'JavaScript'],
        repo: 'https://github.com/MarcusVinicius44/VitalMen_Py',
        demo: null,
        capa: 'assets/projetos/vitalmen/vital-logo.png',
        prints: [],
        videos: [{ src: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7432740350655447040?collapsed=1', altura: 645 }],
        pt: {
            resumo: 'Aplicação web para incentivar o autocuidado e a conscientização sobre a saúde masculina, com conteúdos de saúde, acompanhamento de tarefas e comunidade.',
            descricao: [
                'O VitalMen é uma aplicação full stack voltada à conscientização e ao autocuidado na saúde masculina, feita com HTML, CSS, JavaScript, Flask e PostgreSQL. Ele oferece um espaço para ler conteúdos de saúde, acompanhar tarefas e interagir com uma comunidade.'
            ],
            funcionalidades: [
                'Autenticação de usuários',
                'Gestão de conteúdos sobre saúde',
                'Acompanhamento de tarefas',
                'Engajamento da comunidade',
                'Interface responsiva'
            ]
        },
        en: {
            resumo: 'Web app to encourage self-care and awareness of men’s health, with health content, task tracking and a community.',
            descricao: [
                'VitalMen is a full stack application focused on men’s health awareness and self-care, built with HTML, CSS, JavaScript, Flask and PostgreSQL. It gives users a place to read health content, track tasks and engage with a community.'
            ],
            funcionalidades: [
                'User authentication',
                'Health content management',
                'Task tracking',
                'Community engagement',
                'Responsive interface'
            ]
        }
    },
    {
        id: 'fea',
        nome: 'FEA',
        destaque: false,
        tags: ['C#', 'ASP.NET', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
        repo: 'https://github.com/MarcusVinicius44/FEA',
        demo: null,
        capa: 'assets/projetos/fea/FeaLogo.png' ,
        prints: [],
        videos: [],
        pt: {
            resumo: 'Plataforma web contra o desperdício de alimentos: pontos de coleta de doações em Salvador, parceiros, eventos educativos e receitas de reaproveitamento.',
            descricao: [
                'FEA (Food Expiration Application) é uma plataforma web de combate ao desperdício de alimentos, desenvolvida com ASP.NET Core (Razor Pages), C# e MySQL. O objetivo é conscientizar sobre o consumo responsável e redistribuir alimentos excedentes para comunidades carentes, em parceria com produtores, varejistas e instituições.',
                'O site explica como doar em três passos (cadastrar-se, buscar o ponto de coleta mais próximo e registrar o alimento) e lista os bairros de Salvador com pontos de coleta, que aceitam apenas alimentos não perecíveis. Também reúne a página de parceiros, com redes de supermercado e descontos para quem compra nelas, eventos educativos e a seção "Receitiliza", com receitas que aproveitam cascas e partes de alimentos normalmente descartadas.',
                'Os formulários de contato e de parceria gravam direto no banco MySQL, via Entity Framework Core com migrations. É um projeto acadêmico, e as telas de login, cadastro e doação de alimentos são o protótipo da interface, ainda sem lógica de servidor.'
            ],
            funcionalidades: [
                'Guia "Como doar" em três passos e lista de pontos de coleta em bairros de Salvador',
                'Formulário "Seja parceiro" para empresas (nome, CNPJ, CEP, telefone, e-mail e mensagem), salvo no MySQL',
                'Formulário de contato com envio salvo no banco de dados',
                'Página de parceiros com redes de supermercado e descontos',
                'Eventos: workshops de culinária, palestras, feiras de troca e atividades para crianças',
                '"Receitiliza": receitas de reaproveitamento, como petisco de casca de batata e panqueca de casca de cenoura',
                'Telas de login, cadastro e cadastro de alimentos doados (marca, nome, quantidade e validade), com validação no navegador',
                'Banco de dados versionado com Entity Framework Core migrations'
            ]
        },
        en: {
            resumo: 'Web platform against food waste: donation collection points in Salvador, partners, educational events and reuse recipes.',
            descricao: [
                'FEA (Food Expiration Application) is a web platform against food waste, built with ASP.NET Core (Razor Pages), C# and MySQL. Its goal is to raise awareness of responsible consumption and redistribute surplus food to communities in need, in partnership with producers, retailers and institutions.',
                'The site explains how to donate in three steps (sign up, find the nearest collection point and register the food) and lists the neighborhoods of Salvador with collection points, which accept only non-perishable food. It also brings together a partners page, with supermarket chains and discounts for shoppers, educational events and the "Receitiliza" section, with recipes that use peels and other parts of food that are usually thrown away.',
                'The contact and partnership forms save directly to the MySQL database, through Entity Framework Core with migrations. It is an academic project, and the login, sign-up and food donation screens are the interface prototype, still without server-side logic.'
            ],
            funcionalidades: [
                '"How to donate" guide in three steps and a list of collection points in neighborhoods of Salvador',
                '"Become a partner" form for companies (name, CNPJ, ZIP code, phone, email and message), saved to MySQL',
                'Contact form whose submissions are saved to the database',
                'Partners page with supermarket chains and discounts',
                'Events: cooking workshops, talks, swap fairs and activities for children',
                '"Receitiliza": reuse recipes, such as potato peel snacks and carrot peel pancakes',
                'Login, sign-up and donated-food registration screens (brand, name, quantity and expiry date), with browser-side validation',
                'Database versioned with Entity Framework Core migrations'
            ]
        }
    },
    {
        id: 'laura-nails',
        nome: 'Laura Nails',
        destaque: false,
        tags: ['JavaScript', 'React', 'Vite'],
        repo: 'https://github.com/MarcusVinicius44/LauraNailsSite',
        demo: 'https://laurafabiananails.vercel.app',
        capa: 'assets/projetos/laura-nails/logosite.png',
        prints: [],
        videos: [],
        pt: {
            resumo: 'Site de apresentação de um estúdio de unhas em Aracaju/SE, para atrair clientes: mostra serviços e valores, a galeria de trabalhos e leva ao agendamento pelo WhatsApp.',
            descricao: [
                'Landing page do estúdio Laura Nails, de unhas em gel em Aracaju/SE. Serve de vitrine online do estúdio e transforma visitas em agendamentos.',
                'Apresenta o catálogo de serviços com valores, uma galeria de trabalhos e leva a cliente direto ao agendamento pelo WhatsApp. Feita com React + Vite e publicada na Vercel.'
            ],
            funcionalidades: [
                'Catálogo de serviços e valores',
                'Galeria de trabalhos',
                'Agendamento direto pelo WhatsApp'
            ]
        },
        en: {
            resumo: 'Presentation site for a nail studio in Aracaju/SE, built to attract clients: it shows services and prices, the work gallery and leads to booking through WhatsApp.',
            descricao: [
                'Landing page for Laura Nails, a gel nail studio in Aracaju/SE, Brazil. It works as the studio’s online storefront and turns visits into bookings.',
                'It presents the service catalog with prices, a work gallery and takes the client straight to booking through WhatsApp. Built with React + Vite and deployed on Vercel.'
            ],
            funcionalidades: [
                'Service and price catalog',
                'Work gallery',
                'Direct booking through WhatsApp'
            ]
        }
    },
    {
        id: 'flash-hair',
        nome: 'Flash Hair',
        destaque: false,
        tags: ['TypeScript', 'Next.js', 'React'],
        repo: 'https://github.com/MarcusVinicius44/Site-FlashHair',
        demo: 'https://flashhair.vercel.app',
        capa: 'assets/projetos/flash-hair/LogoFlashHair.jpg',
        prints: [],
        videos: [],
        pt: {
            resumo: 'Site de apresentação de um estúdio de beleza em Aracaju/SE, para divulgar serviços e profissionais, mostrar a localização e levar o cliente ao agendamento pelo WhatsApp.',
            descricao: [
                'Landing page do estúdio de beleza Flash Hair, em Aracaju/SE. Serve de vitrine online e canal de agendamento do estúdio.',
                'Reúne o catálogo de serviços e profissionais, galeria de trabalhos, localização e agendamento direto pelo WhatsApp. Feita com Next.js, React e TypeScript e publicada na Vercel.'
            ],
            funcionalidades: [
                'Catálogo de serviços e profissionais',
                'Galeria de trabalhos',
                'Localização do estúdio',
                'Agendamento direto pelo WhatsApp'
            ]
        },
        en: {
            resumo: 'Presentation site for a beauty studio in Aracaju/SE, to promote its services and professionals, show the location and lead clients to book through WhatsApp.',
            descricao: [
                'Landing page for Flash Hair, a beauty studio in Aracaju/SE, Brazil. It works as the studio’s online storefront and booking channel.',
                'It gathers the catalog of services and professionals, a work gallery, the location and direct booking through WhatsApp. Built with Next.js, React and TypeScript and deployed on Vercel.'
            ],
            funcionalidades: [
                'Catalog of services and professionals',
                'Work gallery',
                'Studio location',
                'Direct booking through WhatsApp'
            ]
        }
    }
];
