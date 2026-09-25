// Inicializar ícones Lucide
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
});

const scrollRevealSelector = [
    '.impact-item',
    '.expertise-card',
    '.case-study-card',
    '.competencias-bloco',
    '.project-card',
    '#experiencia .relative.pl-8',
    '#formacao .bg-brand-gray-900'
].join(',');

function revealVisibleItems(root) {
    const scope = root || document;
    const targets = scope.querySelectorAll('.reveal-on-scroll:not(.is-visible)');
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    targets.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top < viewportHeight * 0.92 && rect.bottom > 0) {
            item.classList.add('is-visible');
        }
    });
}

function initScrollAnimations() {
    const targets = document.querySelectorAll(scrollRevealSelector);
    if (!targets.length) return;

    targets.forEach((item, index) => {
        item.classList.add('reveal-on-scroll');
        item.style.setProperty('--reveal-delay', `${(index % 4) * 70}ms`);
    });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        targets.forEach(item => item.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries, activeObserver) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                activeObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.12
    });

    targets.forEach(item => observer.observe(item));
    revealVisibleItems(document);
}

// Função para controlar a navegação por abas
function showTab(tabName, ev) {
    // Esconder todos os conteúdos
    const allContents = document.querySelectorAll('.tab-content');
    allContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remover active de todos os botões
    const allTabs = document.querySelectorAll('.nav-tab');
    allTabs.forEach(tab => {
        tab.classList.remove('active');
        tab.setAttribute('aria-selected', 'false');
    });
    
    // Mostrar o conteúdo selecionado com fade
    const selectedContent = document.getElementById('tab-' + tabName);
    if (selectedContent) {
        // Reset animation so it replays even when switching back
        selectedContent.style.animation = 'none';
        selectedContent.offsetHeight; // force reflow
        selectedContent.style.animation = '';
        selectedContent.classList.add('active');
    }
    
    // Ativar o botão selecionado (se o event estiver disponível)
    try {
        const target = ev && ev.target ? ev.target : window.event && window.event.target;
        const tabEl = target.closest && target.closest('.nav-tab') ? target.closest('.nav-tab') : null;
        if (tabEl) {
            tabEl.classList.add('active');
            tabEl.setAttribute('aria-selected', 'true');
        }
    } catch (e) {
        // ignore
    }
    
    // Mantem a posição atual do utilizador ao trocar de aba.
    requestAnimationFrame(() => revealVisibleItems(selectedContent));
}

/* ===== THEME & I18N ===== */
const translations = {
    'nav.cv': { pt: 'Currículo', en: 'Resume' },
    'nav.about': { pt: 'Sobre Mim', en: 'About Me' },
    'nav.distinctions': { pt: 'Distinções Profissionais', en: 'Professional Distinctions' },
    'heading.skills': { pt: 'Competências Técnicas', en: 'Technical Skills' },
    'heading.projects': { pt: 'Arquivo de Projetos', en: 'Project Archive' },
    'heading.experience': { pt: 'Experiência Profissional', en: 'Professional Experience' },
    'heading.education': { pt: 'Formação Académica', en: 'Education' },
    'hero.eyebrow': { pt: 'Santa Maria da Feira, Portugal • Remoto / Híbrido / Presencial', en: 'Santa Maria da Feira, Portugal • Remote / Hybrid / On-site' },
    'hero.subtitle': { pt: 'Full-stack Developer | IA, Automação e SIG', en: 'Full-stack Developer | AI, Automation & GIS' },
    'hero.lead': { pt: 'Construo aplicações web, mobile e desktop para automatizar processos, integrar dados geográficos e apoiar decisões operacionais em ambientes exigentes.', en: 'I build web, mobile and desktop applications that automate processes, integrate geographic data and support operational decisions in demanding environments.' },
    'hero.cta.contact': { pt: 'Contactar', en: 'Contact' },
    'hero.cta.github': { pt: 'Ver GitHub', en: 'View GitHub' },
    'hero.proof.critical.value': { pt: 'Critical Software', en: 'Critical Software' },
    'hero.proof.critical.label': { pt: 'Lighthouse • Space Ground Segment', en: 'Lighthouse • Space Ground Segment' },
    'hero.proof.gis.value': { pt: 'ArcGIS / QGIS', en: 'ArcGIS / QGIS' },
    'hero.proof.gis.label': { pt: 'operações georreferenciadas', en: 'georeferenced operations' },
    'hero.proof.ai.value': { pt: 'AI agents + automação', en: 'AI agents + automation' },
    'hero.proof.ai.label': { pt: 'produtividade moderna', en: 'modern productivity' },
    'hero.card.label': { pt: 'Foco profissional', en: 'Professional focus' },
    'hero.card.title': { pt: 'Software para contexto real', en: 'Software for real-world context' },
    'hero.card.desc': { pt: 'Experiência em sistemas operacionais, SIG, automação, LLMs e interfaces para utilizadores no terreno.', en: 'Experience with operational systems, GIS, automation, LLMs and interfaces for field users.' },
    'impact.one.label': { pt: 'entregues', en: 'delivered' },
    'impact.one.value': { pt: 'dashboards operacionais', en: 'operational dashboards' },
    'impact.two.label': { pt: 'nacional · 1 internacional', en: 'national · 1 international' },
    'impact.two.value': { pt: 'operações apoiadas', en: 'operations supported' },
    'impact.three.label': { pt: 'monitorizadas a nível nacional', en: 'monitored nationwide, daily' },
    'impact.three.value': { pt: 'equipas de campo', en: 'field teams' },
    'impact.four.label': { pt: 'meses de trabalho poupados', en: 'months of work saved' },
    'impact.four.value': { pt: 'impacto da automação', en: 'automation impact' },
    'expertise.kicker': { pt: 'Especialização', en: 'Specialization' },
    'expertise.title': { pt: 'O que levo para uma equipa moderna de software', en: 'What I bring to a modern software team' },
    'expertise.software.title': { pt: 'Aplicações completas', en: 'Complete applications' },
    'expertise.software.desc': { pt: 'Desenvolvimento web, mobile e desktop com foco em interfaces claras, dados persistentes, APIs e utilizadores reais.', en: 'Web, mobile and desktop development focused on clear interfaces, persistent data, APIs and real users.' },
    'expertise.gis.title': { pt: 'GIS & operational intelligence', en: 'GIS & operational intelligence' },
    'expertise.gis.desc': { pt: 'Experiência aplicada em ArcGIS, QGIS, QuickCapture, Field Maps e dashboards para acompanhamento operacional.', en: 'Applied experience with ArcGIS, QGIS, QuickCapture, Field Maps and dashboards for operational monitoring.' },
    'expertise.automation.title': { pt: 'Automação e IA', en: 'Automation and AI' },
    'expertise.automation.desc': { pt: 'Automatização de processos, geração de relatórios, integração com LLMs e redução de trabalho manual repetitivo.', en: 'Process automation, report generation, LLM integration and reduction of repetitive manual work.' },
    'expertise.aiagents.title': { pt: 'AI-assisted engineering', en: 'AI-assisted engineering' },
    'expertise.aiagents.desc': { pt: 'Uso avançado de agentes de IA, workflows assistidos e ferramentas modernas para acelerar análise, prototipagem e entrega de software.', en: 'Advanced use of AI agents, assisted workflows and modern tools to accelerate analysis, prototyping and software delivery.' },
    'selected.kicker': { pt: 'Trabalhos selecionados', en: 'Selected work' },
    'selected.title': { pt: 'Case studies em destaque', en: 'Featured case studies' },
    'selected.lead': { pt: 'Uma seleção dos trabalhos mais fortes primeiro. O arquivo completo de projetos continua disponível abaixo.', en: 'A curated view of the strongest work first. The complete project archive remains available below.' },
    'selected.gis.image': { pt: 'TODO imagem: dashboard ArcGIS anonimizado ou mockup recriado com contexto de mapa, KPIs e monitorização de equipas. Remover nomes, coordenadas e camadas sensíveis.', en: 'TODO image: anonymized ArcGIS dashboard or recreated mockup with map context, KPIs and team monitoring. Remove names, coordinates and sensitive layers.' },
    'selected.gis.label': { pt: 'SIG operacional', en: 'Operational GIS' },
    'selected.gis.title': { pt: 'Dashboards SIG para operações em terreno', en: 'GIS dashboards for field operations' },
    'selected.gis.desc': { pt: 'Conceção e apoio a workflows ArcGIS/QGIS, dashboards e recolha de dados em terreno para operações nacionais, monitorização diária e apoio à decisão.', en: 'Designed and supported ArcGIS/QGIS workflows, dashboards and field data collection for national operations, daily monitoring and decision support.' },
    'selected.gis.metric1.label': { pt: 'Dashboards', en: 'Dashboards' },
    'selected.gis.metric1.value': { pt: '8+', en: '8+' },
    'selected.gis.metric2.label': { pt: 'Equipas', en: 'Teams' },
    'selected.gis.metric2.value': { pt: '48+ por dia', en: '48+ daily' },
    'selected.ai.image': { pt: 'TODO imagem: mockup UI anonimizado com fluxo multi-etapas, avaliação de risco, análise com IA e relatório gerado.', en: 'TODO image: anonymized UI mockup showing the multi-step workflow, risk assessment, AI analysis and generated report.' },
    'selected.ai.label': { pt: 'Automação com IA', en: 'AI automation' },
    'selected.ai.title': { pt: 'Aplicação de busca de pessoas desaparecidas com IA', en: 'Missing-person search application with AI' },
    'selected.ai.desc': { pt: 'Aplicação full-stack para fluxos de emergência, processamento de dados estruturados, geração dinâmica de prompts, análise com LLMs e relatórios operacionais automatizados.', en: 'Full-stack application for emergency workflows, structured data processing, dynamic prompt generation, LLM analysis and automated operational reports.' },
    'selected.ai.metric1.label': { pt: 'Foco', en: 'Focus' },
    'selected.ai.metric1.value': { pt: 'Apoio à decisão', en: 'Decision support' },
    'selected.ai.metric2.label': { pt: 'Stack', en: 'Stack' },
    'selected.ai.metric2.value': { pt: 'React + Node', en: 'React + Node' },
    'selected.automation.image': { pt: 'TODO imagem: fluxo antes/depois, relatório anonimizado ou diagrama de processo mostrando a tarefa de 4 dias reduzida para 30 minutos.', en: 'TODO image: before/after workflow, redacted report sample or process diagram showing the 4-day task reduced to 30 minutes.' },
    'selected.automation.label': { pt: 'Automação de processos', en: 'Process automation' },
    'selected.automation.title': { pt: 'Automação de reporting operacional', en: 'Operational reporting automation' },
    'selected.automation.desc': { pt: 'Automatização de workflows operacionais repetitivos e tarefas de reporting, transformando trabalho manual de vários dias num processo curto e repetível.', en: 'Automation of repetitive operational workflows and reporting tasks, turning multi-day manual work into a short, repeatable process.' },
    'selected.automation.metric1.label': { pt: 'Antes', en: 'Before' },
    'selected.automation.metric1.value': { pt: '4 dias', en: '4 days' },
    'selected.automation.metric2.label': { pt: 'Depois', en: 'After' },
    'selected.automation.metric2.value': { pt: '30 min', en: '30 min' },
    'projects.archive.note': { pt: 'Repositório completo de projetos profissionais, operacionais e técnicos. Os trabalhos mais representativos estão destacados acima, enquanto esta secção mantém visível o percurso mais amplo.', en: 'Complete repository of professional, operational and technical projects. The most representative work is highlighted above, while this section keeps the broader track record visible.' },
    'skills.languages': { pt: 'Linguagens de Programação', en: 'Programming Languages' },
    'skills.others': { pt: 'Outras Competências Técnicas', en: 'Other Technical Skills' },
    'skills.frameworks': { pt: 'Frameworks', en: 'Frameworks' },
    'framework.springboot': { pt: 'SpringBoot', en: 'Spring Boot' },
    'framework.maui': { pt: 'MAUI', en: 'MAUI' },
    'framework.blazor': { pt: 'Blazor', en: 'Blazor' },
    'framework.react': { pt: 'React', en: 'React' },
    'framework.typescript': { pt: 'TypeScript', en: 'TypeScript' },
    'framework.jetpack': { pt: 'Jetpack Compose', en: 'Jetpack Compose' },
    'framework.javafx': { pt: 'JavaFX', en: 'JavaFX' },
    'projects.p1.title': { pt: 'Aplicação de Busca de Pessoas desaparecidas', en: 'Missing Persons Search Application' },
    'projects.p1.desc': { pt: 'Aplicação full-stack mission-critical para automatização de processos de emergência. Sistema processa dados estruturados de pessoas desaparecidas, com geração de prompts dinâmicos através da integração de dados contextuais, integra APIs de IA (LLMs) para análise e previsão, e produz relatórios operacionais automatizados com geração de PDF e distribuição por email. Interface multi-etapas, algoritmos de avaliação de risco, dashboard em tempo real, sistema de análise comportamental baseado em dados históricos.', en: 'Full-stack mission-critical application to automate emergency processes. Processes structured missing-person data, generates dynamic prompts from contextual data, integrates AI (LLMs) APIs for analysis and prediction, and produces automated operational reports (PDF/email). Multi-step interface, risk assessment algorithms, real-time dashboard and behavior analysis based on historical data.' },
    'projects.p2.title': { pt: 'Plataforma Distribuída de Avaliação para Professores e Alunos', en: 'Distributed Assessment Platform for Teachers and Students' },
    'projects.p2.desc': { pt: 'Plataforma com gestão de sessões para dois tipos de perfis: professores e alunos, permitindo criar perguntas e submeter respostas para avaliação em ambiente académico. Utiliza arquitetura distribuída com RMI para comunicação entre cliente e servidor, garantindo escalabilidade e robustez. Inclui persistência de dados com SQLite e interface gráfica intuitiva com JavaFX.', en: 'Platform with session management for two types of profiles: teachers and students, allowing question creation and response submission for academic assessment. Uses distributed architecture with RMI for client-server communication, ensuring scalability and robustness. Includes data persistence with SQLite and intuitive graphical interface with JavaFX.' },
    'projects.p2b.title': { pt: 'Registo Fotográfico Georreferenciado', en: 'Georeferenced Photo Capture' },
    'projects.p2b.desc': { pt: 'Aplicação mobile para captação de fotos com marca de água automática (GPS, direção, data/hora, logótipo), ideal para documentação de campo com partilha imediata.', en: 'Mobile app for capturing photos with automatic watermark (GPS, heading, timestamp, logo), ideal for field documentation with immediate sharing.' },
    'projects.p3.title': { pt: 'Sugestão de Prendas Personalizadas com IA', en: 'AI-Powered Personalized Gift Suggestions' },
    'projects.p3.desc': { pt: 'Aplicação com sistema de criação e gestão de utilizadores, dispondo de um dashboard com navegação intuitiva, para registo de Enjoyers (pessoas a presentear) e, com base nas suas informações, gostos e parâmetros, a IA aprende e sugere prendas personalizadas de qualquer tipo, com maior probabilidade de agradar, tendo em consideração a ocasião, complementando com uma mensagem digna para acompanhar o presente.', en: 'Application with user creation and management system, featuring an intuitive dashboard for registering Enjoyers (people to gift) and, based on their information, preferences and parameters, AI learns and suggests personalized gifts of any kind, with higher likelihood of pleasing, considering the occasion, complemented with a worthy message to accompany the gift.' },
    'projects.p3b.title': { pt: 'Tracking e Gestão de Utilizadores', en: 'Tracking and User Management' },
    'projects.p3b.desc': { pt: 'Aplicação com login, registo de percursos, estatísticas e exportação (CSV, JSON). Sincronização em tempo real com base de dados Firebase.', en: 'App with login, route recording, statistics and export (CSV, JSON). Real-time sync with Firebase backend.' },
    'projects.p4.title': { pt: 'Jogo Educativo Escolar', en: 'Educational School Game' },
    'projects.p4.desc': { pt: 'Jogo para incentivar ao estudo crianças do 1º ao 4º ciclo, com interface simples e bloqueio do dispositivo até cumprimento de desafios. Configurável via painel de Admin.', en: 'Game to encourage studying for children in primary school, with a simple interface and device lock until challenges are completed. Configurable via an Admin panel.' },
    'about.title': { pt: 'Sobre Mim', en: 'About Me' },
    'about.kicker': { pt: 'A minha história', en: 'My story' },
    'about.lead': { pt: 'O meu percurso para a engenharia de software começou num contexto operacional altamente exigente. Dediquei mais de 15 anos à GNR — primeiro no patrulhamento, depois em operações na Unidade de Emergência de Proteção e Socorro (UEPS). Lidar com cenários críticos moldou a minha abordagem à disciplina, fiabilidade e entrega de resultados.', en: 'My path into software engineering began in demanding, high-stakes environments. I dedicated over 15 years to the GNR — first in patrol, then in emergency protection and rescue operations (UEPS). Handling mission-critical scenarios deeply shaped my focus on discipline, reliability, and delivering results.' },
    'about.mid': { pt: 'Em 2020, ainda no ativo, transitei para um novo papel: construir as ferramentas digitais que faltavam às nossas equipas de terreno. Dashboards SIG, aplicações mobile, workflows de emergência com IA — ferramentas com consequências operacionais reais e utilizadores reais que dependiam delas todos os dias.', en: 'In 2020, while still in service, I transitioned to a new role: building the digital tools our field teams were missing. GIS dashboards, mobile apps, AI-powered emergency workflows — tools with real operational consequences and real users depending on them every day.' },
    'about.close': { pt: 'Em 2023 matriculei-me no ISEC para formalizar a minha formação em Engenharia Informática. Realizei com sucesso o meu estágio curricular na Critical Software (divisão ASD / SpaceForce, concluído em Julho de 2026), focado em software de comunicações para missões de satélite. Elevado rigor e qualidade técnica continuam a ser o meu padrão.', en: 'In 2023 I enrolled at ISEC to formalize my practice in Computer Engineering. I completed my Software Engineering Internship at Critical Software (ASD / SpaceForce division, finished in July 2026), contributing to satellite mission communication software. High rigor and technical standards remain my foundation.' },
    'about.fact1.label': { pt: 'GNR · 15+ anos', en: 'GNR · 15+ years' },
    'about.fact1.desc': { pt: 'Serviço público, disciplina e liderança operacional', en: 'Public service, discipline and operational leadership' },
    'about.fact2.label': { pt: 'Autodidata → ISEC', en: 'Self-taught → ISEC' },
    'about.fact2.desc': { pt: 'Licenciatura formal em Eng. Informática', en: 'Formal Computer Engineering degree' },
    'about.fact3.label': { pt: 'Critical Software', en: 'Critical Software' },
    'about.fact3.desc': { pt: 'Lighthouse Ground Segment • Missões satélite', en: 'Lighthouse Ground Segment • Satellite missions' },
    'about.fact4.label': { pt: 'Santa Maria da Feira, Portugal', en: 'Santa Maria da Feira, Portugal' },
    'about.fact4.desc': { pt: 'Disponível para Remoto, Híbrido ou Presencial', en: 'Open to Remote, Hybrid or On-site' },
    'about.values.kicker': { pt: 'O que valorizo', en: 'What I value' },
    'about.val1': { pt: 'Impacto real', en: 'Real-world impact' },
    'about.val2': { pt: 'Profundidade técnica', en: 'Technical depth' },
    'about.val3': { pt: 'Entrega ágil', en: 'Fast delivery' },
    'about.val4': { pt: 'Equipa em primeiro', en: 'Team-first mindset' },
    'about.val5': { pt: 'Aprendizagem contínua', en: 'Continuous learning' },
    'about.val6': { pt: 'IA com propósito', en: 'AI with purpose' },
    'distinctions.title': { pt: 'Distinções Profissionais', en: 'Professional Distinctions' },
    'distinctions.m1.title': { pt: 'Medalha de D. Nuno Álvares Pereira - Mérito', en: 'D. Nuno Álvares Pereira Medal - Merit' },
    'distinctions.m1.desc': { pt: 'A mais alta distinção da GNR, atribuída por atos de bravura, dedicação e mérito excecional.', en: 'The highest distinction of the GNR, awarded for acts of bravery, dedication and exceptional merit.' },
    'distinctions.m2.title': { pt: 'Medalha Militar de Comportamento Exemplar', en: 'Military Medal for Exemplary Conduct' },
    'distinctions.m2.desc': { pt: 'Reconhecimento pela conduta irrepreensível ao longo da carreira.', en: 'Recognition for irreproachable conduct throughout the career.' },
    'distinctions.m3.title': { pt: 'Medalha de Assiduidade', en: 'Assiduity Medal' },
    'distinctions.m3.desc': { pt: 'Atribuída pela dedicação constante e presença exemplar no desempenho de funções.', en: 'Awarded for constant dedication and exemplary attendance in the performance of duties.' },
    'education.period': { pt: '2023 - Presente', en: '2023 - Present' },
    'education.degree': { pt: 'Licenciatura em Eng. Informática - Ramo de Dev', en: "Bachelor's in Computer Engineering - Development track" },
    'education.institution': { pt: 'Instituto Superior de Engenharia de Coimbra (ISEC)', en: 'Instituto Superior de Engenharia de Coimbra (ISEC)' },
    'exp.critical.period': { pt: 'Fev 2026 - Jul 2026', en: 'Feb 2026 - Jul 2026' },
    'exp.critical.title': { pt: 'Estagiário de Engenharia de Software (ASD / SpaceForce)', en: 'Software Engineering Intern (ASD / SpaceForce)' },
    'exp.critical.org': { pt: 'Critical Software, Coimbra', en: 'Critical Software, Coimbra' },
    
    'exp.freelance.period': { pt: 'Nov 2022 - Presente', en: 'Nov 2022 - Present' },
    'exp.freelance.title': { pt: 'Especialista SIG & Modelação 3D Freelance', en: 'Freelance GIS Specialist & 3D Modeling' },
    'exp.freelance.org': { pt: 'Fiverr & Upwork', en: 'Fiverr & Upwork' },
    'exp.freelance.desc': { pt: 'Desenvolvimento e entrega de soluções de geoprocessamento em Python, cartografia digital e modelação 3D para clientes internacionais em contextos de missão crítica.', en: 'Delivered GIS solutions, Python geoprocessing, digital mapping, and 3D modeling for international clients in mission-critical contexts.' },
    'projects.homevault.title': { pt: 'HomeVault - Gestão de Inventário Offline-First', en: 'HomeVault - Offline-First Inventory Management' },
    'projects.homevault.desc': { pt: 'Aplicação Android offline-first para catalogar bens, documentos e fotos em segurança. Gestão de dados locais com Drift (SQLite), backups encriptados e sincronização com Google Drive, autenticação biométrica e scanner QR/barras.', en: 'Offline-first Android application to securely catalog assets, documents, and photos. Local data management with Drift (SQLite), encrypted backups, Google Drive sync, biometric auth, and QR/barcode scanning.' },
    'projects.gistools.title': { pt: 'GIS Tools & Automação Python', en: 'GIS Tools & Python Automation' },
    'projects.gistools.desc': { pt: 'Suite de ferramentas em Python com interface gráfica para processamento ágil de dados espaciais, conversão de formatos e apoio a fluxos de informação geográfica.', en: 'Python utility suite with graphical UI for fast processing of spatial data, format conversion, and GIS workflow automation.' },
    'projects.mdconv.title': { pt: 'MarkDown Converter (Otimizador de Tokens IA)', en: 'MarkDown Converter (AI Token Optimizer)' },
    'projects.mdconv.desc': { pt: 'Aplicação em Python para converter documentos Word, PDF e PowerPoint em formato MarkDown limpo, reduzindo expressivamente o consumo de tokens em modelos de IA.', en: 'Python desktop application to convert Word, PDF, and PowerPoint files into clean MarkDown, significantly reducing token consumption for LLMs.' },
    'exp.critical.desc': { pt: 'Contribuição para o desenvolvimento da plataforma de Ground Segment para missões espaciais (projeto Lighthouse). Trabalho em funcionalidades de visualização e processamento de telemetria em tempo real, integração de REST APIs e WebSockets, e contacto com normas aeroespaciais ECSS e pacotes CCSDS.', en: 'Contributed to the development of Lighthouse, a Ground Segment platform for space missions. Worked on real-time telemetry processing and visualization, REST APIs, WebSockets integration, and exposure to ECSS aerospace standards and CCSDS space packets.' },
    'exp.p1.period': { pt: 'Jul 2020 - Presente', en: 'Jul 2020 - Present' },
    'exp.p1.title': { pt: 'Analista, Desenvolvedor de Software e Inovação', en: 'Analyst, Software Developer and Innovation' },
    'exp.p1.org': { pt: 'GNR - Unidade de Emergência de Proteção e Socorro (UEPS)', en: 'GNR - Emergency Protection and Rescue Unit (UEPS)' },
    'exp.p1.desc': { pt: 'Desenvolvimento de software mobile/desktop, integração de LLMs, automatização de processos e gestão de plataformas georreferenciadas (ArcGIS Pro/QGIS). Criação de mais de 8 dashboards, apoio a mais de 10 operações nacionais e a uma operação internacional em Leão, Espanha, com acompanhamento diário de mais de 48 equipas a nível nacional durante todo o ano.', en: 'Mobile and desktop software development, LLM integration, process automation and georeferenced platform management (ArcGIS Pro/QGIS). Delivered 8+ dashboards, supported 10+ national operations and one international operation in Leon, Spain, and helped monitor 48+ field teams nationwide every day of the year.' },
    'exp.p2.period': { pt: 'Mai 2019 - Jul 2020', en: 'May 2019 - Jul 2020' },
    'exp.p2.title': { pt: 'Operacional de combate a incêndios', en: 'Firefighting Operator' },
    'exp.p2.org': { pt: 'GNR - UEPS', en: 'GNR - UEPS' },
    'exp.p3.period': { pt: 'Out 2011 - Mar 2019', en: 'Oct 2011 - Mar 2019' },
    'exp.p3.title': { pt: 'Patrulheiro', en: 'Patrolman' },
    'exp.p3.org': { pt: 'Guarda Nacional Republicana (GNR)', en: 'National Republican Guard (GNR)' },
    'footer.copy': { pt: '© 2026 Rui Casaca. Portfólio profissional construído com HTML, Tailwind CSS e JavaScript.', en: '© 2026 Rui Casaca. Professional portfolio built with HTML, Tailwind CSS and JavaScript.' },
    'control.theme': { pt: 'Alternar tema (Dark/Light)', en: 'Toggle theme (Dark/Light)' },
    'control.lang': { pt: 'Alternar idioma (PT/EN)', en: 'Toggle language (PT/EN)' },
    'download.title': { pt: 'Download do meu CV em PDF', en: 'Download my CV (PDF)' },
    'cv.download.choose': { pt: 'Escolha o idioma para o CV', en: 'Choose CV language' },
    'cv.download.pt': { pt: 'Descarregar CV — Português', en: 'Download CV — Portuguese' },
    'cv.download.en': { pt: 'Descarregar CV — English', en: 'Download CV — English' },
    // Tech badge translations
    'tech.javascript': { pt: 'JavaScript', en: 'JavaScript' },
    'tech.cpp': { pt: 'C/C++', en: 'C/C++' },
    'tech.csharp': { pt: 'C#', en: 'C#' },
    'tech.java': { pt: 'Java', en: 'Java' },
    'tech.kotlin': { pt: 'Kotlin', en: 'Kotlin' },
    'tech.flutter': { pt: 'Flutter', en: 'Flutter' },
    'tech.dart': { pt: 'Dart', en: 'Dart' },
    'tech.python': { pt: 'Python', en: 'Python' },
    'tech.matlab': { pt: 'MATLAB', en: 'MATLAB' },
    'tech.dotnet': { pt: 'ASP.NET', en: 'ASP.NET' },
    'tech.reactjs': { pt: 'JavaScript', en: 'JavaScript' },
    'tech.htmlcss': { pt: 'HTML/CSS', en: 'HTML/CSS' },
    'tech.javascript': { pt: 'JavaScript', en: 'JavaScript' },
    'tech.node': { pt: 'Node.js', en: 'Node.js' },
    'tech.postgres': { pt: 'PostgreSQL', en: 'PostgreSQL' },
    'tech.restapi': { pt: 'RESTful API', en: 'RESTful API' },
    'tech.android': { pt: 'Android', en: 'Android' },
    'tech.sqlite': { pt: 'SQLite', en: 'SQLite' },
    'tech.firebase': { pt: 'Firebase', en: 'Firebase' },
    'tech.python': { pt: 'Python', en: 'Python' },
    'tech.llm': { pt: 'Integração LLMs', en: 'LLM Integration' },
    'tech.sqlserver': { pt: 'SQL Server', en: 'SQL Server' },
    'tech.git': { pt: 'GitHub / GitLab', en: 'GitHub / GitLab' },
    'tech.automation': { pt: 'Automatização de Processos', en: 'Process Automation' },
    'tech.arcgis': { pt: 'ArcGIS Pro', en: 'ArcGIS Pro' },
    'tech.qgis': { pt: 'QGIS', en: 'QGIS' },
    'tech.blender': { pt: 'Blender', en: 'Blender' },
    'tech.openmeteo': { pt: 'Open-Meteo', en: 'Open-Meteo' },
    'tech.geolocation': { pt: 'Geolocation', en: 'Geolocation' },
    'tech.notifications': { pt: 'Notifications', en: 'Notifications' },
    'tech.sockets': { pt: 'Sockets', en: 'Sockets' },
    'tech.jwt': { pt: 'JWT', en: 'JWT' },
    'tech.rmi': { pt: 'RMI', en: 'RMI' },
    'tech.springboot': { pt: 'SpringBoot', en: 'SpringBoot' },
        // Traduções para Projetos Académicos
        'nav.acad': { pt: 'Projetos Académicos', en: 'Academic Projects' },
        'acad.title': { pt: 'Projetos Académicos', en: 'Academic Projects' },
        'acad.minesweeper.title': { pt: 'Minesweeper', en: 'Minesweeper' },
        'acad.minesweeper.period': { pt: '2º semestre de 2024 • React / JavaScript', en: '2nd semester 2024 • React / JavaScript' },
        'acad.minesweeper.desc': { pt: 'Implementação de um jogo Minesweeper com interface reativa, gestão de estado e lógica de jogo, priorizando performance e UX.', en: 'Implementation of a Minesweeper game with reactive UI, state management and game logic, prioritizing performance and UX.' },

        'acad.chess.title': { pt: 'Jogo Xadrez', en: 'Chess Game' },
        'acad.chess.period': { pt: '2º semestre de 2025 • Java (JavaFX) • MVC', en: '2nd semester 2025 • Java (JavaFX) • MVC' },
        'acad.chess.desc': { pt: 'Desenvolvido em Java com JavaFX e arquitetura MVC — motor de regras, representação do tabuleiro, e interface responsiva.', en: 'Developed in Java with JavaFX and MVC architecture — rules engine, board representation and responsive UI.' },

        'acad.caravanas.title': { pt: 'Jogo de Caravanas', en: 'Caravans Game' },
        'acad.caravanas.period': { pt: '1º semestre de 2025 • C++ (POO)', en: '1st semester 2025 • C++ (OOP)' },
        'acad.caravanas.desc': { pt: 'Jogo escrito em C++ aplicando princípios de programação orientada a objetos: classes, herança e gestão de recursos.', en: 'Game written in C++ applying OOP principles: classes, inheritance and resource management.' },

        'acad.chat.title': { pt: 'Aplicação Cliente/Servidor (Fórum / Chat)', en: 'Client/Server Application (Forum / Chat)' },
        'acad.chat.period': { pt: '1º semestre de 2025 • C (Sockets) • Concorrência', en: '1st semester 2025 • C (Sockets) • Concurrency' },
        'acad.chat.desc': { pt: 'Implementação em C usando sockets para comunicação, com gestão de concorrência para múltiplos clientes e persistência simples.', en: 'Implemented in C using sockets for communication, with concurrency handling for multiple clients and simple persistence.' },

        'acad.surprisme.title': { pt: 'SurpriseMe', en: 'SurpriseMe' },
        'acad.surprisme.period': { pt: '2º semestre de 2025 • Java (JavaFX) • Integração LLM • Scrum', en: '2nd semester 2025 • Java (JavaFX) • LLM integration • Scrum' },
        'acad.surprisme.desc': { pt: 'Aplicação desenvolvida em contexto de Gestão de Projetos com metodologia Scrum, UI em JavaFX e integração com LLM para funcionalidades inteligentes.', en: 'Application developed within Project Management course using Scrum, UI in JavaFX and integrated LLM features.' },

        'acad.safetys.title': { pt: 'SafetYSec', en: 'SafetYSec' },
        'acad.safetys.period': { pt: '2º semestre de 2025 • Kotlin (Android, Jetpack Compose) • Firebase', en: '2nd semester 2025 • Kotlin (Android, Jetpack Compose) • Firebase' },
        'acad.safetys.desc': { pt: 'Aplicação Android com geofencing e leitura de sensores para monitorização de pessoas vulneráveis, perfis diferenciados (monitores/protegidos) e backend em Firebase.', en: 'Android app with geofencing and sensor readings for monitoring vulnerable people, differentiated profiles (monitors/protected) and Firebase backend.' },

        'acad.qna.title': { pt: 'Aplicação de Perguntas e Respostas', en: 'Questions & Answers App' },
        'acad.qna.period': { pt: '2º semestre de 2025 • Java (JavaFX), Sockets, JWT, REST, SQLite', en: '2nd semester 2025 • Java (JavaFX), Sockets, JWT, REST, SQLite' },
        'acad.qna.desc': { pt: 'Plataforma para criação de perguntas pelo professor e respostas pelos alunos (estilo Kahoot); inclui autenticação JWT, comunicação via sockets e persistência com SQLite.', en: 'Platform for teacher-created questions and student responses (Kahoot-like); includes JWT authentication, sockets communication and SQLite persistence.' },
            'acad.weather.title': { pt: 'Alerta Meteorológico Android', en: 'Android Weather Alert' },
            'acad.weather.period': { pt: '2025 • Kotlin (Android, Jetpack Compose) • Open-Meteo API', en: '2025 • Kotlin (Android, Jetpack Compose) • Open-Meteo API' },
            'acad.weather.desc': { pt: 'Aplicação Android para apoio a operacionais em terreno — monitorização contínua das condições meteorológicas com base na localização do utilizador (Open-Meteo). Detecta alterações relevantes em velocidade e direção do vento, temperatura, precipitação e neve; notifica o utilizador com um resumo sintetizado tanto com antecedência configurável como no momento da mudança. O utilizador pode escolher parâmetros a monitorizar e definir limiares de alerta (ex.: +2 km/h, +5 km/h). Otimizada para eficiência energética e notificações push.', en: 'Android app to support operatives in the field — continuous monitoring of weather conditions based on the user\'s location (Open-Meteo). Detects relevant changes in wind speed and direction, temperature, precipitation and snow; notifies the user with a concise summary both with configurable lead time and at the moment of change. Users can choose which parameters to monitor and set alert thresholds (e.g., +2 km/h, +5 km/h). Optimized for battery-efficient operation and push notifications.' },

            'acad.store.title': { pt: 'Aplicação de Gestão de Loja', en: 'Store Management Application' },
            'acad.store.period': { pt: '2º semestre de 2025 • C#, ASP.NET, Blazor, MAUI, SQL, REST', en: '2nd semester 2025 • C#, ASP.NET, Blazor, MAUI, SQL, REST' },
            'acad.store.desc': { pt: 'Aplicação multi-plataforma com autenticação encriptada, perfis de utilizador para admin, fornecedores e clientes, gestão e venda de produtos e API REST para integração com frontends.', en: 'Multi-platform application with encrypted authentication, user profiles for admin, suppliers and customers, product management and sales, and REST API for frontend integration.' },

            'acad.guide.title': { pt: 'Guia Turístico', en: 'Tourist Guide' },
            'acad.guide.period': { pt: '2º semestre de 2025 • Flutter (Android, Dart) • API IPMA', en: '2nd semester 2025 • Flutter (Android, Dart) • IPMA API' },
            'acad.guide.desc': { pt: 'Aplicação multiplataforma com API meteorológico (IPMA) para informação do tempo atual para a localidade de interesse, fornecendo de forma intuitiva informação organizada e detalhada de Monumentos, Restaurantes e Eventos numa determinada cidade, permitindo gerir os seus favoritos, mesmo offline.', en: 'Multi-platform application with weather API (IPMA) for current weather information for the location of interest, intuitively providing organized and detailed information about Monuments, Restaurants and Events in a given city, allowing users to manage their favorites, even offline.' }
    };
// Traduções para a nova aba SIG
translations['nav.sig'] = { pt: 'Projetos SIG (ArcGIS)', en: 'GIS Projects (ArcGIS)' };
translations['sig.title'] = { pt: 'Projetos SIG (ArcGIS)', en: 'GIS Projects (ArcGIS)' };
translations['sig.quickcapture.title'] = { pt: 'Aplicações em QuickCapture', en: 'QuickCapture Applications' };
translations['sig.quickcapture.desc'] = {
    pt: `
        <p><strong>Desenvolvimento e liderança de soluções QuickCapture, com aplicação para:</strong></p>
        <ul class="list-disc ml-5 mt-2">
            <li>Registos diários e monitorização de equipas no terreno;</li>
            <li>Coordenação de operações e equipas de resgate;</li>
            <li>Busca e salvamento de pessoas;</li>
            <li>Gestão de recursos e logística;</li>
            <li>Gestão de operações de fiscalização a nível nacional (Operação Floresta Segura);</li>
            <li>Gestão de operações de validação dos pontos de água a nível nacional;</li>
            <li>Gestão de operações e equipas helitransportadas e terrestres de combate a incêndios;</li>
            <li>Operações locais em Fátima – Santarém (Operação Peregrino, Dia da Criança, Benção dos Capacetes, etc.).</li>
        </ul>
    `,
    en: `
        <p><strong>Led development and deployment of QuickCapture solutions for:</strong></p>
        <ul class="list-disc ml-5 mt-2">
            <li>Daily records and field team monitoring;</li>
            <li>Coordination of rescue operations and teams;</li>
            <li>Search and rescue of missing persons;</li>
            <li>Resource and logistics management;</li>
            <li>Management of national inspection operations (Forest Safe Operation);</li>
            <li>Management of nationwide water point validation operations;</li>
            <li>Management of helicopter-transported and ground firefighting teams and operations;</li>
            <li>Local operations in Fátima – Santarém (Pilgrim Operation, Children’s Day, Helmet Blessing, etc.).</li>
        </ul>
    `
};
translations['sig.fieldmaps.title'] = { pt: 'Aplicações em FieldMaps', en: 'FieldMaps Applications' };
translations['sig.fieldmaps.desc'] = {
    pt: `
        <p><strong>Criação de Mapas e Formulários em ArcGIS Field Maps para:</strong></p>
        <ul class="list-disc ml-5 mt-2">
            <li>Operações de fiscalização (Operação Floresta Segura);</li>
            <li>Fiscalização da Rede Nacional de Postos de Vigia;</li>
            <li>Verificação da Rede de Pontos de Água em articulação com GTFs dos Municípios;</li>
            <li>Mapas operacionais para apoio às equipas no terreno.</li>
        </ul>
    `,
    en: `
        <p><strong>Design of ArcGIS Field Maps maps and forms for:</strong></p>
        <ul class="list-disc ml-5 mt-2">
            <li>Inspection operations (Forest Safe Operation);</li>
            <li>Oversight of the National Network of Watch Posts;</li>
            <li>Verification of the Network of Water Points in coordination with municipalities' GTFs;</li>
            <li>Operational maps to support field teams.</li>
        </ul>
    `
};
translations['sig.dashboards.title'] = { pt: 'Dashboards e Experiences', en: 'Dashboards and Experiences' };
translations['sig.dashboards.desc'] = {
    pt: `
        <p><strong>Conceção e implementação de Dashboards e ArcGIS Experience para:</strong></p>
        <ul class="list-disc ml-5 mt-2">
            <li>Monitorização diária em Salas de Situação da atividade em território nacional;</li>
            <li>Acompanhamento de equipas de drones para busca de pessoas desaparecidas;</li>
            <li>Suporte a operações internacionais e exercícios nos módulos de segurança, incêndio, matérias perigosas, estruturas colapsadas, busca e resgate de pessoas, entre outros, com várias entidades;</li>
            <li>Monitorização e coordenação institucional no âmbito da Operação Floresta Segura.</li>
        </ul>
    `,
    en: `
        <p><strong>Design and implementation of Dashboards and ArcGIS Experience for:</strong></p>
        <ul class="list-disc ml-5 mt-2">
            <li>Daily situation room monitoring of national activity;</li>
            <li>Monitoring of drone teams for missing persons searches;</li>
            <li>Support for international operations and exercises in security, fire, hazardous materials, collapsed structures, search and rescue, and other modules, with multiple entities;</li>
            <li>Institutional monitoring and coordination within the Forest Safe Operation.</li>
        </ul>
    `
};

function applyTranslations(lang) {
    // Primeiro, elementos que necessitam de HTML (listas, bullets)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        if (translations[key] && translations[key][lang]) {
            el.innerHTML = translations[key][lang];
        }
    });

    // Depois, elementos simples (texto plano)
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key] && translations[key][lang]) {
            // if element contains HTML children (like icon + span), update only the inner span
            const inner = el.querySelector && el.querySelector('[data-i18n]');
            if (inner) {
                // nested; set textContent of the nested element (avoid replacing icons)
                inner.textContent = translations[key][lang];
            } else {
                el.textContent = translations[key][lang];
            }
        }
    });
    // ajustar atributo lang do documento
    if (lang === 'en') {
        document.documentElement.lang = 'en-US';
    } else {
        document.documentElement.lang = 'pt-PT';
    }
    // Update control buttons titles/aria
    const themeBtn = document.getElementById('theme-toggle');
    const langBtn = document.getElementById('lang-toggle');
    if (themeBtn) {
        themeBtn.title = translations['control.theme'][lang];
        themeBtn.setAttribute('aria-label', translations['control.theme'][lang]);
    }
    if (langBtn) {
        langBtn.title = translations['control.lang'][lang];
        langBtn.setAttribute('aria-label', translations['control.lang'][lang]);
    }
    // download link
    const dl = document.querySelector('.fab-download');
    if (dl && translations['download.title'][lang]) {
        dl.setAttribute('title', translations['download.title'][lang]);
        dl.setAttribute('aria-label', translations['download.title'][lang]);
    }

    // Update visible language code on the lang button (shows the target language)
    const langCodeEl = document.getElementById('lang-code');
    if (langCodeEl) {
        // Show the code of the language that will be switched TO when clicked
        langCodeEl.textContent = (lang === 'pt') ? 'EN' : 'PT';
    }
}

function setLanguage(lang) {
    localStorage.setItem('site_lang', lang);
    applyTranslations(lang);
}

function toggleLanguage() {
    const current = localStorage.getItem('site_lang') || 'en';
    const next = current === 'pt' ? 'en' : 'pt';
    cancelTypewriter();
    setLanguage(next);
}

// Optional helper to explicitly refresh the lang-code display from current storage
function refreshLangToggle() {
    const current = localStorage.getItem('site_lang') || 'en';
    const langCodeEl = document.getElementById('lang-code');
    if (langCodeEl) langCodeEl.textContent = current.toUpperCase();
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
        langBtn.title = (current === 'en') ? 'Switch to Portuguese (PT)' : 'Mudar para Inglês (EN)';
    }
}

function setTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light');
        document.body.classList.remove('dark');
        localStorage.setItem('site_theme', 'light');
        // change icon to moon
        updateThemeIcon('moon');
    } else {
        document.body.classList.remove('light');
        document.body.classList.add('dark');
        localStorage.setItem('site_theme', 'dark');
        updateThemeIcon('sun');
    }
}

function toggleTheme() {
    const current = localStorage.getItem('site_theme') || (document.body.classList.contains('dark') ? 'dark' : 'light');
    const next = current === 'light' ? 'dark' : 'light';
    setTheme(next);
}

function updateThemeIcon(iconName) {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.innerHTML = `<i data-lucide="${iconName}" class="w-5 h-5"></i>`;
    lucide.createIcons();
}

/* ===== CV DOWNLOAD (PT / EN) ===== */
function buildCvFilename(lang) {
    // base filename used in repo
    const base = 'CV_RuiCasaca.pdf';
    if (lang === 'en') {
        return base.replace(/(\.pdf)$/i, '_en$1');
    }
    return base;
}

function toggleCvMenu(show) {
    const menu = document.getElementById('cv-download-menu');
    if (!menu) return;
    const isHidden = menu.getAttribute('aria-hidden') === 'true' || menu.getAttribute('aria-hidden') === null;
    const shouldShow = (typeof show === 'boolean') ? show : isHidden;
    menu.setAttribute('aria-hidden', shouldShow ? 'false' : 'true');
    if (shouldShow) {
        // focus first option
        const first = menu.querySelector('.cv-download-option[data-lang="pt"]');
        if (first) first.focus();
    }
}

function hideCvMenu() {
    const menu = document.getElementById('cv-download-menu');
    if (!menu) return;
    menu.setAttribute('aria-hidden', 'true');
}

function downloadCv(lang) {
    const filename = buildCvFilename(lang);
    const href = `res/${filename}`;
    // Create temporary anchor to trigger download
    const a = document.createElement('a');
    a.href = href;
    a.download = filename;
    // In case the user wants to open in new tab as fallback
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    hideCvMenu();
}

document.addEventListener('DOMContentLoaded', function() {
    // initialize icons
    lucide.createIcons();

    // attach events
    const themeBtn = document.getElementById('theme-toggle');
    const langBtn = document.getElementById('lang-toggle');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
    if (langBtn) langBtn.addEventListener('click', toggleLanguage);

    // CV download menu handlers
    const fab = document.getElementById('fab-download');
    const cvMenu = document.getElementById('cv-download-menu');
    if (fab) {
        fab.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleCvMenu();
        });
    }

    if (cvMenu) {
        // delegation for option buttons
        cvMenu.addEventListener('click', function(e) {
            const opt = e.target.closest && e.target.closest('.cv-download-option');
            if (opt) {
                const lang = opt.getAttribute('data-lang') || 'pt';
                downloadCv(lang);
            }
        });
    }

    // Click outside closes menu
    document.addEventListener('click', function(e) {
        if (!cvMenu) return;
        const isOpen = cvMenu.getAttribute('aria-hidden') === 'false';
        if (!isOpen) return;
        if (!e.target.closest || (!e.target.closest('#cv-download-menu') && !e.target.closest('#fab-download'))) {
            hideCvMenu();
        }
    });

    // Escape key closes menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') hideCvMenu();
    });

    // apply saved theme
    const savedTheme = localStorage.getItem('site_theme') || 'light';
    setTheme(savedTheme);

    // apply saved language
    const savedLang = localStorage.getItem('site_lang') || 'en';
    applyTranslations(savedLang);
    // re-create icons after translations in case we added icon placeholders
    lucide.createIcons();
    // ensure the visible code next to the globe is correct
    refreshLangToggle();

    // initialize scroll reveal after translations and icons are ready
    initScrollAnimations();

    // new animation systems
    initScrollProgress();
    initHeroLetters();
    initTypewriter();
    initBackgroundCanvas();
    initCursorGlow();
    initMagneticButtons();
    initHeroParallax();
    initBackToTop();
    initCounters();
    init3DTilt();
});

/* ============================================================
   REDESIGN: ANIMAÇÕES MODERNAS
   ============================================================ */

/* ===== SCROLL PROGRESS BAR ===== */
function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = pct.toFixed(2) + '%';
    }, { passive: true });
}

/* ===== HERO LETTER ANIMATION ===== */
function initHeroLetters() {
    const letters = document.querySelectorAll('.hl');
    if (!letters.length) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        letters.forEach(function(l) { l.style.opacity = '1'; });
        return;
    }
    requestAnimationFrame(function() {
        letters.forEach(function(l) { l.classList.add('in'); });
    });
}

/* ===== TYPEWRITER EFFECT ===== */
var _twTimeout = null;

function cancelTypewriter() {
    if (_twTimeout) { clearTimeout(_twTimeout); _twTimeout = null; }
}

function initTypewriter() {
    var el = document.getElementById('hero-typed');
    if (!el) return;
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    var text = el.textContent.trim();
    el.textContent = '';
    var i = 0;

    function type() {
        if (i < text.length) {
            el.textContent += text.charAt(i);
            i++;
            _twTimeout = setTimeout(type, 24);
        } else {
            _twTimeout = null;
        }
    }
    _twTimeout = setTimeout(type, 950);
}

/* ===== CANVAS DE PÁGINA INTEIRA — REDE DE PARTÍCULAS REATIVA AO RATO ===== */
function initBackgroundCanvas() {
    var canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) { canvas.style.display = 'none'; return; }

    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0;
    var particles = [];
    var mouse = { x: -9999, y: -9999, active: false };

    function targetCount() {
        // Densidade proporcional à área, com limites sensatos
        var area = window.innerWidth * window.innerHeight;
        return Math.max(40, Math.min(110, Math.round(area / 17000)));
    }

    function makeParticle() {
        return {
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.32,
            vy: (Math.random() - 0.5) * 0.32,
            r: Math.random() * 1.7 + 0.6
        };
    }

    function resize() {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        canvas.style.width = W + 'px';
        canvas.style.height = H + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        var want = targetCount();
        while (particles.length < want) particles.push(makeParticle());
        if (particles.length > want) particles.length = want;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    window.addEventListener('mousemove', function(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.active = true;
    }, { passive: true });
    window.addEventListener('mouseout', function() { mouse.active = false; });

    function isDark() { return document.body.classList.contains('dark'); }

    var connectDist = 130;
    var mouseDist = 170;

    function draw() {
        ctx.clearRect(0, 0, W, H);
        var rgb = isDark() ? '103,232,249' : '3,102,214';
        var dotA = isDark() ? 0.45 : 0.30;
        var lineA = isDark() ? 0.13 : 0.09;

        var i, j, p, q, dx, dy, dist;

        // Ligações entre partículas
        for (i = 0; i < particles.length; i++) {
            p = particles[i];
            for (j = i + 1; j < particles.length; j++) {
                q = particles[j];
                dx = p.x - q.x; dy = p.y - q.y;
                dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < connectDist) {
                    ctx.strokeStyle = 'rgba(' + rgb + ',' + (lineA * (1 - dist / connectDist)).toFixed(3) + ')';
                    ctx.lineWidth = 0.6;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.stroke();
                }
            }
        }

        // Ligações ao cursor + ligeira atração (constelação interativa)
        if (mouse.active) {
            for (i = 0; i < particles.length; i++) {
                p = particles[i];
                dx = p.x - mouse.x; dy = p.y - mouse.y;
                dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouseDist) {
                    var fade = 1 - dist / mouseDist;
                    ctx.strokeStyle = 'rgba(' + rgb + ',' + (0.22 * fade).toFixed(3) + ')';
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                    // empurrão muito subtil para fora do cursor
                    p.vx += (dx / dist) * 0.012 * fade;
                    p.vy += (dy / dist) * 0.012 * fade;
                }
            }
        }

        // Desenhar e mover partículas
        for (i = 0; i < particles.length; i++) {
            p = particles[i];
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(' + rgb + ',' + dotA + ')';
            ctx.fill();

            p.x += p.vx;
            p.y += p.vy;
            // Amortecer para a velocidade não disparar com a atração
            p.vx *= 0.992;
            p.vy *= 0.992;
            if (Math.abs(p.vx) < 0.08) p.vx += (Math.random() - 0.5) * 0.02;
            if (Math.abs(p.vy) < 0.08) p.vy += (Math.random() - 0.5) * 0.02;

            if (p.x < -20) p.x = W + 20;
            if (p.x > W + 20) p.x = -20;
            if (p.y < -20) p.y = H + 20;
            if (p.y > H + 20) p.y = -20;
        }
        requestAnimationFrame(draw);
    }
    draw();
}

/* ===== SPOTLIGHT QUE SEGUE O CURSOR ===== */
function initCursorGlow() {
    var glow = document.getElementById('cursor-glow');
    if (!glow) return;
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) { glow.style.display = 'none'; return; }
    if (window.matchMedia('(hover: none)').matches) { glow.style.display = 'none'; return; }

    var tx = window.innerWidth / 2, ty = window.innerHeight / 2;
    var cx = tx, cy = ty;

    window.addEventListener('mousemove', function(e) {
        tx = e.clientX;
        ty = e.clientY;
        glow.style.opacity = '1';
    }, { passive: true });
    window.addEventListener('mouseout', function() { glow.style.opacity = '0'; });

    function loop() {
        cx += (tx - cx) * 0.12;
        cy += (ty - cy) * 0.12;
        glow.style.transform = 'translate(' + cx + 'px,' + cy + 'px) translate(-50%, -50%)';
        requestAnimationFrame(loop);
    }
    loop();
}

/* ===== BOTÕES MAGNÉTICOS ===== */
function initMagneticButtons() {
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    if (window.matchMedia('(hover: none)').matches) return;

    var buttons = document.querySelectorAll('.primary-action, .secondary-action, .control-btn');
    buttons.forEach(function(btn) {
        btn.addEventListener('mousemove', function(e) {
            var rect = btn.getBoundingClientRect();
            // Micro-movimento muito suave e limitado para evitar efeito exagerado
            var mx = Math.max(-2, Math.min(2, (e.clientX - rect.left - rect.width / 2) * 0.04));
            var my = Math.max(-2, Math.min(2, (e.clientY - rect.top - rect.height / 2) * 0.04));
            btn.style.transform = 'translate(' + mx.toFixed(1) + 'px,' + my.toFixed(1) + 'px)';
        }, { passive: true });
        btn.addEventListener('mouseleave', function() {
            btn.style.transform = '';
        });
    });
}

/* ===== PARALLAX 3D NO CARTÃO DO HERO ===== */
function initHeroParallax() {
    var frame = document.querySelector('.profile-frame');
    var heroCard = document.querySelector('.hero-card');
    if (!frame || !heroCard) return;
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    if (window.matchMedia('(hover: none)').matches) return;

    heroCard.addEventListener('mousemove', function(e) {
        var rect = heroCard.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        frame.style.transform = 'perspective(900px) rotateX(' + (-y * 9).toFixed(2) + 'deg) rotateY(' + (x * 9).toFixed(2) + 'deg) translateZ(12px)';
    }, { passive: true });
    heroCard.addEventListener('mouseleave', function() {
        frame.style.transform = '';
    });
}

/* ===== BOTÃO VOLTAR AO TOPO ===== */
function initBackToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;
    function toggle() {
        if (window.scrollY > 500) btn.classList.add('is-visible');
        else btn.classList.remove('is-visible');
    }
    window.addEventListener('scroll', toggle, { passive: true });
    btn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    toggle();
}


/* ===== COUNTER ANIMATIONS ===== */
function initCounters() {
    var counters = document.querySelectorAll('.impact-counter[data-target]');
    if (!counters.length) return;
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        counters.forEach(function(c) { c.textContent = c.getAttribute('data-target'); });
        return;
    }

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (!entry.isIntersecting) return;
            var el = entry.target;
            var target = parseInt(el.getAttribute('data-target'), 10);
            var duration = 1400;
            var start = performance.now();
            function update(now) {
                var elapsed = now - start;
                var progress = Math.min(elapsed / duration, 1);
                var eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(eased * target);
                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    el.textContent = target;
                }
            }
            requestAnimationFrame(update);
            observer.unobserve(el);
        });
    }, { threshold: 0.6 });

    counters.forEach(function(c) { observer.observe(c); });
}

/* ===== 3D CARD TILT ===== */
function init3DTilt() {
    var cards = document.querySelectorAll('.project-card, .expertise-card');
    if (!cards.length) return;
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    cards.forEach(function(card) {
        card.addEventListener('mousemove', function(e) {
            var rect = card.getBoundingClientRect();
            var x = (e.clientX - rect.left) / rect.width - 0.5;
            var y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = 'perspective(800px) rotateX(' + (-y * 5).toFixed(2) + 'deg) rotateY(' + (x * 5).toFixed(2) + 'deg) translateY(-4px)';
        }, { passive: true });
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
        });
    });
}
