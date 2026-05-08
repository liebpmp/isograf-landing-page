/* ===========================
   ISOGRAF Landing Page — V9
   =========================== */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const hamburger = document.querySelector('.navbar__hamburger');
  const nav = document.querySelector('.navbar__nav');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('navbar__nav--open');
      hamburger.classList.toggle('navbar__hamburger--active');
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        if (nav) nav.classList.remove('navbar__nav--open');
        if (hamburger) hamburger.classList.remove('navbar__hamburger--active');
      }
    });
  });

  // FAQ Accordion
  document.querySelectorAll('.faq__question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq__item');
      const isOpen = item.classList.contains('faq__item--open');
      document.querySelectorAll('.faq__item').forEach(i => i.classList.remove('faq__item--open'));
      if (!isOpen) item.classList.add('faq__item--open');
    });
  });
});
