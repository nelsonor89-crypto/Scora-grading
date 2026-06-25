(function () {
  'use strict';

  const searchInput   = document.getElementById('searchInput');
  const filterBar     = document.getElementById('filterBar');
  const noResults     = document.getElementById('noResults');
  const noResultsTerm = document.getElementById('noResultsTerm');
  const sections      = document.querySelectorAll('.category-section');

  let activeFilter = 'all';
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
        const matchFilter = catMatch;

        if (matchSearch && matchFilter) {
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
      noResultsTerm.textContent = searchTerm || activeFilter;
    } else {
      noResults.classList.add('hidden');
    }
  }

  searchInput.addEventListener('input', () => {
    searchTerm = searchInput.value.trim();
    applyFilters();
  });

  filterBar.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    // Favorites filter is handled by prompts.js; skip normal filter logic
    if (activeFilter !== 'favorites') applyFilters();
  });

})();
