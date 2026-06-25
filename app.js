(function () {
  'use strict';

  const searchInput  = document.getElementById('searchInput');
  const filterBar    = document.getElementById('filterBar');
  const noResults    = document.getElementById('noResults');
  const noResultsTerm = document.getElementById('noResultsTerm');
  const sections     = document.querySelectorAll('.category-section');
  const cards        = document.querySelectorAll('.card');

  let activeFilter = 'all';
  let searchTerm   = '';

  /* ── apply filters ──────────────────────────────── */
  function applyFilters() {
    let visibleCards = 0;

    sections.forEach(section => {
      const sectionCategory = section.dataset.category;
      const sectionMatches = activeFilter === 'all' || activeFilter === sectionCategory;

      let sectionHasVisible = false;

      section.querySelectorAll('.card').forEach(card => {
        const tags = (card.dataset.tags || '').toLowerCase();
        const text = card.textContent.toLowerCase();
        const needle = searchTerm.toLowerCase();

        const matchesSearch = !needle || tags.includes(needle) || text.includes(needle);
        const matchesFilter = sectionMatches;

        if (matchesSearch && matchesFilter) {
          card.classList.remove('hidden');
          sectionHasVisible = true;
          visibleCards++;
        } else {
          card.classList.add('hidden');
        }
      });

      section.classList.toggle('hidden', !sectionHasVisible);
    });

    if (visibleCards === 0) {
      noResults.classList.remove('hidden');
      noResultsTerm.textContent = searchTerm || activeFilter;
    } else {
      noResults.classList.add('hidden');
    }
  }

  /* ── search ─────────────────────────────────────── */
  searchInput.addEventListener('input', () => {
    searchTerm = searchInput.value.trim();
    applyFilters();
  });

  /* ── filter buttons ──────────────────────────────── */
  filterBar.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    applyFilters();
  });

  /* ── card hover glow effect ──────────────────────── */
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
      const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
      card.style.setProperty('--mx', `${x}%`);
      card.style.setProperty('--my', `${y}%`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.removeProperty('--mx');
      card.style.removeProperty('--my');
    });
  });

  /* ── smooth scroll for anchor links ─────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

})();
