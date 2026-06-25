(function () {
  'use strict';

  const searchInput   = document.getElementById('searchInput');
  const filterBar     = document.getElementById('filterBar');
  const langFilter    = document.getElementById('langFilter');
  const noResults     = document.getElementById('noResults');
  const noResultsTerm = document.getElementById('noResultsTerm');
  const sections      = document.querySelectorAll('.category-section');

  let activeFilter = 'all';
  let activeLang   = 'all';
  let searchTerm   = '';

  function applyFilters() {
    let visible = 0;

    sections.forEach(section => {
      const cat = section.dataset.category;
      const catMatch = activeFilter === 'all' || activeFilter === cat;
      let sectionVisible = false;

      section.querySelectorAll('.card').forEach(card => {
        const tags = (card.dataset.tags || '').toLowerCase();
        const text = card.textContent.toLowerCase();
        const q    = searchTerm.toLowerCase();

        const matchSearch = !q || tags.includes(q) || text.includes(q);
        const matchCat    = catMatch;
        const matchLang   = activeLang === 'all' || tags.includes(activeLang);

        if (matchSearch && matchCat && matchLang) {
          card.classList.remove('hidden');
          sectionVisible = true;
          visible++;
        } else {
          card.classList.add('hidden');
        }
      });

      section.classList.toggle('hidden', !sectionVisible);
    });

    if (visible === 0) {
      noResults.classList.remove('hidden');
      noResultsTerm.textContent = searchTerm || activeLang || activeFilter;
    } else {
      noResults.classList.add('hidden');
    }
  }

  // Search
  searchInput.addEventListener('input', () => {
    searchTerm = searchInput.value.trim();
    applyFilters();
  });

  // Keyboard shortcut: press / to focus search
  document.addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
      searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

  // Category filter
  filterBar.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    if (activeFilter !== 'favorites') applyFilters();
  });

  // Language filter
  if (langFilter) {
    langFilter.addEventListener('click', e => {
      const btn = e.target.closest('.lang-btn');
      if (!btn) return;
      langFilter.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeLang = btn.dataset.lang;
      applyFilters();
    });
  }

  // Toggle body class when compare bar visible for padding
  const compareBar = document.getElementById('compareBar');
  if (compareBar) {
    const observer = new MutationObserver(() => {
      document.body.classList.toggle('compare-active', !compareBar.classList.contains('hidden'));
    });
    observer.observe(compareBar, { attributes: true, attributeFilter: ['class'] });
  }

})();
