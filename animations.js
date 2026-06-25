(function () {
  'use strict';

  /* ── Entrance animations (Intersection Observer) ── */
  function initEntrance() {
    const items = document.querySelectorAll(
      '.card, .category-title, .prompt-card, .rec-box, .compare-section, .prompts-header'
    );

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        // Stagger cards within the same row
        const parent = entry.target.parentElement;
        if (parent && parent.classList.contains('cards-row')) {
          const idx = Array.from(parent.children).indexOf(entry.target);
          entry.target.style.transitionDelay = `${idx * 65}ms`;
        } else if (parent && parent.classList.contains('prompt-grid')) {
          const idx = Array.from(parent.children).indexOf(entry.target);
          entry.target.style.transitionDelay = `${idx * 50}ms`;
        }

        entry.target.classList.add('anim-in');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -32px 0px' });

    items.forEach(el => { el.classList.add('anim-out'); obs.observe(el); });
  }

  /* ── Animated counters ───────────────────────────── */
  function animateCounter(el, target, duration) {
    const start = performance.now();
    const tick = (now) => {
      const p  = Math.min((now - start) / duration, 1);
      const ep = 1 - Math.pow(1 - p, 3); // cubic ease-out
      el.textContent = Math.round(ep * target);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function initCounters() {
    const nums = document.querySelectorAll('.stat-num');
    const pairs = [];
    nums.forEach(el => {
      const v = parseInt(el.textContent, 10);
      if (!isNaN(v)) { pairs.push({ el, v }); el.textContent = '0'; }
    });
    setTimeout(() => {
      pairs.forEach(({ el, v }, i) => setTimeout(() => animateCounter(el, v, 1200), i * 140));
    }, 350);
  }

  /* ── Back to top ─────────────────────────────────── */
  function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('btt-visible', window.scrollY > 600);
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  document.addEventListener('DOMContentLoaded', () => {
    initEntrance();
    initCounters();
    initBackToTop();
  });

})();
