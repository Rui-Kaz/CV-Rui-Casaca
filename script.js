// Inicializar ícones Lucide
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
});

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
    
    // Mostrar o conteúdo selecionado
    const selectedContent = document.getElementById('tab-' + tabName);
    if (selectedContent) {
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
    
    // Scroll suave para o topo do conteúdo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ===== THEME & I18N ===== */
const translations = {
    'nav.cv': { pt: 'Currículo', en: 'Resume' },
    'nav.about': { pt: 'Sobre Mim', en: 'About Me' },
    'nav.distinctions': { pt: 'Distinções Profissionais', en: 'Professional Distinctions' },
    'heading.skills': { pt: 'Competências Técnicas', en: 'Technical Skills' },
    'heading.projects': { pt: 'Projetos Destacados', en: 'Featured Projects' },
    'heading.experience': { pt: 'Experiência Profissional', en: 'Professional Experience' },
    'heading.education': { pt: 'Formação Académica', en: 'Education' },
    'hero.subtitle': { pt: 'Analista e Desenvolvedor de Software', en: 'Analyst and Software Developer' },
    'hero.lead': { pt: 'Profissional com experiência em sistemas de informação geográfica ArcGIS e QGIS e em desenvolvimento de software (Java, C/C++, C#, ASP.NET, Kotlin, Flutter, JavaScript/TypeScript, Python). Valorizo a inovação, a resolução de problemas e a aprendizagem contínua.', en: 'Professional experienced in geographic information systems (ArcGIS, QGIS) and software development (Java, C/C++, C#, ASP.NET, Kotlin, Flutter, JavaScript/TypeScript, Python). I value practical innovation, problem solving and continuous learning.' },
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
    'projects.p1.title': { pt: 'HomeVault', en: 'HomeVault' },
    'projects.p1.desc': { pt: 'Aplicação Android offline-first para gestão de inventário. Dados locais via Drift (SQLite), backups encriptados, sincronização com Google Drive e biometria.', en: 'Offline-first Android inventory management app. Local data via Drift (SQLite), encrypted backups, Google Drive sync, and biometric auth.' },
    'projects.p2.title': { pt: 'Missing Persons Search Application', en: 'Missing Persons Search Application' },
    'projects.p2.desc': { pt: 'Plataforma full-stack de apoio a operações de busca. Integração com APIs de LLMs, dashboards em tempo real e geração automática de PDFs.', en: 'Full-stack platform supporting search operations. Integrates LLM APIs, real-time dashboards, and automated PDF generation.' },
    'projects.p2b.title': { pt: 'Registo Fotográfico Georreferenciado', en: 'Georeferenced Photo Capture' },
    'projects.p2b.desc': { pt: 'Aplicação mobile para captação de fotos com marca de água automática (GPS, direção, data/hora, logótipo), ideal para documentação de campo com partilha imediata.', en: 'Mobile app for capturing photos with automatic watermark (GPS, heading, timestamp, logo), ideal for field documentation with immediate sharing.' },
    'projects.p3.title': { pt: 'Teacher and Student Evaluation Platform', en: 'Teacher and Student Evaluation Platform' },
    'projects.p3.desc': { pt: 'Aplicação cliente-servidor (Java, RMI) para processos de avaliação, com autenticação, controlo de acessos e base de dados SQLite.', en: 'Client-server application (Java, RMI) for evaluation processes, with authentication, access control, and SQLite database.' },
    'projects.p3b.title': { pt: 'Tracking e Gestão de Utilizadores', en: 'Tracking and User Management' },
    'projects.p3b.desc': { pt: 'Aplicação com login, registo de percursos, estatísticas e exportação (CSV, JSON). Sincronização em tempo real com base de dados Firebase.', en: 'App with login, route recording, statistics and export (CSV, JSON). Real-time sync with Firebase backend.' },
    'projects.p4.title': { pt: 'Jogo Educativo Escolar', en: 'Educational School Game' },
    'projects.p4.desc': { pt: 'Jogo para incentivar ao estudo crianças do 1º ao 4º ciclo, com interface simples e bloqueio do dispositivo até cumprimento de desafios. Configurável via painel de Admin.', en: 'Game to encourage studying for children in primary school, with a simple interface and device lock until challenges are completed. Configurable via an Admin panel.' },
    'about.title': { pt: 'Sobre Mim', en: 'About Me' },
    'about.desc': { pt: 'Finalista de Engenharia Informática pelo ISEC com experiência prática em desenvolvimento de software moderno (React, TypeScript, Java, Python). Trago 15 anos de experiência profissional, disciplina e grande compromisso com a aprendizagem contínua. Motivado por resolver problemas reais com software fiável.', en: 'Computer Engineering graduate from ISEC with hands-on experience in modern software development (React, TypeScript, Java, Python). I bring 15 years of professional experience, discipline, and a strong commitment to continuous learning. Motivated by solving real problems through reliable software.' },
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
    'exp.p1.period': { pt: 'Fev 2026 - Jul 2026', en: 'Feb 2026 - Jul 2026' },
    'exp.p1.title': { pt: 'Estagiário de Engenharia de Software', en: 'Software Engineering Intern' },
    'exp.p1.org': { pt: 'Critical Software', en: 'Critical Software' },
    'exp.p1.desc': { pt: 'Contribuí para o desenvolvimento do Lighthouse, plataforma de Ground Segment para missões espaciais. Trabalhei com visualização de telemetria em tempo real, REST APIs e WebSockets.', en: 'Contributed to the development of Lighthouse, a Ground Segment platform for space missions. Worked on real-time telemetry visualization, REST APIs, and WebSockets.' },
    'exp.p2.period': { pt: 'Nov 2022 - Presente', en: 'Nov 2022 - Present' },
    'exp.p2.title': { pt: 'Especialista GIS & Modelação 3D Freelance', en: 'Freelance GIS Specialist & 3D Modeling' },
    'exp.p2.org': { pt: 'Fiverr, Upwork', en: 'Fiverr, Upwork' },
    'exp.p2.desc': { pt: 'Desenho e entrega de soluções GIS e aplicações orientadas a dados para contextos de missão crítica.', en: 'Designed and delivered GIS solutions and data-driven applications in mission-critical contexts.' },
    'exp.p3.period': { pt: 'Out 2011 - Fev 2026', en: 'Oct 2011 - Feb 2026' },
    'exp.p3.title': { pt: 'Técnico de Operações e Analista GIS / Militar', en: 'Military & GIS Analyst and Operations Technician' },
    'exp.p3.org': { pt: 'GNR (Guarda Nacional Republicana) / UEPS', en: 'GNR (National Republican Guard) / UEPS' },
    'exp.p3.desc': { pt: 'Apoio a operações de busca por pessoas desaparecidas e resposta a catástrofes usando drones e Sistemas de Informação Geográfica (GIS).', en: 'Supported missing persons search and disaster response operations through the use of drones and Geographic Information Systems (GIS).' },
    'footer.copy': { pt: '© 2024 Rui Casaca. Construído com Tailwind CSS e Lucide Icons.', en: '© 2024 Rui Casaca. Built with Tailwind CSS and Lucide Icons.' },
    'control.theme': { pt: 'Alternar tema (Dark/Light)', en: 'Toggle theme (Dark/Light)' },
    'control.lang': { pt: 'Alternar idioma (PT/EN)', en: 'Toggle language (PT/EN)' },
    'download.title': { pt: 'Download do meu CV em PDF', en: 'Download my CV (PDF)' },
    'cv.download.choose': { pt: 'Escolha o idioma para o CV', en: 'Choose CV language' },
    'cv.download.pt': { pt: 'Descarregar CV — Português', en: 'Download CV — Portuguese' },
    'cv.download.en': { pt: 'Descarregar CV — English', en: 'Download CV — English' },
    // Tech badge translations
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
    const current = localStorage.getItem('site_lang') || 'pt';
    const next = current === 'pt' ? 'en' : 'pt';
    setLanguage(next);
}

// Optional helper to explicitly refresh the lang-code display from current storage
function refreshLangToggle() {
    const current = localStorage.getItem('site_lang') || 'pt';
    const langCodeEl = document.getElementById('lang-code');
    if (langCodeEl) langCodeEl.textContent = (current === 'pt') ? 'EN' : 'PT';
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
    const current = localStorage.getItem('site_theme') || (document.body.classList.contains('light') ? 'light' : 'dark');
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
    const savedTheme = localStorage.getItem('site_theme') || 'dark';
    setTheme(savedTheme);

    // apply saved language
    const savedLang = localStorage.getItem('site_lang') || 'pt';
    applyTranslations(savedLang);
    // re-create icons after translations in case we added icon placeholders
    lucide.createIcons();
    // ensure the visible code next to the globe is correct
    refreshLangToggle();
});
