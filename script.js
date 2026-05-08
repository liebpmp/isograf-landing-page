/* ========================================
   ISOGRAF Landing Page — script.js
   Navigation, FAQ, Scroll Animations
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Cache DOM references ----
  const navbar = document.getElementById('navbar');
  const navMenu = document.getElementById('navMenu');
  const hamburger = document.getElementById('hamburger');
  const navLinks = navbar ? navbar.querySelectorAll('.navbar__link') : [];
  const sections = document.querySelectorAll('section[id]');
  const faqList = document.querySelector('.faq__list');
  const HEADER_OFFSET = 80; // px offset for sticky header when scrolling to sections


  // =========================================
  // 1. SMOOTH SCROLL FOR ANCHOR LINKS
  // =========================================
  // Uses event delegation on the document body for all anchor links
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const targetId = anchor.getAttribute('href');
    if (targetId === '#' || targetId === '') return;

    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;

    e.preventDefault();

    const navHeight = navbar ? navbar.offsetHeight : HEADER_OFFSET;
    const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;

    window.scrollTo({
      top: targetPos,
      behavior: 'smooth'
    });
  });


  // =========================================
  // 2. STICKY NAVBAR — add .navbar--scrolled
  // =========================================
  function handleNavbarScroll() {
    if (!navbar) return;

    if (window.scrollY > 50) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  // Run once on load in case page is already scrolled (e.g. after refresh)
  handleNavbarScroll();


  // =========================================
  // 3. MOBILE HAMBURGER MENU TOGGLE
  // =========================================
  function openMobileMenu() {
    if (!navbar) return;
    navbar.classList.add('navbar--open');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // prevent background scroll
  }

  function closeMobileMenu() {
    if (!navbar) return;
    navbar.classList.remove('navbar--open');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function isMobileMenuOpen() {
    return navbar && navbar.classList.contains('navbar--open');
  }

  if (hamburger) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isMobileMenuOpen()) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  // 7. Close mobile menu when clicking a nav link
  if (navMenu) {
    navMenu.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && isMobileMenuOpen()) {
        closeMobileMenu();
      }
    });
  }

  // 8. Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!isMobileMenuOpen()) return;
    // If click is outside navbar entirely, close
    if (!navbar.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // Also close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMobileMenuOpen()) {
      closeMobileMenu();
      if (hamburger) hamburger.focus();
    }
  });


  // =========================================
  // 4. FAQ ACCORDION — only one open at a time
  // =========================================
  if (faqList) {
    faqList.addEventListener('click', (e) => {
      const questionBtn = e.target.closest('.faq__question');
      if (!questionBtn) return;

      const clickedItem = questionBtn.closest('.faq__item');
      if (!clickedItem) return;

      const isAlreadyOpen = clickedItem.classList.contains('faq__item--open');

      // Close all items first
      const allItems = faqList.querySelectorAll('.faq__item');
      allItems.forEach((item) => {
        item.classList.remove('faq__item--open');
        const btn = item.querySelector('.faq__question');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      // If it was not already open, open it
      if (!isAlreadyOpen) {
        clickedItem.classList.add('faq__item--open');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  }


  // =========================================
  // 5. INTERSECTION OBSERVER — fade-in animations
  // =========================================
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          scrollObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    });

    animatedElements.forEach((el) => scrollObserver.observe(el));
  } else {
    // Fallback: make everything visible immediately
    animatedElements.forEach((el) => el.classList.add('is-visible'));
  }


  // =========================================
  // 6. ACTIVE NAV LINK HIGHLIGHTING ON SCROLL
  // =========================================
  function updateActiveNavLink() {
    if (sections.length === 0 || navLinks.length === 0) return;

    const navHeight = navbar ? navbar.offsetHeight : HEADER_OFFSET;
    const scrollPos = window.scrollY + navHeight + 100; // offset to trigger slightly early

    let currentSectionId = '';

    // Walk through sections top-to-bottom, the last one whose top we've passed wins
    sections.forEach((section) => {
      if (section.offsetTop <= scrollPos) {
        currentSectionId = section.getAttribute('id');
      }
    });

    // If scrolled near the bottom of the page, activate the last section
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
      const lastSection = sections[sections.length - 1];
      if (lastSection) {
        currentSectionId = lastSection.getAttribute('id');
      }
    }

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === '#' + currentSectionId) {
        link.classList.add('navbar__link--active');
      } else {
        link.classList.remove('navbar__link--active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  // Run once on load
  updateActiveNavLink();


  // =========================================
  // BONUS: Counter animation for stat numbers
  // =========================================
  const statNumbers = document.querySelectorAll('.stats__number');

  if (statNumbers.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const originalText = el.textContent.trim();
        const match = originalText.match(/^\+?([\d.]+)/);

        if (!match) {
          counterObserver.unobserve(el);
          return;
        }

        const prefix = originalText.startsWith('+') ? '+' : '';
        const hasDot = match[1].includes('.');
        const numericStr = match[1].replace(/\./g, '');
        const targetNum = parseInt(numericStr, 10);
        const duration = 1500;
        const startTime = performance.now();

        function animate(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Cubic ease-out
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(targetNum * eased);

          let formatted = current.toString();
          if (hasDot && current >= 1000) {
            formatted = current.toLocaleString('de-DE');
          }

          el.textContent = prefix + formatted;

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            // Restore exact original text to preserve any suffix
            el.textContent = originalText;
          }
        }

        el.textContent = prefix + '0';
        requestAnimationFrame(animate);
        counterObserver.unobserve(el);
      });
    }, { threshold: 0.5 });

    statNumbers.forEach((el) => counterObserver.observe(el));
  }

});
