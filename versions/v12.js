/* ===========================
   ISOGRAF Landing Page — V12
   =========================== */

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const headerOffset = 88;
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
      if (nav && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Menü öffnen');
      }
    });
  });

  // 5-Phasen fly-in animation
  const phases = document.querySelectorAll('.phase');
  if (phases.length && 'IntersectionObserver' in window) {
    const phaseObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = Array.from(phases).indexOf(entry.target);
          entry.target.style.transitionDelay = `${idx * 150}ms`;
          entry.target.classList.add('is-visible');
          phaseObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });
    phases.forEach((p) => phaseObserver.observe(p));
  } else {
    phases.forEach((p) => p.classList.add('is-visible'));
  }

  // Done-4-You carousel
  const carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    const cards = Array.from(carousel.querySelectorAll('.cert-card'));
    const wrap = carousel.parentElement;
    const dots = Array.from(wrap.querySelectorAll('.exam__dot'));
    const prevBtn = wrap.querySelector('.exam__arrow--prev');
    const nextBtn = wrap.querySelector('.exam__arrow--next');
    let active = cards.findIndex((c) => c.classList.contains('cert-card--center'));
    if (active < 0) active = 0;

    const update = () => {
      cards.forEach((c, i) => c.classList.toggle('is-active', i === active));
      const total = dots.length;
      const dotIdx = total > 0 ? Math.round((active / Math.max(cards.length - 1, 1)) * (total - 1)) : 0;
      dots.forEach((d, i) => {
        const on = i === dotIdx;
        d.classList.toggle('is-active', on);
        if (on) d.setAttribute('aria-current', 'true');
        else d.removeAttribute('aria-current');
      });
    };
    update();

    prevBtn && prevBtn.addEventListener('click', () => {
      active = (active - 1 + cards.length) % cards.length;
      update();
    });
    nextBtn && nextBtn.addEventListener('click', () => {
      active = (active + 1) % cards.length;
      update();
    });
    dots.forEach((d, i) => d.addEventListener('click', () => {
      const target = Math.round((i / Math.max(dots.length - 1, 1)) * (cards.length - 1));
      active = target;
      update();
    }));
  }
});
