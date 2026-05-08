/* ============================================
   ISOGRAF Landing Page — script.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const HEADER_OFFSET = 88;

  // =========================================
  // Mobile menu toggle
  // =========================================
  const hamburger = document.getElementById('navHamburger');
  const navContainer = document.getElementById('navContainer');

  if (hamburger && navContainer) {
    hamburger.addEventListener('click', () => {
      const isOpen = navContainer.classList.toggle('navbar__container--open');
      hamburger.classList.toggle('navbar__hamburger--open', isOpen);
      hamburger.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
    });

    navContainer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navContainer.classList.remove('navbar__container--open');
        hamburger.classList.remove('navbar__hamburger--open');
        hamburger.setAttribute('aria-label', 'Menü öffnen');
      });
    });
  }

  // =========================================
  // Smooth scroll for anchor links
  // =========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const targetPos = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

  // =========================================
  // Certificate carousel
  // =========================================
  const carouselTrack = document.querySelector('.certificate__track');
  const prevBtn = document.querySelector('.certificate__arrow--prev');
  const nextBtn = document.querySelector('.certificate__arrow--next');
  const dots = document.querySelectorAll('.certificate__dot');

  if (carouselTrack && prevBtn && nextBtn) {
    const cards = carouselTrack.querySelectorAll('.certificate__card');
    let currentIndex = 2; // Start at the featured card (ZFU)
    const totalCards = cards.length;

    function updateCarousel() {
      // Scroll the track to center the current card
      const card = cards[currentIndex];
      if (card) {
        const trackRect = carouselTrack.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();
        const scrollLeft = card.offsetLeft - (trackRect.width / 2) + (cardRect.width / 2);
        carouselTrack.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }

      // Update dots
      dots.forEach((dot, i) => {
        dot.classList.toggle('certificate__dot--active', i === currentIndex);
      });
    }

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + totalCards) % totalCards;
      updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % totalCards;
      updateCarousel();
    });

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateCarousel();
      });
    });
  }

  // =========================================
  // FAQ Accordion (if present)
  // =========================================
  document.querySelectorAll('.frame14__faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.frame14__faq-item');
      if (!item) return;
      const isOpen = item.classList.contains('frame14__faq-item--open');
      // Close all
      document.querySelectorAll('.frame14__faq-item--open').forEach(openItem => {
        openItem.classList.remove('frame14__faq-item--open');
      });
      // Toggle current
      if (!isOpen) {
        item.classList.add('frame14__faq-item--open');
      }
    });
  });

  // =========================================
  // Intersection Observer for scroll animations
  // =========================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('section, .certificate__card, .growth__step, .methods__card, .routes-1__card, .routes-2__card, .results__card, .team__card').forEach(el => {
    observer.observe(el);
  });
});
