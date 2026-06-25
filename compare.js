(function () {
  'use strict';

  const MAX = 3;
  let selected = [];

  /* ── Tool database for comparison ─────────────────── */
  const DB = {
    claude:       { name:'Claude',             provider:'Anthropic',          logo:'claude.ai',              url:'https://claude.ai',                          type:'Chat IA',         free:'✓ Plan gratuito',    noSignup:'✗', local:'✗', limit:'200k tokens contexto, ilimitado*',     best:'Arquitectura, refactor, textos largos', langs:'Python · JS · TS · Rust · Go',      integration:'Web · API · CLI' },
    chatgpt:      { name:'ChatGPT',            provider:'OpenAI',             logo:'chatgpt.com',            url:'https://chatgpt.com',                        type:'Chat IA',         free:'✓ GPT-4o limitado',  noSignup:'✗', local:'✗', limit:'~50 msgs/3h con GPT-4o',             best:'Prototipado rápido, tests, aprender', langs:'Python · JS · Java · C++',          integration:'Web · API · Plugins' },
    deepseek:     { name:'DeepSeek',           provider:'DeepSeek',           logo:'chat.deepseek.com',      url:'https://chat.deepseek.com',                  type:'Chat IA',         free:'✓ Sin límite',       noSignup:'✗', local:'✗', limit:'Sin límite aparente',                best:'Algoritmos, matemáticas, ML',         langs:'Python · C · Java · SQL',           integration:'Web · API' },
    gemini:       { name:'Gemini',             provider:'Google DeepMind',    logo:'gemini.google.com',      url:'https://gemini.google.com',                  type:'Chat IA',         free:'✓ Gemini Flash',     noSignup:'✗', local:'✗', limit:'Sin límite en Gemini Flash',         best:'Ecosistema Google, búsqueda web',     langs:'Python · Dart · JS · Go',           integration:'Web · Workspace · API' },
    mistral:      { name:'Le Chat',            provider:'Mistral AI',         logo:'mistral.ai',             url:'https://chat.mistral.ai',                    type:'Chat IA',         free:'✓ Sin límite',       noSignup:'✗', local:'✗', limit:'Sin límite visible',                 best:'Bash, DevOps, privacidad GDPR',       langs:'Python · Bash · JS · SQL',          integration:'Web · API' },
    'meta-ai':    { name:'Meta AI',            provider:'Meta',               logo:'meta.ai',                url:'https://www.meta.ai',                        type:'Chat IA',         free:'✓ Completo',         noSignup:'✓', local:'✗', limit:'Gratis sin registrarse (algunos países)',best:'Razonamiento lógico, algoritmos',    langs:'Python · C++ · JS · Rust',          integration:'Web · WhatsApp · Instagram' },
    cursor:       { name:'Cursor',             provider:'Anysphere',          logo:'cursor.com',             url:'https://cursor.com',                         type:'Copiloto IDE',    free:'✓ 2 000/mes',        noSignup:'✗', local:'✗', limit:'2 000 completados + 50 chats/mes',   best:'Desarrollo fullstack diario',         langs:'Todos los lenguajes',               integration:'Editor propio (VS Code based)' },
    codeium:      { name:'Codeium/Windsurf',   provider:'Codeium',            logo:'codeium.com',            url:'https://codeium.com',                        type:'Copiloto IDE',    free:'✓ Ilimitado',        noSignup:'✗', local:'✗', limit:'Autocompletado ilimitado',           best:'Autocompletado sin límites',          langs:'70+ lenguajes',                     integration:'VS Code · JetBrains · 40+ IDEs' },
    copilot:      { name:'GitHub Copilot',     provider:'GitHub · Microsoft', logo:'github.com',             url:'https://github.com/features/copilot',        type:'Copiloto IDE',    free:'✓ 2 000/mes',        noSignup:'✗', local:'✗', limit:'2 000 completados + 50 chats/mes',   best:'Integración nativa en VS Code',       langs:'Todos los lenguajes',               integration:'VS Code · JetBrains · Neovim' },
    tabnine:      { name:'Tabnine Free',       provider:'Tabnine',            logo:'tabnine.com',            url:'https://tabnine.com',                        type:'Copiloto IDE',    free:'✓ Siempre gratis',   noSignup:'✗', local:'✓', limit:'Completados de línea ilimitados',    best:'Privacidad — corre localmente',       langs:'Python · JS · Java · Ruby',         integration:'VS Code · JetBrains · Vim' },
    'claude-code':{ name:'Claude Code',        provider:'Anthropic',          logo:'claude.ai',              url:'https://claude.ai/code',                     type:'Agente CLI',      free:'✓ Con plan Claude',  noSignup:'✗', local:'✗', limit:'Gratis con plan Claude.ai',          best:'Refactor masivo, CLI autónomo',       langs:'Cualquier lenguaje',                integration:'Terminal (cualquier SO)' },
    aider:        { name:'Aider',              provider:'Open Source',        logo:'aider.chat',             url:'https://aider.chat',                         type:'Agente CLI',      free:'✓ Open Source',      noSignup:'✓', local:'✓', limit:'Ilimitado (usa tu API key)',         best:'Privacidad total con Ollama',         langs:'Cualquier lenguaje',                integration:'Terminal · Git' },
    groq:         { name:'Groq API',           provider:'Groq',               logo:'groq.com',               url:'https://console.groq.com',                   type:'API',             free:'✓ 500 req/día',      noSignup:'✗', local:'✗', limit:'500 req/día gratis',                best:'Apps con IA ultra-rápida',            langs:'Python · JS · REST',                integration:'REST API · Python SDK · JS SDK' },
    aistudio:     { name:'Google AI Studio',   provider:'Google',             logo:'aistudio.google.com',    url:'https://aistudio.google.com',                type:'API',             free:'✓ 1 500/día',        noSignup:'✗', local:'✗', limit:'1 500 req/día Gemini Flash',         best:'Apps multimodal, proyectos Google',  langs:'Python · Node · Go · Java · REST',  integration:'REST API · SDKs oficiales' },
    huggingface:  { name:'HuggingFace',        provider:'Hugging Face',       logo:'huggingface.co',         url:'https://huggingface.co',                     type:'API / Hub',       free:'✓ Serverless',       noSignup:'✗', local:'✓', limit:'API serverless gratuita',            best:'Modelos especializados, ML research',langs:'Python · REST',                     integration:'Python SDK · REST · Spaces' },
    coderabbit:   { name:'CodeRabbit',         provider:'CodeRabbit AI',      logo:'coderabbit.ai',          url:'https://coderabbit.ai',                      type:'Revisión PR',     free:'✓ Repos públicos',   noSignup:'✗', local:'✗', limit:'Gratis para repos open-source',      best:'Revisión automática de PRs',          langs:'Todos los lenguajes',               integration:'GitHub · GitLab · Bitbucket' },
    snyk:         { name:'Snyk Code',          provider:'Snyk',               logo:'snyk.io',                url:'https://snyk.io',                            type:'Revisión',        free:'✓ Individual',       noSignup:'✗', local:'✗', limit:'Repos ilimitados para individuos',  best:'Seguridad, OWASP en tiempo real',    langs:'JS · TS · Python · Java · Go',      integration:'VS Code · JetBrains · GitHub' },
    khanmigo:     { name:'Khanmigo',           provider:'Khan Academy',       logo:'khanacademy.org',        url:'https://www.khanacademy.org/computing',      type:'Aprendizaje',     free:'✓ Estudiantes',      noSignup:'✗', local:'✗', limit:'Gratis para estudiantes',            best:'Aprender desde cero (socrático)',    langs:'JS · HTML · CSS · Python · SQL',    integration:'Web (Khan Academy)' },
    replit:       { name:'Replit AI',          provider:'Replit',             logo:'replit.com',             url:'https://replit.com',                         type:'Aprendizaje',     free:'✓ Plan básico',      noSignup:'✗', local:'✗', limit:'Asistente IA básico en plan free',  best:'Programar en el navegador',          langs:'50+ lenguajes',                     integration:'Web IDE completo' },
  };

  /* ── Helpers ─────────────────────────────────────── */
  function getToolId(card) {
    return card.dataset.id || '';
  }

  function slugToData(id) {
    // Try direct match, then try partial match
    if (DB[id]) return DB[id];
    const key = Object.keys(DB).find(k => id.includes(k) || k.includes(id));
    return key ? DB[key] : null;
  }

  function updateBar() {
    const bar   = document.getElementById('compareBar');
    const pills = document.getElementById('comparePills');
    const count = document.getElementById('compareCount');
    const goBtn = document.getElementById('compareGo');
    if (!bar) return;

    if (selected.length === 0) {
      bar.classList.add('hidden');
      return;
    }
    bar.classList.remove('hidden');

    pills.innerHTML = selected.map(item => `
      <div class="cmp-pill">
        <img src="https://www.google.com/s2/favicons?sz=32&domain=${item.data.logo}" alt="" class="cmp-pill-img"/>
        <span>${item.data.name}</span>
        <button class="cmp-pill-remove" data-id="${item.id}" title="Quitar">✕</button>
      </div>`).join('');

    count.textContent = `${selected.length} / ${MAX} seleccionadas`;
    goBtn.disabled = selected.length < 2;

    // Remove handlers
    pills.querySelectorAll('.cmp-pill-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        selected = selected.filter(s => s.id !== id);
        const card = document.querySelector(`.card[data-id="${id}"]`);
        if (card) card.classList.remove('cmp-selected');
        updateBar();
      });
    });
  }

  function openModal() {
    const modal = document.getElementById('compareModal');
    const tbody = document.getElementById('cmpTableBody');
    if (!modal || !tbody) return;

    const rows = [
      { label: 'Tipo',             key: 'type' },
      { label: 'Plan gratuito',    key: 'free' },
      { label: 'Sin registro',     key: 'noSignup' },
      { label: 'Local / Privado',  key: 'local' },
      { label: 'Límite free',      key: 'limit' },
      { label: 'Mejor para',       key: 'best' },
      { label: 'Lenguajes',        key: 'langs' },
      { label: 'Integración',      key: 'integration' },
    ];

    // Header row
    const headerCols = selected.map(s => `
      <th>
        <img src="https://www.google.com/s2/favicons?sz=40&domain=${s.data.logo}" alt="${s.data.name}" class="cmp-th-logo"/>
        <div class="cmp-th-name">${s.data.name}</div>
        <div class="cmp-th-provider">${s.data.provider}</div>
      </th>`).join('');

    const dataRows = rows.map(row => {
      const cells = selected.map(s => {
        const val = s.data[row.key] || '—';
        const isGood = val.startsWith('✓');
        const isBad  = val.startsWith('✗');
        return `<td class="${isGood ? 'cmp-yes' : isBad ? 'cmp-no' : ''}">${val}</td>`;
      }).join('');
      return `<tr><th class="cmp-row-label">${row.label}</th>${cells}</tr>`;
    }).join('');

    const linkRow = selected.map(s =>
      `<td><a href="${s.data.url}" target="_blank" rel="noopener" class="cmp-link-btn">Abrir →</a></td>`
    ).join('');

    tbody.innerHTML = `
      <thead>
        <tr><th></th>${headerCols}</tr>
      </thead>
      <tbody>
        ${dataRows}
        <tr><th class="cmp-row-label">Enlace</th>${linkRow}</tr>
      </tbody>`;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const modal = document.getElementById('compareModal');
    if (modal) modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  /* ── Init ─────────────────────────────────────────── */
  function init() {
    // Inject compare buttons into every card
    document.querySelectorAll('.card').forEach(card => {
      const id = card.dataset.id;
      if (!id) return;
      const data = slugToData(id);
      if (!data) return;

      const btn = document.createElement('button');
      btn.className = 'cmp-add-btn';
      btn.title = 'Agregar a comparación';
      btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Comparar`;
      card.appendChild(btn);

      btn.addEventListener('click', e => {
        e.preventDefault(); e.stopPropagation();

        if (card.classList.contains('cmp-selected')) {
          selected = selected.filter(s => s.id !== id);
          card.classList.remove('cmp-selected');
          btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Comparar`;
        } else {
          if (selected.length >= MAX) {
            btn.textContent = '¡Máx 3!';
            setTimeout(() => { btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Comparar`; }, 1200);
            return;
          }
          selected.push({ id, data });
          card.classList.add('cmp-selected');
          btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Añadida`;
        }
        updateBar();
      });
    });

    // Compare button in bar
    const goBtn = document.getElementById('compareGo');
    if (goBtn) goBtn.addEventListener('click', openModal);

    // Clear
    const clearBtn = document.getElementById('compareClear');
    if (clearBtn) clearBtn.addEventListener('click', () => {
      selected = [];
      document.querySelectorAll('.card.cmp-selected').forEach(c => {
        c.classList.remove('cmp-selected');
        const b = c.querySelector('.cmp-add-btn');
        if (b) b.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Comparar`;
      });
      updateBar();
    });

    // Close modal
    document.getElementById('compareModalClose')?.addEventListener('click', closeModal);
    document.getElementById('compareModalBackdrop')?.addEventListener('click', closeModal);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  }

  document.addEventListener('DOMContentLoaded', init);

})();
