(function () {
  'use strict';

  /* ══════════════════════════════════════════════════════
     KNOWLEDGE BASE
  ══════════════════════════════════════════════════════ */

  const TOOLS = [
    // ── CHAT ────────────────────────────────────────────
    {
      id: 'claude', name: 'Claude', provider: 'Anthropic',
      url: 'https://claude.ai', logo: 'claude.ai',
      category: 'chat', type: 'chat',
      tagline: 'Contextos largos, arquitectura y refactorización',
      free: true, local: false, noSignup: false,
      weight: 1.0,
      keywords: ['refactor', 'refactorizar', 'arquitectura', 'diseño', 'contexto', 'grande', 'complejo',
                 'typescript', 'rust', 'go', 'explicar', 'documentar', 'revisar', 'code review', 'codebase',
                 'base de código', 'migración', 'técnica', 'avanzado'],
      languages: ['python', 'javascript', 'typescript', 'rust', 'go', 'java', 'kotlin', 'swift'],
      projectTypes: ['web', 'api', 'backend', 'fullstack', 'cli', 'library', 'refactor'],
      skillLevel: ['intermediate', 'expert'],
      reasons: [
        'Contexto de 200k tokens — ideal para proyectos grandes',
        'Excelente en arquitectura y decisiones de diseño',
        'Explica cada cambio con detalle'
      ]
    },
    {
      id: 'chatgpt', name: 'ChatGPT', provider: 'OpenAI',
      url: 'https://chatgpt.com', logo: 'chatgpt.com',
      category: 'chat', type: 'chat',
      tagline: 'Prototipar rápido, aprender y ejecutar código',
      free: true, local: false, noSignup: false,
      weight: 1.0,
      keywords: ['prototipo', 'prototipar', 'rápido', 'aprender', 'empezar', 'comenzar', 'idea',
                 'script', 'automatizar', 'tests', 'unit test', 'jest', 'pytest', 'html', 'css'],
      languages: ['python', 'javascript', 'java', 'c++', 'html', 'css', 'php', 'ruby'],
      projectTypes: ['web', 'script', 'automation', 'prototype', 'test'],
      skillLevel: ['beginner', 'intermediate'],
      reasons: [
        'GPT-4o gratis con intérprete de Python',
        'Ideal para prototipar y ver resultados rápido',
        'Perfecto para generar tests automáticamente'
      ]
    },
    {
      id: 'deepseek', name: 'DeepSeek', provider: 'DeepSeek',
      url: 'https://chat.deepseek.com', logo: 'chat.deepseek.com',
      category: 'chat', type: 'chat',
      tagline: 'Algoritmos, matemáticas y optimización de código',
      free: true, local: false, noSignup: false,
      weight: 1.1,
      keywords: ['algoritmo', 'algoritmos', 'matemática', 'optimizar', 'optimización', 'eficiencia',
                 'estructura de datos', 'recursión', 'complejidad', 'big o', 'machine learning', 'ml',
                 'deep learning', 'ia', 'modelo', 'entrenamiento', 'data science', 'ciencia de datos',
                 'estadística', 'numpy', 'pandas', 'sklearn', 'pytorch', 'tensorflow'],
      languages: ['python', 'c', 'c++', 'java', 'sql', 'r', 'matlab'],
      projectTypes: ['algorithm', 'ml', 'data', 'optimization', 'research'],
      skillLevel: ['intermediate', 'expert'],
      reasons: [
        'Modo Think muestra el razonamiento paso a paso',
        'Líder en algoritmos y matemáticas complejas',
        'Gratis sin límite de mensajes'
      ]
    },
    {
      id: 'gemini', name: 'Gemini', provider: 'Google DeepMind',
      url: 'https://gemini.google.com', logo: 'gemini.google.com',
      category: 'chat', type: 'chat',
      tagline: 'Ecosistema Google, documentación actualizada',
      free: true, local: false, noSignup: false,
      weight: 0.9,
      keywords: ['google', 'firebase', 'flutter', 'dart', 'android', 'gcp', 'cloud run', 'bigquery',
                 'kotlin', 'actualizado', 'documentación oficial', 'integración', 'multimodal', 'imagen',
                 'video', 'audio', 'gemini', 'vertex'],
      languages: ['dart', 'kotlin', 'javascript', 'python', 'go', 'java'],
      projectTypes: ['mobile', 'web', 'cloud', 'multimodal'],
      skillLevel: ['beginner', 'intermediate', 'expert'],
      reasons: [
        'Búsqueda web en tiempo real para docs actualizadas',
        'Ideal para proyectos con Firebase / GCP',
        'Soporte multimodal nativo'
      ]
    },
    {
      id: 'mistral', name: 'Le Chat (Mistral)', provider: 'Mistral AI',
      url: 'https://chat.mistral.ai', logo: 'mistral.ai',
      category: 'chat', type: 'chat',
      tagline: 'Sin límite de mensajes, Python, Bash, DevOps',
      free: true, local: false, noSignup: false,
      weight: 0.85,
      keywords: ['bash', 'shell', 'script', 'linux', 'devops', 'docker', 'nginx', 'systemd',
                 'sin límite', 'privacidad', 'gdpr', 'europeo', 'ansible', 'terraform'],
      languages: ['python', 'bash', 'javascript', 'sql', 'yaml'],
      projectTypes: ['script', 'automation', 'backend', 'devops'],
      skillLevel: ['intermediate', 'expert'],
      reasons: [
        'Sin límite de mensajes por ahora',
        'Muy bueno en Bash, DevOps y scripting',
        'Privacidad GDPR (datos procesados en Europa)'
      ]
    },
    // ── IDE / COPILOT ────────────────────────────────────
    {
      id: 'cursor', name: 'Cursor', provider: 'Anysphere',
      url: 'https://cursor.com', logo: 'cursor.com',
      category: 'copilot', type: 'ide',
      tagline: 'El mejor editor IA para desarrollo activo',
      free: false, local: false, noSignup: false,
      weight: 1.2,
      keywords: ['editor', 'ide', 'vscode', 'programar', 'desarrollar', 'proyecto', 'app', 'aplicación',
                 'fullstack', 'react', 'next', 'nextjs', 'vue', 'svelte', 'astro', 'node', 'express',
                 'django', 'flask', 'fastapi', 'spring', 'código completo', 'múltiples archivos'],
      languages: ['javascript', 'typescript', 'python', 'rust', 'go', 'java', 'c#', 'php'],
      projectTypes: ['web', 'api', 'backend', 'frontend', 'fullstack', 'mobile', 'cli', 'desktop'],
      skillLevel: ['intermediate', 'expert'],
      reasons: [
        'Edición multi-archivo con contexto del repo completo',
        'Claude 3.5 + GPT-4o incluidos en el plan free',
        'Mejor relación calidad/precio para desarrollo diario'
      ]
    },
    {
      id: 'codeium', name: 'Codeium / Windsurf', provider: 'Codeium',
      url: 'https://codeium.com', logo: 'codeium.com',
      category: 'copilot', type: 'ide',
      tagline: 'Autocompletado ilimitado en cualquier IDE',
      free: true, local: false, noSignup: false,
      weight: 0.95,
      keywords: ['autocompletado', 'jetbrains', 'pycharm', 'intellij', 'webstorm', 'plugin',
                 'extensión', 'gratis ilimitado', 'sin límite', 'sugerencias'],
      languages: ['all'],
      projectTypes: ['any'],
      skillLevel: ['beginner', 'intermediate', 'expert'],
      reasons: [
        'Autocompletado ilimitado en el plan gratuito',
        'Compatible con 40+ IDEs incluyendo JetBrains',
        'Agente Cascade para cambios en múltiples archivos'
      ]
    },
    {
      id: 'copilot', name: 'GitHub Copilot Free', provider: 'GitHub · Microsoft',
      url: 'https://github.com/features/copilot', logo: 'github.com',
      category: 'copilot', type: 'ide',
      tagline: 'Integrado nativo en VS Code y JetBrains',
      free: false, local: false, noSignup: false,
      weight: 0.9,
      keywords: ['github', 'vscode', 'visual studio', 'pull request', 'pr', 'copilot', 'microsoft'],
      languages: ['all'],
      projectTypes: ['any'],
      skillLevel: ['intermediate', 'expert'],
      reasons: [
        '2 000 completados + 50 chats/mes gratis',
        'Completamente integrado en VS Code',
        'Elige entre GPT-4o y Claude 3.5'
      ]
    },
    // ── AGENTES ───────────────────────────────────────────
    {
      id: 'claude-code', name: 'Claude Code', provider: 'Anthropic',
      url: 'https://claude.ai/code', logo: 'claude.ai',
      category: 'agent', type: 'agent',
      tagline: 'Agente autónomo que modifica tu repo desde la terminal',
      free: true, local: false, noSignup: false,
      weight: 1.15,
      keywords: ['agente', 'autónomo', 'terminal', 'cli', 'repositorio', 'repo',
                 'refactorización masiva', 'migración', 'tests automáticos', 'commit', 'git',
                 'automatizar tareas', 'tareas complejas', 'múltiples archivos'],
      languages: ['all'],
      projectTypes: ['any'],
      skillLevel: ['intermediate', 'expert'],
      reasons: [
        'Lee y modifica el repositorio completo de forma autónoma',
        'Ejecuta tests, hace commits y refactoriza sin intervención',
        'Gratis con plan Claude.ai'
      ]
    },
    {
      id: 'aider', name: 'Aider', provider: 'Open Source',
      url: 'https://aider.chat', logo: 'aider.chat',
      category: 'agent', type: 'agent',
      tagline: 'Agente open-source con modelos locales',
      free: true, local: true, noSignup: true,
      weight: 1.0,
      keywords: ['local', 'privacidad', 'privado', 'offline', 'open source', 'ollama',
                 'sin internet', 'empresa', 'datos sensibles', 'confidencial', 'sin nube', 'propio servidor'],
      languages: ['all'],
      projectTypes: ['any'],
      skillLevel: ['expert'],
      reasons: [
        '100% open-source (Apache 2.0)',
        'Modelos locales con Ollama — código nunca sale de tu máquina',
        'Commits automáticos con git integrado'
      ]
    },
    // ── API ───────────────────────────────────────────────
    {
      id: 'groq', name: 'Groq API', provider: 'Groq',
      url: 'https://console.groq.com', logo: 'groq.com',
      category: 'api', type: 'api',
      tagline: 'API gratuita ultra-rápida para integrar IA en tus apps',
      free: true, local: false, noSignup: false,
      weight: 1.0,
      keywords: ['api', 'integrar', 'integración', 'endpoint', 'backend', 'servidor',
                 'microservicio', 'chatbot', 'bot', 'tiempo real', 'low latency', 'streaming',
                 'webhook', 'rest api', 'programar una ia'],
      languages: ['python', 'javascript', 'node', 'go', 'rest'],
      projectTypes: ['api', 'chatbot', 'backend', 'app'],
      skillLevel: ['intermediate', 'expert'],
      reasons: [
        '500 req/día gratis — la más rápida del mercado',
        'Compatible con SDK de OpenAI (migración en 2 líneas)',
        'Ideal para chatbots y apps con IA en tiempo real'
      ]
    },
    {
      id: 'aistudio', name: 'Google AI Studio', provider: 'Google',
      url: 'https://aistudio.google.com', logo: 'aistudio.google.com',
      category: 'api', type: 'api',
      tagline: 'API Gemini gratis: 1 500 req/día para tus proyectos',
      free: true, local: false, noSignup: false,
      weight: 0.95,
      keywords: ['api', 'gemini api', 'multimodal', 'imagen', 'video', 'audio', 'google api',
                 'flutter', 'dart', 'vertex', 'cloud', '1500', 'gratis api'],
      languages: ['python', 'javascript', 'go', 'java', 'rest', 'dart'],
      projectTypes: ['api', 'multimodal', 'app', 'mobile'],
      skillLevel: ['intermediate', 'expert'],
      reasons: [
        '1 500 req/día con Gemini 2.5 Flash gratis',
        'Soporte multimodal nativo (texto, imagen, video)',
        'SDKs oficiales para Python, Node, Go, Java, Dart'
      ]
    },
    {
      id: 'huggingface', name: 'HuggingFace', provider: 'Hugging Face',
      url: 'https://huggingface.co', logo: 'huggingface.co',
      category: 'api', type: 'api',
      tagline: 'Miles de modelos especializados gratis',
      free: true, local: true, noSignup: false,
      weight: 0.9,
      keywords: ['machine learning', 'ml', 'modelo', 'fine-tuning', 'nlp', 'transformers',
                 'open source', 'starcoder', 'codellama', 'especializado', 'dataset',
                 'investigación', 'research', 'entrenar', 'fine tune', 'bert', 'gpt2'],
      languages: ['python'],
      projectTypes: ['ml', 'nlp', 'research', 'data'],
      skillLevel: ['expert'],
      reasons: [
        'Miles de modelos open-source especializados en código',
        'Spaces gratuitos para deployar demos',
        'Auto-hosting disponible para privacidad total'
      ]
    },
    // ── REVIEW ────────────────────────────────────────────
    {
      id: 'coderabbit', name: 'CodeRabbit', provider: 'CodeRabbit AI',
      url: 'https://coderabbit.ai', logo: 'coderabbit.ai',
      category: 'review', type: 'review',
      tagline: 'Revisión automática de Pull Requests',
      free: true, local: false, noSignup: false,
      weight: 0.85,
      keywords: ['pull request', 'pr', 'code review', 'revisión', 'github', 'gitlab',
                 'equipo', 'colaboración', 'open source', 'revisar código'],
      languages: ['all'],
      projectTypes: ['any'],
      skillLevel: ['intermediate', 'expert'],
      reasons: [
        'Revisa cada PR automáticamente con comentarios inline',
        'Gratis para repos públicos / open-source',
        'Detecta bugs, antipatrones y mejoras de performance'
      ]
    },
    {
      id: 'snyk', name: 'Snyk Code', provider: 'Snyk',
      url: 'https://snyk.io', logo: 'snyk.io',
      category: 'review', type: 'review',
      tagline: 'Detecta vulnerabilidades de seguridad',
      free: true, local: false, noSignup: false,
      weight: 0.9,
      keywords: ['seguridad', 'vulnerabilidad', 'owasp', 'xss', 'sql injection', 'sast',
                 'auditoría', 'producción', 'enterprise', 'pentest', 'cifrado', 'token', 'secret'],
      languages: ['javascript', 'typescript', 'python', 'java', 'go', 'c#'],
      projectTypes: ['web', 'api', 'backend'],
      skillLevel: ['intermediate', 'expert'],
      reasons: [
        'Análisis SAST en tiempo real mientras escribes',
        'Detecta vulnerabilidades OWASP Top 10',
        'Gratis para desarrolladores individuales'
      ]
    },
    // ── LEARN ─────────────────────────────────────────────
    {
      id: 'khanmigo', name: 'Khanmigo', provider: 'Khan Academy',
      url: 'https://www.khanacademy.org/computing', logo: 'khanacademy.org',
      category: 'learn', type: 'learn',
      tagline: 'Tutor socrático para aprender a programar desde cero',
      free: true, local: false, noSignup: false,
      weight: 1.1,
      keywords: ['aprender', 'aprendizaje', 'principiante', 'básico', 'desde cero',
                 'primer proyecto', 'fundamentos', 'curso', 'tutorial', 'enseñar', 'estudiar'],
      languages: ['javascript', 'html', 'css', 'python', 'sql'],
      projectTypes: ['learning'],
      skillLevel: ['beginner'],
      reasons: [
        'Pedagógica socrática — aprende razonando, no copiando',
        'Completamente gratuito para estudiantes',
        'Cursos estructurados de JS, Python, HTML, SQL'
      ]
    },
    {
      id: 'replit', name: 'Replit AI', provider: 'Replit',
      url: 'https://replit.com', logo: 'replit.com',
      category: 'learn', type: 'learn',
      tagline: 'IDE online con IA sin instalar nada',
      free: true, local: false, noSignup: false,
      weight: 0.9,
      keywords: ['online', 'navegador', 'sin instalar', 'nube', 'compartir', 'demo',
                 'ejemplo', 'prototipo online', 'escuela', 'clase', 'práctica'],
      languages: ['all'],
      projectTypes: ['any'],
      skillLevel: ['beginner', 'intermediate'],
      reasons: [
        'Programa directo en el navegador — sin instalar nada',
        'Asistente IA incluido en el plan gratuito',
        'Perfecto para demostrar proyectos o practicar en el móvil'
      ]
    }
  ];

  /* ── Presets ──────────────────────────────────────── */
  const PRESETS = {
    web:        'Quiero crear una app web fullstack con React y Node.js, con autenticación de usuarios, base de datos y panel de administración',
    api:        'Necesito construir una API REST con Python y FastAPI, con documentación automática, tests y despliegue en producción',
    data:       'Proyecto de machine learning con Python: análisis de datos, entrenamiento de modelos con sklearn y visualizaciones con pandas y matplotlib',
    learn:      'Soy principiante y quiero aprender a programar desde cero, empezando por los fundamentos de Python y JavaScript',
    mobile:     'Quiero desarrollar una app móvil con Flutter y Dart para iOS y Android, con autenticación y base de datos en Firebase',
    automation: 'Necesito automatizar tareas repetitivas con scripts de Python y Bash, incluyendo web scraping y procesamiento de archivos',
    security:   'Quiero auditar la seguridad de mi aplicación web, detectar vulnerabilidades OWASP y revisar el código para posibles inyecciones SQL y XSS',
    local:      'Proyecto con datos confidenciales de empresa, necesito herramientas que corran completamente locales sin enviar código a la nube, privacidad total'
  };

  /* ── Project type detection ───────────────────────── */
  const PROJECT_TYPES = [
    { id: 'ml-data',      label: '📊 Data Science / ML',       kw: ['machine learning','ml','pandas','sklearn','tensorflow','pytorch','datos','modelo','entrenamiento','numpy','data science','r ','estadística'] },
    { id: 'mobile',       label: '📱 App Móvil',                kw: ['móvil','mobile','flutter','react native','android','ios','kotlin','swift','dart'] },
    { id: 'web-fullstack', label: '🏗️ App Web Fullstack',       kw: ['fullstack','full stack','frontend','backend','react','angular','vue','django','node','express','next'] },
    { id: 'web-frontend', label: '🌐 App Web Frontend',         kw: ['frontend','html','css','react','vue','svelte','astro','diseño web','interfaz'] },
    { id: 'api-backend',  label: '⚙️ API / Backend',            kw: ['api','rest','graphql','backend','servidor','microservicio','fastapi','express','django','endpoint'] },
    { id: 'automation',   label: '🤖 Automatización / Scripts', kw: ['automatizar','automatización','script','bash','cron','scraping','bot','selenium','playwright','tareas'] },
    { id: 'security',     label: '🔐 Seguridad',                kw: ['seguridad','vulnerabilidad','owasp','pentest','auditoría','xss','sql injection','cifrado'] },
    { id: 'local',        label: '🔒 Privacidad / Local',       kw: ['local','privacidad','privado','confidencial','offline','sin nube','datos sensibles','empresa'] },
    { id: 'learning',     label: '📚 Aprendizaje',              kw: ['aprender','principiante','básico','desde cero','curso','tutorial','fundamentos','estudiar'] },
    { id: 'cli',          label: '🖥️ Herramienta CLI',          kw: ['cli','command line','terminal','herramienta','utilidad','bash tool','shell script'] },
    { id: 'game',         label: '🎮 Videojuego',               kw: ['juego','game','unity','godot','pygame','videojuego','2d','3d','motor'] },
  ];

  /* ════════════════════════════════════════════════════
     SCORING ENGINE
  ════════════════════════════════════════════════════ */

  function detectType(text) {
    let best = { id: 'general', label: '💡 Proyecto General', score: 0 };
    PROJECT_TYPES.forEach(pt => {
      let score = pt.kw.filter(k => text.includes(k)).length;
      if (score > best.score) best = { ...pt, score };
    });
    return best;
  }

  function scoreTools(input) {
    const text = input.toLowerCase();

    const isBeginner  = /principiante|desde cero|básico|empezar a programar|primer proyecto|no sé programar/.test(text);
    const isExpert    = /producción|enterprise|avanzado|experto|arquitectura|microservicios/.test(text);
    const needsLocal  = /local|privacidad|privado|confidencial|offline|sin nube|datos sensibles/.test(text);
    const needsAPI    = /api|integrar|endpoint|backend|servidor|microservicio|chatbot|bot/.test(text);
    const needsAgent  = /agente|autónomo|autonomo|automatizar todo|refactori[zs]ar todo/.test(text);

    return TOOLS.map(tool => {
      let score = 0;

      // Keyword matches
      tool.keywords.forEach(kw => {
        if (text.includes(kw.toLowerCase())) score += 2;
      });

      // Language matches (higher weight)
      tool.languages.forEach(lang => {
        if (lang !== 'all' && text.includes(lang.toLowerCase())) score += 3;
      });

      // Project type matches
      tool.projectTypes.forEach(pt => {
        if (pt !== 'any' && text.includes(pt.toLowerCase())) score += 2;
      });

      // Skill level modifiers
      if (isBeginner) {
        if (tool.skillLevel.includes('beginner')) score += 4;
        else score -= 2;
      }
      if (isExpert) {
        if (tool.skillLevel.includes('expert')) score += 2;
      }

      // Special requirement modifiers
      if (needsLocal) {
        if (tool.local)  score += 8;
        else             score -= 3;
      }
      if (needsAPI && tool.type === 'api')    score += 5;
      if (needsAgent && tool.type === 'agent') score += 5;

      // If input is too vague (< 25 chars), boost popular generalist tools
      if (input.trim().length < 25) {
        if (['claude', 'chatgpt', 'cursor'].includes(tool.id)) score += 3;
      }

      score = Math.max(0, score) * tool.weight;
      return { ...tool, score };
    }).sort((a, b) => b.score - a.score);
  }

  function buildCombo(scored) {
    const categories = ['copilot', 'chat', 'agent', 'api', 'review'];
    const roles = {
      copilot: 'Editor de código',
      chat:    'Asistente IA',
      agent:   'Agente autónomo',
      api:     'IA en tu app',
      review:  'Revisor de código',
      learn:   'Tutor interactivo'
    };

    const used = {};
    const combo = [];

    // Pick best tool per category in priority order
    categories.forEach(cat => {
      if (combo.length >= 3) return;
      const best = scored.find(t => t.category === cat && !used[t.id] && t.score > 0);
      if (best) {
        used[best.id] = true;
        combo.push({ tool: best, role: roles[cat] || 'Herramienta' });
      }
    });

    // Pad with fallback tools if fewer than 2
    if (combo.length < 2) {
      scored.slice(0, 4).forEach(t => {
        if (combo.length >= 3 || used[t.id]) return;
        used[t.id] = true;
        combo.push({ tool: t, role: roles[t.category] || 'Herramienta' });
      });
    }

    return combo.slice(0, 3);
  }

  function comboDescription(combo, projectType) {
    const names = combo.map(c => `<strong>${c.tool.name}</strong>`).join(', ');
    const map = {
      'web-fullstack': `Para tu app fullstack, ${names} cubren el flujo completo: desde escribir y autocompletar código hasta depurar la arquitectura y desplegar.`,
      'web-frontend':  `Para tu frontend, ${names} te dan autocompletado inteligente y un asistente para diseñar componentes y depurar estilos.`,
      'api-backend':   `Para tu API, ${names} aceleran el diseño de endpoints, la generación de tests y la revisión de seguridad antes de producción.`,
      'ml-data':       `En tu proyecto de ML, ${names} son potentes para análisis exploratorio, optimización de modelos y generación de pipelines de datos.`,
      'mobile':        `Para tu app móvil, ${names} cubren desde la generación de pantallas Flutter/React Native hasta la integración con APIs nativas.`,
      'automation':    `Para automatización, ${names} te ayudan a escribir scripts robustos, depurar lógica de Bash/Python y generar código de scraping.`,
      'security':      `Para auditar seguridad, ${names} detectan vulnerabilidades OWASP en tiempo real y revisan cada PR antes de que lleguen a producción.`,
      'local':         `Para privacidad total, ${names} trabajan de forma local o con máxima privacidad, asegurando que tu código confidencial nunca salga de tu entorno.`,
      'learning':      `Para aprender a programar, ${names} combinan práctica directa en el navegador con un tutor socrático que te guía sin darte las respuestas hechas.`,
      'cli':           `Para tu herramienta CLI, ${names} aceleran la generación de argumentos, parsers y la lógica de scripts de terminal.`,
      'game':          `Para tu videojuego, ${names} ayudan con la lógica del motor, generación de assets de código y depuración de colisiones o física.`,
    };
    return map[projectType] || `La combinación de ${names} cubre el flujo completo de desarrollo para tu proyecto — desde escribir código hasta revisarlo y desplegarlo.`;
  }

  /* ════════════════════════════════════════════════════
     RENDER
  ════════════════════════════════════════════════════ */

  function renderRecommendations(scored, projectType) {
    const top3 = scored.filter(t => t.score > 0).slice(0, 3);
    const maxScore = top3[0]?.score || 1;

    // Recommendation cards
    const cardsEl = document.getElementById('recCards');
    cardsEl.innerHTML = '';

    if (top3.length === 0) {
      cardsEl.innerHTML = '<p style="color:var(--text2);font-size:.9rem;">No se encontraron herramientas específicas — intenta describir con más detalle.</p>';
    } else {
      top3.forEach((tool, idx) => {
        const pct = Math.round((tool.score / maxScore) * 100);
        const rankClass = `rank-${idx + 1}`;
        const rankLabel = idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉';

        cardsEl.innerHTML += `
          <div class="rec-card">
            <div class="rec-rank ${rankClass}">${rankLabel}</div>
            <div class="rec-card-header">
              <img src="https://www.google.com/s2/favicons?sz=64&domain=${tool.logo}" alt="${tool.name}" class="rec-card-logo" />
              <div>
                <div class="rec-card-name">${tool.name}</div>
                <div class="rec-card-provider">${tool.provider}</div>
              </div>
            </div>
            <p class="rec-card-tagline">${tool.tagline}</p>
            <ul class="rec-reasons">
              ${tool.reasons.map(r => `<li>${r}</li>`).join('')}
            </ul>
            <div class="rec-card-score">
              <div class="score-label"><span>Relevancia para tu proyecto</span><span>${pct}%</span></div>
              <div class="score-bar-bg"><div class="score-bar-fill" style="width:${pct}%"></div></div>
            </div>
            <a href="${tool.url}" target="_blank" rel="noopener" class="rec-card-link">Abrir ${tool.name} →</a>
          </div>`;
      });
    }

    // Combo
    const combo = buildCombo(scored);
    const flowEl = document.getElementById('comboFlow');
    flowEl.innerHTML = combo.map((item, idx) => `
      ${idx > 0 ? '<div class="combo-arrow">→</div>' : ''}
      <div class="combo-item">
        <div class="combo-item-inner">
          <img src="https://www.google.com/s2/favicons?sz=64&domain=${item.tool.logo}" alt="${item.tool.name}" class="combo-logo" />
          <div class="combo-name">${item.tool.name}</div>
          <div class="combo-role">${item.role}</div>
        </div>
      </div>`).join('');

    document.getElementById('comboWhy').innerHTML = comboDescription(combo, projectType.id);

    // Detected type
    document.getElementById('detectedType').textContent = projectType.label;

    // Show results
    document.getElementById('recommResults').classList.remove('hidden');

    // Scroll to results smoothly
    document.getElementById('recommResults').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function highlightCards(scored) {
    // Remove previous highlights
    document.querySelectorAll('.card.rec-highlight').forEach(c => c.classList.remove('rec-highlight'));

    // Highlight top 3 matching cards in the directory
    scored.filter(t => t.score > 0).slice(0, 3).forEach(tool => {
      const card = document.querySelector(`.card[data-tags*="${tool.id}"]`);
      if (card) card.classList.add('rec-highlight');
    });
  }

  /* ════════════════════════════════════════════════════
     INIT
  ════════════════════════════════════════════════════ */
  function init() {
    const ideaInput  = document.getElementById('ideaInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const btnText    = document.getElementById('btnText');
    const btnLoading = document.getElementById('btnLoading');
    const charCount  = document.getElementById('charCount');
    const resetBtn   = document.getElementById('resetBtn');
    const presetsRow = document.getElementById('presetsRow');

    // Char counter
    ideaInput.addEventListener('input', () => {
      const len = ideaInput.value.length;
      charCount.textContent = `${len} / 500 caracteres`;
      if (len > 450) charCount.style.color = 'var(--warn)';
      else charCount.style.color = 'var(--text2)';
      if (len > 500) ideaInput.value = ideaInput.value.slice(0, 500);
    });

    // Preset buttons
    presetsRow.addEventListener('click', e => {
      const btn = e.target.closest('.preset-btn');
      if (!btn) return;

      // Toggle active style
      presetsRow.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active-preset'));
      btn.classList.add('active-preset');

      const key = btn.dataset.preset;
      if (PRESETS[key]) {
        ideaInput.value = PRESETS[key];
        charCount.textContent = `${PRESETS[key].length} / 500 caracteres`;
        // Auto-analyze after a tiny delay for feedback
        setTimeout(analyze, 200);
      }
    });

    // Analyze button
    analyzeBtn.addEventListener('click', analyze);
    ideaInput.addEventListener('keydown', e => {
      if (e.key === 'Enter' && e.ctrlKey) analyze();
    });

    // Reset
    resetBtn.addEventListener('click', () => {
      document.getElementById('recommResults').classList.add('hidden');
      ideaInput.value = '';
      charCount.textContent = '0 / 500 caracteres';
      presetsRow.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active-preset'));
      document.querySelectorAll('.card.rec-highlight').forEach(c => c.classList.remove('rec-highlight'));
      ideaInput.focus();
    });

    function analyze() {
      const input = ideaInput.value.trim();
      if (!input) {
        ideaInput.focus();
        ideaInput.style.borderColor = 'var(--warn)';
        setTimeout(() => { ideaInput.style.borderColor = ''; }, 1200);
        return;
      }

      // Loading state
      btnText.classList.add('hidden');
      btnLoading.classList.remove('hidden');
      analyzeBtn.disabled = true;
      document.getElementById('recommResults').classList.add('hidden');

      // Simulate analysis delay for UX
      setTimeout(() => {
        const scored = scoreTools(input);
        const projectType = detectType(input.toLowerCase());
        renderRecommendations(scored, projectType);
        highlightCards(scored);

        btnText.classList.remove('hidden');
        btnLoading.classList.add('hidden');
        analyzeBtn.disabled = false;
      }, 900);
    }
  }

  document.addEventListener('DOMContentLoaded', init);

})();
