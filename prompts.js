(function () {
  'use strict';

  /* ══════════════════════════════════════════════════
     PROMPT TEMPLATES DATABASE
  ══════════════════════════════════════════════════ */

  const PROMPTS = {
    debug: [
      {
        title: 'Diagnosticar un error con contexto',
        desc: 'Cuando tienes un stack trace y no entiendes la causa raíz',
        bestFor: ['Claude', 'ChatGPT', 'DeepSeek'],
        template: `Tengo este error en [LENGUAJE]:

\`\`\`
[PEGA EL MENSAJE DE ERROR COMPLETO]
\`\`\`

El código relevante:
\`\`\`[LENGUAJE]
[PEGA TU CÓDIGO]
\`\`\`

Contexto adicional: [describe qué debería hacer el código]

Por favor:
1. Explica exactamente qué causa el error
2. Muéstrame el código corregido
3. Explica por qué funciona la solución`
      },
      {
        title: 'Función que devuelve resultado incorrecto',
        desc: 'El código corre pero el output no es el esperado',
        bestFor: ['DeepSeek', 'Claude', 'ChatGPT'],
        template: `Esta función no devuelve el resultado correcto:

\`\`\`[LENGUAJE]
[PEGA LA FUNCIÓN]
\`\`\`

Entrada de ejemplo: [INPUT]
Resultado actual:   [OUTPUT ACTUAL]
Resultado esperado: [OUTPUT CORRECTO]

¿Cuál es el bug lógico? Corrige la función y explica el error paso a paso.`
      },
      {
        title: 'Tests fallando sin razón aparente',
        desc: 'Para cuando los tests fallan pero el código parece correcto',
        bestFor: ['Claude', 'ChatGPT'],
        template: `Mis tests están fallando. Framework: [Jest / Pytest / JUnit / otro]

Test que falla:
\`\`\`[LENGUAJE]
[PEGA EL TEST]
\`\`\`

Código que prueba:
\`\`\`[LENGUAJE]
[PEGA LA FUNCIÓN O MÓDULO]
\`\`\`

Error del test:
\`\`\`
[PEGA EL OUTPUT DEL TEST]
\`\`\`

¿Por qué falla el test y cómo lo arreglo?`
      },
      {
        title: 'Bug de rendimiento / lentitud',
        desc: 'Código que funciona pero es demasiado lento',
        bestFor: ['DeepSeek', 'Claude'],
        template: `Este código es demasiado lento para mi caso de uso:

\`\`\`[LENGUAJE]
[PEGA EL CÓDIGO LENTO]
\`\`\`

Contexto de uso:
- Tamaño del dataset: [N registros / MB]
- Tiempo actual: [X segundos]
- Tiempo objetivo: [Y segundos]

Identifica los cuellos de botella y proporciona una versión optimizada con la complejidad Big O de cada solución.`
      },
      {
        title: 'Error intermitente / race condition',
        desc: 'Bug que aparece solo a veces, difícil de reproducir',
        bestFor: ['Claude', 'ChatGPT'],
        template: `Tengo un bug intermitente (aparece ~[X]% de las veces):

Descripción del comportamiento: [describe qué pasa cuando falla]

Código sospechoso:
\`\`\`[LENGUAJE]
[PEGA EL CÓDIGO]
\`\`\`

Tecnologías involucradas: [async/await / hilos / promesas / eventos / etc.]

¿Podría ser una race condition, problema de estado o concurrencia? Analiza el código y propón una solución robusta.`
      },
      {
        title: 'Error de importación / dependencias',
        desc: 'ModuleNotFoundError, Cannot find module, etc.',
        bestFor: ['ChatGPT', 'Gemini'],
        template: `Tengo este error de importación/dependencias:

\`\`\`
[PEGA EL ERROR COMPLETO]
\`\`\`

Mi entorno:
- Lenguaje y versión: [Python 3.11 / Node 20 / etc.]
- Gestor de paquetes: [pip / npm / yarn / cargo / etc.]
- Sistema operativo: [Windows / macOS / Linux]
- Archivo de dependencias (package.json / requirements.txt):
\`\`\`
[PEGA EL CONTENIDO]
\`\`\`

¿Cómo lo resuelvo?`
      }
    ],

    explain: [
      {
        title: 'Explicar código complejo paso a paso',
        desc: 'Para entender código que no escribiste tú',
        bestFor: ['Claude', 'ChatGPT'],
        template: `Explícame este código como si fuera un desarrollador junior:

\`\`\`[LENGUAJE]
[PEGA EL CÓDIGO]
\`\`\`

Quiero entender:
1. ¿Qué hace en general?
2. ¿Qué hace cada parte importante línea por línea?
3. ¿Qué patrones o conceptos usa (closures, recursión, etc.)?
4. ¿Hay algo inusual o no obvio que debería saber?`
      },
      {
        title: 'Explicar un algoritmo con ejemplo',
        desc: 'Entender la lógica de sorting, búsqueda, grafos, etc.',
        bestFor: ['DeepSeek', 'Claude', 'ChatGPT'],
        template: `Explícame el algoritmo [NOMBRE DEL ALGORITMO] de forma clara:

1. ¿Para qué sirve y cuándo se usa?
2. ¿Cómo funciona paso a paso? (usa un ejemplo pequeño con [3-5] elementos)
3. ¿Cuál es su complejidad temporal y espacial (Big O)?
4. ¿Cuándo es la mejor opción vs otras alternativas?
5. Muéstrame una implementación limpia en [LENGUAJE]`
      },
      {
        title: 'Decodificar una expresión regular',
        desc: 'Entender qué hace un regex complicado',
        bestFor: ['ChatGPT', 'Claude'],
        template: `Explícame qué hace esta expresión regular:

\`\`\`
[PEGA EL REGEX]
\`\`\`

Lenguaje/flavor: [JavaScript / Python / PCRE / etc.]

Por favor:
1. Explica cada parte del regex con sus símbolos
2. Da 3 ejemplos de strings que coinciden (match)
3. Da 3 ejemplos de strings que NO coinciden
4. Si hay una forma más legible de escribirlo, muéstramela`
      },
      {
        title: 'Explicar patrón de diseño',
        desc: 'Entender Factory, Observer, Singleton, etc. en contexto',
        bestFor: ['Claude', 'ChatGPT'],
        template: `Explícame el patrón de diseño [NOMBRE DEL PATRÓN] con un ejemplo práctico en [LENGUAJE]:

1. ¿Qué problema resuelve?
2. ¿Cuándo usarlo (y cuándo NO usarlo)?
3. Muéstrame el código SIN el patrón (el problema)
4. Muéstrame el código CON el patrón (la solución)
5. ¿Cuáles son los trade-offs?`
      },
      {
        title: 'Entender código legacy o de terceros',
        desc: 'Para analizar librerías o código sin documentación',
        bestFor: ['Claude'],
        template: `Tengo este código legacy / de terceros que necesito entender para modificarlo:

\`\`\`[LENGUAJE]
[PEGA EL CÓDIGO — hasta 500 líneas]
\`\`\`

Necesito saber:
1. ¿Qué hace este módulo/función en general?
2. ¿Cuáles son las entradas y salidas principales?
3. ¿Qué partes son frágiles o podrían romperse si las modifico?
4. Si necesito agregar [DESCRIBE TU CAMBIO], ¿por dónde empiezo?`
      }
    ],

    generate: [
      {
        title: 'Endpoint REST completo',
        desc: 'Generar un endpoint con validación, manejo de errores y tipos',
        bestFor: ['Claude', 'ChatGPT', 'Cursor'],
        template: `Genera un endpoint REST completo en [Express / FastAPI / Django / Spring / etc.]:

Ruta: [MÉTODO] [/ruta/ejemplo]
Descripción: [qué debe hacer este endpoint]

Requisitos:
- Validación de entrada: [campos requeridos y sus tipos]
- Autenticación: [JWT / API key / ninguna]
- Base de datos: [PostgreSQL / MongoDB / SQLite / ninguna]
- Respuesta exitosa: [describe el formato]
- Errores a manejar: [400, 401, 404, 500]

Incluye: tipos/interfaces, validación, manejo de errores y un ejemplo de request/response.`
      },
      {
        title: 'Componente React / Vue completo',
        desc: 'Generar un componente con props, estado y estilos',
        bestFor: ['Cursor', 'ChatGPT', 'Claude'],
        template: `Genera un componente [React / Vue / Svelte] para: [DESCRIPCIÓN DEL COMPONENTE]

Especificaciones:
- Props que recibe: [lista las props con sus tipos]
- Estado interno necesario: [describe la lógica de estado]
- Eventos que emite: [onClick, onChange, etc.]
- Estilo: [Tailwind / CSS Modules / styled-components / CSS inline]

El componente debe ser:
- TypeScript con tipos correctos
- Accesible (aria labels donde corresponda)
- Con manejo de estado de carga y error si aplica

Incluye también un ejemplo de uso del componente.`
      },
      {
        title: 'Query SQL optimizada',
        desc: 'Generar consultas complejas con JOINs, agregaciones o CTEs',
        bestFor: ['DeepSeek', 'ChatGPT', 'Claude'],
        template: `Genera una query SQL para: [DESCRIBE LO QUE NECESITAS]

Esquema de tablas relevantes:
\`\`\`sql
[PEGA CREATE TABLE o describe las columnas]
\`\`\`

Motor SQL: [PostgreSQL / MySQL / SQLite / SQL Server]

Requisitos:
- Filtros: [condiciones WHERE]
- Ordenamiento: [ORDER BY]
- Límite de resultados: [paginación si aplica]
- Performance: [índices disponibles si los conoces]

Explica brevemente por qué es eficiente la solución.`
      },
      {
        title: 'Script de automatización',
        desc: 'Python o Bash para tareas repetitivas',
        bestFor: ['Le Chat (Mistral)', 'ChatGPT', 'Claude'],
        template: `Crea un script en [Python / Bash] para automatizar esta tarea:

Tarea: [describe qué debe hacer el script]

Detalles:
- Input: [archivos, argumentos de línea de comandos, API, etc.]
- Output: [archivos generados, base de datos, logs, etc.]
- Frecuencia: [manual / cada X minutos / cron job]
- Manejo de errores: [qué hacer si falla]

Incluye:
- Argumentos de línea de comandos con --help
- Logging básico
- Manejo de excepciones
- Instrucciones de uso`
      },
      {
        title: 'Tipos TypeScript desde JSON / API',
        desc: 'Inferir interfaces/types desde datos reales',
        bestFor: ['Claude', 'ChatGPT'],
        template: `Genera los tipos TypeScript para esta respuesta de API:

\`\`\`json
[PEGA EL JSON DE EJEMPLO]
\`\`\`

Requisitos:
- Usa \`interface\` para objetos y \`type\` para uniones/primitivos
- Marca los campos opcionales con \`?\` si pueden ser null/undefined
- Crea tipos reutilizables para subestructuras repetidas
- Agrega JSDoc con descripción de los campos menos obvios
- Si aplica, crea un type guard para validar en runtime`
      },
      {
        title: 'Tests unitarios completos',
        desc: 'Generar suite de tests incluyendo edge cases',
        bestFor: ['ChatGPT', 'Claude', 'DeepSeek'],
        template: `Genera tests unitarios completos para esta función en [Jest / Pytest / JUnit / Vitest]:

\`\`\`[LENGUAJE]
[PEGA LA FUNCIÓN A TESTEAR]
\`\`\`

Incluye tests para:
1. Casos felices (happy path) con distintas entradas válidas
2. Casos límite (valores vacíos, null, 0, strings vacíos, arrays vacíos)
3. Casos de error (entradas inválidas, excepciones esperadas)
4. Si es async, testea también los casos de rechazo

Usa mocks para dependencias externas (DB, API, filesystem).`
      }
    ],

    refactor: [
      {
        title: 'Refactorizar función larga',
        desc: 'Dividir funciones de más de 50 líneas en partes manejables',
        bestFor: ['Claude', 'Cursor'],
        template: `Refactoriza esta función larga siguiendo principios SOLID y clean code:

\`\`\`[LENGUAJE]
[PEGA LA FUNCIÓN]
\`\`\`

Objetivos:
- Dividir en funciones más pequeñas con responsabilidad única
- Mejorar los nombres de variables y funciones
- Eliminar código duplicado
- Mantener exactamente la misma funcionalidad (no cambies el comportamiento)

Después del código refactorizado, explica brevemente qué cambios hiciste y por qué.`
      },
      {
        title: 'Modernizar código legacy',
        desc: 'Actualizar a patrones modernos del lenguaje',
        bestFor: ['Claude', 'ChatGPT'],
        template: `Moderniza este código a las convenciones actuales de [LENGUAJE versión]:

\`\`\`[LENGUAJE]
[PEGA EL CÓDIGO LEGACY]
\`\`\`

Cambios deseados (tacha los que no apliquen):
- Callbacks → async/await
- var → const/let
- Clases ES5 → clases ES6+ o funciones
- CommonJS require → ES Modules import
- Manejo de errores obsoleto → try/catch moderno
- Tipos implícitos → TypeScript estricto

Mantén la funcionalidad exacta. Señala si algún cambio podría romper compatibilidad.`
      },
      {
        title: 'Eliminar código duplicado (DRY)',
        desc: 'Encontrar y centralizar lógica repetida',
        bestFor: ['Claude', 'Cursor'],
        template: `Encuentra y elimina la duplicación de código en estos archivos/funciones:

\`\`\`[LENGUAJE]
[PEGA EL CÓDIGO CON DUPLICACIÓN]
\`\`\`

Por favor:
1. Identifica exactamente qué partes están duplicadas
2. Propón una abstracción (función, clase, hook, composable)
3. Muestra el código refactorizado usando esa abstracción
4. Verifica que los casos de uso originales siguen funcionando`
      },
      {
        title: 'Optimizar para rendimiento',
        desc: 'Mejorar velocidad sin cambiar comportamiento',
        bestFor: ['DeepSeek', 'Claude'],
        template: `Optimiza este código para mejorar su rendimiento:

\`\`\`[LENGUAJE]
[PEGA EL CÓDIGO]
\`\`\`

Contexto de uso:
- Se ejecuta: [cuántas veces por segundo / con qué volumen de datos]
- Problema actual: [es lento / consume mucha memoria / bloquea el hilo]
- Restricciones: [debe mantener la misma API / no añadir dependencias]

Muestra la versión optimizada explicando la complejidad Big O antes y después.`
      },
      {
        title: 'Convertir a TypeScript',
        desc: 'Migrar JavaScript puro a TypeScript estricto',
        bestFor: ['Claude', 'Cursor', 'ChatGPT'],
        template: `Convierte este código JavaScript a TypeScript estricto:

\`\`\`javascript
[PEGA EL CÓDIGO JS]
\`\`\`

Requisitos:
- Usa \`strict: true\` en tsconfig
- Todos los parámetros y retornos con tipos explícitos
- Interfaces para los objetos con más de 2 propiedades
- Generics donde tenga sentido
- Sin ningún \`any\` implícito
- Exporta los tipos que podrían necesitar otros módulos`
      }
    ],

    test: [
      {
        title: 'Tests de integración para API',
        desc: 'Testear endpoints HTTP completos end-to-end',
        bestFor: ['Claude', 'ChatGPT'],
        template: `Genera tests de integración para estos endpoints de API:

Framework del servidor: [Express / FastAPI / Django / etc.]
Framework de tests: [Supertest / httpx / pytest / etc.]

Endpoints a testear:
\`\`\`
[LISTA LOS ENDPOINTS: METHOD /ruta — descripción]
\`\`\`

Código del servidor (o extracto relevante):
\`\`\`[LENGUAJE]
[PEGA EL CÓDIGO]
\`\`\`

Testea: respuestas exitosas, validación de entrada, autenticación/autorización, y casos de error.`
      },
      {
        title: 'Mocks para dependencias externas',
        desc: 'Mockear bases de datos, APIs, filesystem, etc.',
        bestFor: ['ChatGPT', 'Claude'],
        template: `Genera los mocks necesarios para testear este código que depende de servicios externos:

\`\`\`[LENGUAJE]
[PEGA EL CÓDIGO A TESTEAR]
\`\`\`

Dependencias externas a mockear:
- [Base de datos: PostgreSQL / MongoDB / Redis]
- [APIs externas: nombre y qué endpoints usa]
- [Filesystem / variables de entorno / etc.]

Framework de testing: [Jest / Pytest / Vitest / Mocha]

Crea los mocks reutilizables y un test de ejemplo que los use.`
      },
      {
        title: 'Tests de snapshot para UI',
        desc: 'Testing visual de componentes React/Vue',
        bestFor: ['ChatGPT', 'Cursor'],
        template: `Genera tests de snapshot y comportamiento para este componente:

\`\`\`[LENGUAJE]
[PEGA EL COMPONENTE]
\`\`\`

Framework: [React Testing Library / Vue Test Utils]
Test runner: [Jest / Vitest]

Incluye tests para:
1. Renderizado con props mínimas
2. Renderizado con todas las props posibles
3. Interacciones del usuario (clicks, inputs)
4. Comportamiento con estado de carga y error
5. Accesibilidad básica (roles ARIA)`
      },
      {
        title: 'Plan de testing para feature nueva',
        desc: 'Diseñar qué tests necesita una funcionalidad antes de escribirlos',
        bestFor: ['Claude', 'ChatGPT'],
        template: `Necesito diseñar el plan de testing para esta feature antes de implementarla:

Feature: [DESCRIPCIÓN DE LA FUNCIONALIDAD]

Contexto técnico:
- Stack: [frontend / backend / base de datos]
- Casos de uso principales: [lista los flujos]
- Datos involucrados: [tipos de datos, usuarios, permisos]

Por favor crea:
1. Lista de casos de test unitarios (con qué debo mockear)
2. Lista de tests de integración necesarios
3. Casos edge que podría olvidarme
4. Orden recomendado para escribirlos (TDD)`
      }
    ],

    security: [
      {
        title: 'Auditoría de seguridad de código',
        desc: 'Revisión completa de vulnerabilidades OWASP',
        bestFor: ['Claude', 'Snyk Code'],
        template: `Realiza una auditoría de seguridad de este código buscando vulnerabilidades OWASP Top 10:

\`\`\`[LENGUAJE]
[PEGA EL CÓDIGO]
\`\`\`

Contexto:
- Es un: [endpoint de API / formulario web / script de admin / etc.]
- Recibe datos de: [usuarios no autenticados / usuarios autenticados / admins]
- Tiene acceso a: [base de datos / filesystem / APIs externas / variables de entorno]

Revisa específicamente: SQL Injection, XSS, CSRF, autenticación rota, exposición de datos sensibles, configuraciones inseguras.`
      },
      {
        title: 'Revisar lógica de autenticación',
        desc: 'Detectar fallos en JWT, sesiones, contraseñas',
        bestFor: ['Claude', 'ChatGPT'],
        template: `Revisa esta implementación de autenticación/autorización en busca de vulnerabilidades:

\`\`\`[LENGUAJE]
[PEGA EL CÓDIGO DE AUTH]
\`\`\`

Tipo de auth: [JWT / sesiones / OAuth / API key]
Framework: [Express / FastAPI / Django / etc.]

Verifica:
1. ¿Los tokens se validan correctamente?
2. ¿Hay alguna forma de saltarse la autenticación?
3. ¿Los errores revelan información sensible?
4. ¿Los tokens expiran apropiadamente?
5. ¿Las contraseñas se hashean con bcrypt/argon2?`
      },
      {
        title: 'Proteger contra SQL Injection',
        desc: 'Revisar y arreglar queries vulnerables',
        bestFor: ['DeepSeek', 'Claude', 'Snyk Code'],
        template: `Revisa estas queries SQL y arregla cualquier vulnerabilidad de inyección:

\`\`\`[LENGUAJE]
[PEGA EL CÓDIGO CON LAS QUERIES]
\`\`\`

Base de datos: [PostgreSQL / MySQL / SQLite / etc.]
ORM si aplica: [SQLAlchemy / Prisma / TypeORM / ninguno]

Para cada query vulnerable:
1. Muestra por qué es vulnerable (ejemplo de ataque)
2. Muestra la versión segura usando prepared statements / ORM
3. Agrega validación de entrada donde corresponda`
      },
      {
        title: 'Secrets y variables de entorno',
        desc: 'Detectar credenciales hardcodeadas o expuestas',
        bestFor: ['Claude', 'ChatGPT'],
        template: `Revisa este código para detectar credenciales hardcodeadas o manejo inseguro de secrets:

\`\`\`[LENGUAJE]
[PEGA EL CÓDIGO]
\`\`\`

Busca:
1. API keys, contraseñas o tokens en el código fuente
2. Variables de entorno que podrían exponerse en logs
3. Secrets que se pasan por URL (query params)
4. Información sensible en mensajes de error
5. Archivos que deberían estar en .gitignore

Proporciona las correcciones y las mejores prácticas para el manejo de secrets en [LENGUAJE/framework].`
      },
      {
        title: 'Configuración de CORS y headers HTTP',
        desc: 'Revisar políticas de seguridad en APIs web',
        bestFor: ['Claude', 'Gemini'],
        template: `Revisa y mejora la configuración de seguridad HTTP de mi servidor:

\`\`\`[LENGUAJE]
[PEGA LA CONFIGURACIÓN DE CORS / HEADERS / MIDDLEWARE]
\`\`\`

Framework: [Express / FastAPI / Django / Nginx / etc.]
La API es consumida por: [mismo dominio / subdominios / apps de terceros]

Verifica y mejora:
1. Política CORS (origins permitidos, métodos, headers)
2. Headers de seguridad (CSP, HSTS, X-Frame-Options, etc.)
3. Rate limiting si no está configurado
4. Validación del Content-Type
5. Manejo seguro de cookies (httpOnly, secure, sameSite)`
      }
    ]
  };

  /* ══════════════════════════════════════════════════
     RENDER PROMPTS
  ══════════════════════════════════════════════════ */

  let currentTab = 'debug';

  function renderPrompts(tab) {
    const grid = document.getElementById('promptGrid');
    if (!grid) return;
    const list = PROMPTS[tab] || [];
    grid.innerHTML = list.map((p, idx) => `
      <div class="prompt-card" data-idx="${idx}" data-tab="${tab}">
        <div class="prompt-card-top">
          <div>
            <h4 class="prompt-card-title">${p.title}</h4>
            <p class="prompt-card-desc">${p.desc}</p>
          </div>
          <button class="copy-btn" data-idx="${idx}" data-tab="${tab}" title="Copiar prompt">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <span>Copiar</span>
          </button>
        </div>
        <div class="prompt-best-for">
          Mejor con:
          ${p.bestFor.map(t => `<span class="best-tag">${t}</span>`).join('')}
        </div>
        <pre class="prompt-preview"><code>${escapeHtml(p.template)}</code></pre>
      </div>`).join('');

    // Copy handlers
    grid.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const t = btn.dataset.tab;
        const i = parseInt(btn.dataset.idx);
        const text = PROMPTS[t][i].template;
        navigator.clipboard.writeText(text).then(() => {
          const span = btn.querySelector('span');
          span.textContent = '¡Copiado!';
          btn.classList.add('copied');
          setTimeout(() => { span.textContent = 'Copiar'; btn.classList.remove('copied'); }, 2000);
        }).catch(() => {
          // Fallback for older browsers
          const ta = document.createElement('textarea');
          ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
          document.body.appendChild(ta); ta.select(); document.execCommand('copy');
          document.body.removeChild(ta);
          btn.querySelector('span').textContent = '¡Copiado!';
          setTimeout(() => { btn.querySelector('span').textContent = 'Copiar'; }, 2000);
        });
      });
    });
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function initTabs() {
    const tabs = document.getElementById('promptTabs');
    if (!tabs) return;
    tabs.addEventListener('click', e => {
      const btn = e.target.closest('.ptab');
      if (!btn) return;
      tabs.querySelectorAll('.ptab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      currentTab = btn.dataset.tab;
      renderPrompts(currentTab);
    });
    renderPrompts('debug');
  }

  /* ══════════════════════════════════════════════════
     FAVORITES SYSTEM
  ══════════════════════════════════════════════════ */

  const STORAGE_KEY = 'codeaihub_favorites';

  function getFavs() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
    catch { return []; }
  }

  function saveFavs(favs) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
  }

  function toggleFav(cardEl) {
    const id = cardEl.dataset.id || slugify(cardEl.querySelector('h3')?.textContent || '');
    const favs = getFavs();
    const idx = favs.indexOf(id);
    if (idx === -1) { favs.push(id); cardEl.classList.add('faved'); }
    else            { favs.splice(idx, 1); cardEl.classList.remove('faved'); }
    saveFavs(favs);
    updateFavCount();
    syncFavFilter();
  }

  function slugify(str) {
    return str.replace(/[^a-z0-9]/gi, '-').toLowerCase().replace(/-+/g, '-').replace(/^-|-$/g, '');
  }

  function updateFavCount() {
    const count = getFavs().length;
    const el = document.getElementById('favCount');
    if (el) el.textContent = count;
    const btn = document.getElementById('favFilterBtn');
    if (btn) btn.classList.toggle('has-favs', count > 0);
  }

  function syncFavFilter() {
    // If currently in favorites view, reapply filter via a custom event
    const active = document.querySelector('.filter-btn.active');
    if (active && active.dataset.filter === 'favorites') {
      applyFavoritesFilter();
    }
  }

  function applyFavoritesFilter() {
    const favs = getFavs();
    document.querySelectorAll('.category-section').forEach(section => {
      let vis = false;
      section.querySelectorAll('.card').forEach(card => {
        const id = card.dataset.id || slugify(card.querySelector('h3')?.textContent || '');
        if (favs.includes(id)) { card.classList.remove('hidden'); vis = true; }
        else card.classList.add('hidden');
      });
      section.classList.toggle('hidden', !vis);
    });
    const noResults = document.getElementById('noResults');
    if (noResults) noResults.classList.toggle('hidden', favs.length > 0);
  }

  function initFavorites() {
    const cards = document.querySelectorAll('.card');
    const favs = getFavs();

    cards.forEach(card => {
      // Assign stable ID based on tool name
      const h3 = card.querySelector('h3');
      const id = slugify(h3?.textContent?.replace(/Top Pick|Agente/gi, '') || '');
      card.dataset.id = id;

      // Mark saved favorites
      if (favs.includes(id)) card.classList.add('faved');

      // Inject star button
      const starBtn = document.createElement('button');
      starBtn.className = 'star-btn';
      starBtn.title = 'Guardar en favoritos';
      starBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
      starBtn.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); toggleFav(card); });
      card.style.position = 'relative';
      card.appendChild(starBtn);
    });

    updateFavCount();

    // Extend filter bar behavior for favorites
    const filterBar = document.getElementById('filterBar');
    if (filterBar) {
      filterBar.addEventListener('click', e => {
        const btn = e.target.closest('.filter-btn');
        if (btn && btn.dataset.filter === 'favorites') {
          applyFavoritesFilter();
        }
      }, true); // capture phase so it runs before app.js
    }
  }

  /* ══════════════════════════════════════════════════
     INIT
  ══════════════════════════════════════════════════ */
  document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initFavorites();
  });

})();
